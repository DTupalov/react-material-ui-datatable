import PropTypes from 'prop-types';
import { setPropTypes } from 'recompose';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withStateHandlers from 'recompose/withStateHandlers';
import defaultToolbarSelectActions from './defaultToolbarSelectActions';
import {
  addMetaRawIndexToData,
  completeColumnsWithOptions,
  convertDataToFilterLists,
  filter,
  metaSymbol,
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
  selectedRows: props.selectedRows,
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
    selectedRows: PropTypes.arrayOf(PropTypes.number),
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
        selectedRows: PropTypes.func,
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
    selectedRows: [],
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
        selectedRows: count => `${count} row(s) selected`,
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
    data: addMetaRawIndexToData(props.data),
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
      selectedRows: props.selectedRows,
    }),
    {
      setData: () => data => ({ data }),
      setShowSearchBar: () => showSearchBar => ({ showSearchBar }),
      setSearchValue: () => searchValue => ({ searchValue }),
      setSort: () => sort => ({ sort }),
      setFilterValues: () => filterValues => ({ filterValues }),
      setPage: () => page => ({ page }),
      setPerPage: () => perPage => ({ perPage }),
      setSelectedRows: () => selectedRows => ({ selectedRows }),
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
    toggleSelectRow: props => rawIndex => {
      const nextSelectedRows = [...props.selectedRows];
      const indexOfRow = nextSelectedRows.indexOf(rawIndex);

      if (indexOfRow !== -1) {
        nextSelectedRows.splice(indexOfRow, 1);
      } else {
        nextSelectedRows.push(rawIndex);
      }

      props.setSelectedRows(nextSelectedRows);
    },
    toggleSelectAll: props => () => {
      let nextSelectedRows = [];
      if (!props.selectedRows.length) {
        nextSelectedRows = props.data.map(row => row[metaSymbol].rawIndex);
      }

      props.setSelectedRows(nextSelectedRows);
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
    handleSelect: props => selectedRows => props.setSelectedRows(selectedRows),
    handleDelete: props => selectedRows => {
      const nextData = props.data.filter(
        row => !selectedRows.includes(row[metaSymbol].rawIndex)
      );

      props.setData(nextData);

      const nextSelectedRows = props.selectedRows.filter(
        rawIndex => !selectedRows.includes(rawIndex)
      );

      props.setSelectedRows(nextSelectedRows);
    },
  })
);
