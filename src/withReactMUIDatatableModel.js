import PropTypes from 'prop-types';
import { setPropTypes } from 'recompose';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withStateHandlers from 'recompose/withStateHandlers';
import defaultToolbarSelectActions from './defaultToolbarSelectActions';
import {
  completeColumnsWithOptions,
  convertDataToFilterLists,
  filter,
  paginate,
  pipe,
  search,
  sort,
} from './utils';
import withStateChanged from './withStateChanged';

export const mapDatatableProps = props => ({
  title: props.title,
  columns: props.columns,
  showSearchBar: props.showSearchBar,
  searchValue: props.searchValue,
  sort: props.sort,
  filterValues: props.filterValues,
  selectedData: props.selectedData,
  toolbarSelectActions: props.toolbarSelectActions,
  toolbarActions: props.toolbarActions,
  page: props.page,
  perPage: props.perPage,
  perPageOption: props.perPageOption,
  selectable: props.selectable,
  filterable: props.filterable,
  searchable: props.searchable,
  localization: props.localization,
});

export const mapDatatableCalculatedProps = props => ({
  computedData: props.computedData,
  filterLists: props.filterLists,
  displayData: props.displayData,
});

export const mapDatatableHandlers = props => ({
  toggleSelectRow: props.toggleSelectRow,
  toggleSelectAll: props.toggleSelectAll,
  toggleSearchBar: props.toggleSearchBar,
  handleSearchValue: props.handleSearchValue,
  handleSort: props.handleSort,
  addFilter: props.addFilter,
  removeFilter: props.removeFilter,
  resetFilter: props.resetFilter,
  changePage: props.changePage,
  changePerPage: props.changePerPage,
  handleSelect: props.handleSelect,
  handleDelete: props.handleDelete,
});

export default compose(
  setPropTypes({
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    showSearchBar: PropTypes.bool,
    searchValue: PropTypes.string,
    sort: PropTypes.shape({
      columnName: PropTypes.string,
      direction: PropTypes.oneOf[('ASC', 'DESC')],
    }),
    toolbarSelectActions: PropTypes.func,
    toolbarActions: PropTypes.func,
    page: PropTypes.number,
    perPage: PropTypes.number,
    perPageOption: PropTypes.arrayOf(PropTypes.number),
    selectedData: PropTypes.arrayOf(PropTypes.object),
    filterValues: PropTypes.object,
    selectable: PropTypes.bool,
    filterable: PropTypes.bool,
    searchable: PropTypes.bool,
    localization: PropTypes.shape({
      toolbar: PropTypes.shape({
        searchAction: PropTypes.string,
        filterAction: PropTypes.string,
        closeSearch: PropTypes.string,
      }),
      filterLists: PropTypes.shape({
        title: PropTypes.string,
        allOption: PropTypes.string,
        reset: PropTypes.string,
      }),
      toolbarSelect: PropTypes.shape({
        selectedData: PropTypes.func,
      }),
      pagination: PropTypes.shape({
        rowsPerPage: PropTypes.string,
        displayedRows: PropTypes.func,
      }),
    }),
    onStateChanged: PropTypes.func,
  }),
  defaultProps({
    data: [],
    columns: [],
    title: '',
    showSearchBar: false,
    searchValue: '',
    sort: { columnName: null, direction: 'ASC' },
    toolbarSelectActions: defaultToolbarSelectActions,
    page: 0,
    perPage: 5,
    perPageOption: [5, 10, 15],
    selectedData: [],
    filterValues: {},
    selectable: true,
    filterable: true,
    searchable: true,
    localization: {
      toolbar: {
        searchAction: 'Search',
        filterAction: 'Filters',
        closeSearch: 'Close search',
      },
      filterLists: {
        title: 'Filter',
        allOption: 'All',
        reset: 'Reset',
      },
      toolbarSelect: {
        selectedData: count => `${count} row(s) selected`,
      },
      pagination: {
        rowsPerPage: 'Rows per page',
        displayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
      },
    },
    onStateChanged: event => {
      console.log('state changed', event.name, event.value, event.state);
    },
  }),
  withProps(props => ({
    columns: completeColumnsWithOptions(props.columns),
  })),
  withStateHandlers(
    props => ({
      data: props.data,
      searchValue: props.searchValue,
      showSearchBar: props.showSearchBar,
      sort: props.sort,
      filterValues: props.filterValues,
      page: props.page,
      perPage: props.perPage,
      selectedData: props.selectedData,
    }),
    {
      setData: () => data => ({ data }),
      setShowSearchBar: () => showSearchBar => ({ showSearchBar }),
      setSearchValue: () => searchValue => ({ searchValue }),
      setSort: () => sort => ({ sort }),
      setFilterValues: () => filterValues => ({ filterValues }),
      setPage: () => page => ({ page }),
      setPerPage: () => perPage => ({ perPage }),
      setSelectedData: () => selectedData => ({ selectedData }),
    }
  ),
  withProps(props => {
    const computedData = pipe(
      sort(props.sort.columnName, props.sort.direction),
      search(props.searchValue, props.columns),
      filter(props.filterValues, props.columns)
    )(props.data);

    const filterLists = convertDataToFilterLists(computedData, props.columns);

    const displayData = paginate(props.page, props.perPage)(computedData);

    return {
      computedData,
      filterLists,
      displayData,
    };
  }),
  withStateChanged,
  withHandlers({
    toggleSelectRow: props => selectedDataItem => {
      const nextSelectedData = [...props.selectedData];
      const dataIndex = nextSelectedData.findIndex(
        data => data === selectedDataItem
      );
      if (dataIndex !== -1) {
        nextSelectedData.splice(dataIndex, 1);
      } else {
        nextSelectedData.push(selectedDataItem);
      }

      props.setSelectedData(nextSelectedData);
    },

    toggleSelectAll: props => () => {
      let nextSelectedData = [];
      if (!props.selectedData.length) {
        nextSelectedData = [...props.data];
      }

      props.setSelectedData(nextSelectedData);
    },
    toggleSearchBar: props => () => {
      const nextShowSearchBar = !props.showSearchBar;
      const nextSearchValue = '';

      props.setSearchValue(nextSearchValue);
      props.setShowSearchBar(nextShowSearchBar);
    },
    handleSearchValue: props => searchValue => {
      props.setSearchValue(searchValue);
    },
    handleSort: props => ({ columnName, direction = 'ASC' }) => {
      props.setSort({ columnName, direction });
    },
    addFilter: props => ({ columnName, value }) => {
      const nextFilterValues = {
        ...props.filterValues,
        [columnName]: value,
      };

      props.setFilterValues(nextFilterValues);
    },
    removeFilter: props => ({ columnName }) => {
      const nextFilterValues = Object.keys(props.filterValues).reduce(
        (nextFilterValues, prevColumnName) => {
          if (prevColumnName !== columnName) {
            nextFilterValues[prevColumnName] =
              props.filterValues[prevColumnName];
          }
          return nextFilterValues;
        },
        {}
      );

      props.setFilterValues(nextFilterValues);
    },
    resetFilter: props => () => {
      const nextFilterValues = {};

      props.setFilterValues(nextFilterValues);
    },
    changePage: props => page => {
      props.setPage(page);
    },
    changePerPage: props => count => {
      props.setPerPage(count);
    },
    handleSelect: props => selectedData => props.setSelectedData(selectedData),
    handleDelete: props => selectedData => {
      const nextData = props.data.filter(
        dataItem => !selectedData.includes(dataItem)
      );

      const nextSelectedData = props.selectedData.filter(
        rawIndex => !selectedData.includes(rawIndex)
      );

      props.setData(nextData);
      props.setSelectedData(nextSelectedData);
    },
  })
);
