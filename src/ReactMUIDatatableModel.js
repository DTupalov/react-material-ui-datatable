import {
  compose,
  defaultProps,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';
import { ReactMUIDatatableProvider } from './ReactMUIDatatableProvider';
import {
  addMetaRawIndexToData,
  convertColumnsToFilterValues,
  convertDataToFilterLists,
  filter,
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
      search: {
        showSearchBar: false,
        value: '',
      },
      sort: { column: null, direction: 'ASC' },
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
    }),
    {
      toggleSearchBar: state => () => ({
        search: {
          showSearchBar: !state.search.showSearchBar,
          value: '',
        },
      }),
      handleSearchValue: state => e => ({
        search: {
          showSearchBar: state.search.showSearchBar,
          value: e.target.value,
        },
      }),
      handleSort: state => ({ column, direction = 'ASC' }) => ({
        sort: { column, direction },
      }),
      addFilter: state => ({ column, value }) => ({
        filterValues: {
          ...state.filterValues,
          [column]: value,
        },
      }),
      removeFilter: state => ({ column }) => ({
        filterValues: {
          ...state.filterValues,
          [column]: '',
        },
      }),
      resetFilter: (state, props) => () => ({
        filterValues: convertColumnsToFilterValues({
          columns: props.columns,
        }),
      }),
      changePage: () => (_, page) => ({ page }),
      changePerPage: () => event => ({ perPage: Number(event.target.value) }),
      handleSelect: state => selectedRows => ({ selectedRows }),
    }
  ),
  withProps(props => ({
    data: pipe(
      sort({ column: props.sort.column, direction: props.sort.direction }),
      search({ value: props.search.value }),
      filter({ values: props.filterValues })
    )(props.data),
  })),
  withProps(props => ({
    filterLists: convertDataToFilterLists({
      data: props.data,
      columns: props.columns,
    }),
    diplayData: paginate({ page: props.page, perPage: props.perPage })(
      props.data
    ),
    //TODO: selectedRows need to be recalculate, if we be available to filter list during there is selectedRows
  })),
  withHandlers({
    toggleSelectRow: props => rawIndex => {
      const nextSelectedRows = [...props.selectedRows];
      const indexOfRow = nextSelectedRows.indexOf(rawIndex);

      if (indexOfRow !== -1) {
        nextSelectedRows.splice(indexOfRow, 1);
      } else {
        nextSelectedRows.push(rawIndex);
      }

      props.handleSelect(nextSelectedRows);
    },
    handleSelectAll: props => () => {
      let nextSelectedRows = [];
      if (!props.selectedRows.length) {
        nextSelectedRows = props.data.map(row => row.meta.rawIndex);
      }

      props.handleSelect(nextSelectedRows);
    },
  })
)(ReactMUIDatatableProvider);
