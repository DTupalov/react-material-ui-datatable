import memoize from 'lodash/memoize';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withStateHandlers from 'recompose/withStateHandlers';
import { ReactMUIDatatableProvider } from './ReactMUIDatatableProvider';
import {
  addMetaRawIndexToData,
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
      handleSort: state => ({ columnName, direction = 'ASC' }) => ({
        sort: { columnName, direction },
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

      props.handleSelect(nextSelectedRows);
    },
    handleSelectAll: props => () => {
      let nextSelectedRows = [];
      if (!props.selectedRows.length) {
        nextSelectedRows = props.data.map(row => row[metaSymbol].rawIndex);
      }

      props.handleSelect(nextSelectedRows);
    },
  })
)(ReactMUIDatatableProvider);
