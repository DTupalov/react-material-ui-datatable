import { compose, defaultProps, withProps, withStateHandlers } from 'recompose';
import { ReactMUIDatatableProvider } from './ReactMUIDatatableProvider';
import {
  convertColumnsToFilterValues,
  convertDataToFilterLists,
  filter,
  pipe,
  search,
  sort,
} from './utils';

export default compose(
  defaultProps({
    data: [],
    columns: [],
  }),
  withStateHandlers(
    props => ({
      data: props.data,
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
  }))
)(ReactMUIDatatableProvider);
