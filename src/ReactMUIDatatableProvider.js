import { useStore } from 'effector-react';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo } from 'react';
import defaultToolbarSelectActions from './defaultToolbarSelectActions';
import { createModel } from './model/index.js';
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
  rowActions: props.rowActions,
  page: props.page,
  perPage: props.perPage,
  perPageOption: props.perPageOption,
  selectable: props.selectable,
  filterable: props.filterable,
  searchable: props.searchable,
  localization: props.localization,
  customNoMatches: props.customNoMatches,
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

export const ReactMUIDatatableContext = createContext();

const ReactMUIDatatableProvider = props => {
  const { $store, actions, subscribe } = useMemo(
    () =>
      createModel({
        data: props.data,
        columns: completeColumnsWithOptions(props.columns),
        sort: props.sort,
        showSearchBar: props.showSearchBar,
        filterValues: props.filterValues,
        searchValue: props.searchValue,
        selectedData: props.selectedData,
        page: props.page,
        perPage: props.perPage,
      }),
    []
  );

  const state = useStore($store);

  useEffect(() => subscribe(props.onStateChanged), []);

  return (
    <ReactMUIDatatableContext.Provider
      value={{
        ...mapDatatableProps({
          ...props,
          ...state,
        }),
        ...mapDatatableCalculatedProps({ ...state }),
        ...mapDatatableHandlers({ ...actions }),
      }}
    >
      {props.children}
    </ReactMUIDatatableContext.Provider>
  );
};

ReactMUIDatatableProvider.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  customCell: PropTypes.func,
  title: PropTypes.string.isRequired,
  showSearchBar: PropTypes.bool,
  searchValue: PropTypes.string,
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      columnName: PropTypes.string,
      direction: PropTypes.oneOf[('ASC', 'DESC')],
    })
  ),
  toolbarSelectActions: PropTypes.func,
  toolbarActions: PropTypes.func,
  rowActions: PropTypes.func,
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
};

ReactMUIDatatableProvider.defaultProps = {
  data: [],
  columns: [],
  title: '',
  showSearchBar: false,
  searchValue: '',
  sort: [],
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
      noMatchesText: 'No matches',
    },
    toolbarSelect: {
      selectedData: count => `${count} row(s) selected`,
    },
    pagination: {
      rowsPerPage: 'Rows per page',
      displayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
    },
    body: {
      noMatchesText: 'No matches',
    },
  },
  onStateChanged: () => {},
};

export default ReactMUIDatatableProvider;
