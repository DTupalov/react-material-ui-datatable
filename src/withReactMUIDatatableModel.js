import memoize from 'lodash/memoize';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withStateHandlers from 'recompose/withStateHandlers';
import defaultToolbarSelectActions from './defaultToolbarSelectActions';
import {
  addMetaRawIndexToData,
  completeColumnsWithOptions,
  convertColumnsToFilterValues,
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
  search: props.search,
  sort: props.sort,
  filterValues: props.filterValues,
  page: props.page,
  perPage: props.perPage,
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
    search: {
      showSearchBar: false,
      value: '',
    },
    sort: { columnName: null, direction: 'ASC' },
    toolbarSelectActions: defaultToolbarSelectActions,
    page: 0,
    perPage: 5,
    perPageOption: [5, 10, 15],
    selectedRows: [],
    selectable: false,
    filterable: false,
    searchable: false,
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
    filterValues: convertColumnsToFilterValues(props.columns),
  })),
  withStateHandlers(
    props => ({
      data: props.data,
      search: props.search,
      sort: props.sort,
      filterValues: props.filterValues,
      page: props.page,
      perPage: props.perPage,
      selectedRows: props.selectedRows,
    }),
    {
      setData: () => data => ({ data }),
      setSearch: () => search => ({ search }),
      setSort: () => sort => ({ sort }),
      setFilterValues: () => filterValues => ({ filterValues }),
      setPage: () => page => ({ page }),
      setPerPage: () => perPage => ({ perPage }),
      setSelectedRows: () => selectedRows => ({ selectedRows }),
    }
  ),
  withProps(
    memoize(
      props => {
        const computedData = pipe(
          sort({
            columnName: props.sort.columnName,
            direction: props.sort.direction,
          }),
          search({ value: props.search.value, columns: props.columns }),
          filter({ values: props.filterValues, columns: props.columns })
        )(props.data);

        const filterLists = convertDataToFilterLists({
          data: computedData,
          columns: props.columns,
        });

        const displayData = paginate({
          page: props.page,
          perPage: props.perPage,
        })(computedData);

        return {
          computedData,
          filterLists,
          displayData,
        };
      },
      props =>
        JSON.stringify([
          props.data,
          props.columns,
          props.sort.columnName,
          props.sort.direction,
          props.search.value,
          props.filterValues,
          props.page,
          props.perPage,
        ])
    )
  ),
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
    toggleSearchBar: props => () =>
      props.setSearch({
        showSearchBar: !props.search.showSearchBar,
        value: '',
      }),
    handleSearchValue: props => value =>
      props.setSearch({
        showSearchBar: props.search.showSearchBar,
        value,
      }),
    handleSort: props => ({ columnName, direction = 'ASC' }) =>
      props.setSort({ columnName, direction }),
    addFilter: props => ({ columnName, value }) =>
      props.setFilterValues({
        ...props.filterValues,
        [columnName]: value,
      }),
    removeFilter: props => ({ columnName }) =>
      props.setFilterValues({
        ...props.filterValues,
        [columnName]: '',
      }),
    resetFilter: props => () =>
      props.setFilterValues(convertColumnsToFilterValues(props.columns)),
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
