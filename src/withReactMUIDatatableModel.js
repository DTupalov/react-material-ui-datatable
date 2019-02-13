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

export const mapDatatableProps = props => ({
  title: props.title,
  columns: props.columns,
  showSearchBar: props.showSearchBar,
  searchValue: props.searchValue,
  sort: props.sort,
  filterValues: props.filterValues,
  selectedRows: props.selectedRows,
  toolbarSelectActions: props.toolbarSelectActions,
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
      setSearch: () => search => ({ search }),
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
      props.setSearchValue('');
      props.setShowSearchBar(!props.showSearchBar);
    },
    handleSearchValue: props => searchValue =>
      props.setSearchValue(searchValue),
    handleSort: props => ({ columnName, direction = 'ASC' }) =>
      props.setSort({ columnName, direction }),
    addFilter: props => ({ columnName, value }) =>
      props.setFilterValues({
        ...props.filterValues,
        [columnName]: value,
      }),
    removeFilter: props => ({ columnName }) =>
      props.setFilterValues(
        Object.keys(props.filterValues).reduce(
          (nextFilterValues, prevColumnName) => {
            if (prevColumnName !== columnName) {
              nextFilterValues[prevColumnName] =
                props.filterValues[prevColumnName];
            }
            return nextFilterValues;
          },
          {}
        )
      ),
    resetFilter: props => () => props.setFilterValues({}),
    changePage: props => page => props.setPage(page),
    changePerPage: props => count => props.setPerPage(count),
    handleSelect: props => selectedRows => props.setSelectedRows(selectedRows),
    handleDelete: props => selectedRows => {
      const nextData = props.data.filter(
        row => !selectedRows.includes(row[metaSymbol].rawIndex)
      );

      props.setData(nextData);
      props.setSelectedRows([]);
    },
  })
);
