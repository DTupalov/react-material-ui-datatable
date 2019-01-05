import memoize from 'lodash/memoize';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withStateHandlers from 'recompose/withStateHandlers';
import { ReactMUIDatatableProvider } from './ReactMUIDatatableProvider';
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

export default compose(
  defaultProps({
    data: [],
    columns: [],
    toolbarSelectActions: () => null,
    selectable: false,
  }),
  withStateHandlers(
    props => ({
      data: addMetaRawIndexToData(props.data),
      columns: completeColumnsWithOptions(props.columns),
      search: {
        showSearchBar: false,
        value: '',
      },
      sort: { columnName: null, direction: 'ASC' },
      filterLists: convertDataToFilterLists({
        data: props.data,
        columns: props.columns,
      }),
      filterValues: convertColumnsToFilterValues({ columns: props.columns }),
      page: 0,
      perPage: 5,
      perPageOption: [5, 10, 15],
      selectable: props.selectable,
      selectedRows: [],
      toolbarSelectActions: props.toolbarSelectActions,
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
        const data = pipe(
          sort({
            columnName: props.sort.columnName,
            direction: props.sort.direction,
          }),
          search({ value: props.search.value, columns: props.columns }),
          filter({ values: props.filterValues, columns: props.columns })
        )(props.data);

        const filterLists = convertDataToFilterLists({
          data: data,
          columns: props.columns,
        });

        const diplayData = paginate({
          page: props.page,
          perPage: props.perPage,
        })(data);

        return {
          data,
          filterLists,
          diplayData,
        };
      },
      props =>
        JSON.stringify([
          props.data,
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
    handleSelectAll: props => () => {
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
    handleSearchValue: props => event =>
      props.setSearch({
        showSearchBar: props.search.showSearchBar,
        value: event.target.value,
      }),
    handleSort: props => ({ columnName, direction = 'ASC' }) =>
      props.setSort({ columnName, direction }),
    addFilter: props => ({ column, value }) =>
      props.setFilterValues({
        ...props.filterValues,
        [column]: value,
      }),
    removeFilter: props => ({ column }) =>
      props.setFilterValues({
        ...props.filterValues,
        [column]: '',
      }),
    resetFilter: props => () =>
      props.setFilterValues(
        convertColumnsToFilterValues({
          columns: props.columns,
        })
      ),
    changePage: props => (_, page) => props.setPage(page),
    changePerPage: props => event =>
      props.setPerPage(Number(event.target.value)),
    handleSelect: props => selectedRows => props.setSelectedRows(selectedRows),
    handleDelete: props => selectedRows => {
      const nextData = props.data.filter(
        row => !selectedRows.includes(row[metaSymbol].rawIndex)
      );

      props.setData(nextData);
      props.setSelectedRows([]);
    },
  })
)(ReactMUIDatatableProvider);
