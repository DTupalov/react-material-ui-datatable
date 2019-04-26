import { createStoreConsumer } from 'effector-react';
import React, { createContext } from 'react';
import defaultToolbarSelectActions from './defaultToolbarSelectActions';
import createModel from './model';
import { completeColumnsWithOptions } from './utils';

const mapDatatableProps = props => ({
  title: props.title,
  columns: props.columns,
  customCell: props.customCell,
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

const mapDatatableCalculatedProps = props => ({
  computedData: props.computedData,
  filterLists: props.filterLists,
  displayData: props.displayData,
});

const mapDatatableHandlers = props => ({
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

const { Provider, Consumer } = createContext();
export const ReactMUIDatatableConsumer = Consumer;

const { store, actions, subscribe } = createModel({});
const EffectorStore = createStoreConsumer(store);

export default class ReactMUIDatatableProvider extends React.Component {
  componentDidMount() {
    actions.changeData(this.props.data);
    actions.changeColumns(completeColumnsWithOptions(this.props.columns));
    actions.handleSort(this.props.sort);
    actions.changeShowSearchBar(this.props.showSearchBar);
    actions.changeFilterValues(this.props.filterValues);
    actions.handleSearchValue(this.props.searchValue);
    actions.handleSelect(this.props.selectedData);
    actions.changePage(this.props.page);
    actions.changePerPage(this.props.perPage);

    subscribe(this.props.onStateChanged);
  }

  render() {
    return (
      <EffectorStore>
        {state => (
          <Provider
            value={{
              ...mapDatatableProps({
                ...this.props,
                ...state,
              }),
              ...mapDatatableCalculatedProps({ ...state }),
              ...mapDatatableHandlers({ ...actions }),
            }}
          >
            {this.props.children}
          </Provider>
        )}
      </EffectorStore>
    );
  }
}

ReactMUIDatatableProvider.defaultProps = {
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
  onStateChanged: () => {},
};
