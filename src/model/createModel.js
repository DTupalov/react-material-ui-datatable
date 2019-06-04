import { createStoreObject } from 'effector';
import createColumns from './createColumns';
import createComputedData from './createComputedData';
import createData from './createData';
import createDisplayData from './createDisplayData';
import createFilterLists from './createFilterLists';
import createFilterValues from './createFilterValues';
import createPage from './createPage';
import createPerPage from './createPerPage';
import createSearchValue from './createSearchValue';
import createSelectedData from './createSelectedData';
import createShowSearchBar from './createShowSearchBar';
import createSort from './createSort';

export default ({
  data: initialData = [],
  columns: initialColumns = [],
  showSearchBar: initialShowSearchBar = false,
  searchValue: initialSearchValue = '',
  sort: initialSort = [],
  page: initialPage = 0,
  perPage: initialPerPage = 5,
  selectedData: initialSelectedData = [],
  filterValues: initialFilterValues = {},
}) => {
  const { $data, changeData, handleDelete } = createData(initialData);
  const { $columns, changeColumns } = createColumns(initialColumns);
  const { $sort, handleSort } = createSort(initialSort);
  const {
    $showSearchBar,
    changeShowSearchBar,
    toggleSearchBar,
  } = createShowSearchBar(initialShowSearchBar);
  const { $searchValue, handleSearchValue } = createSearchValue(
    initialSearchValue,
    toggleSearchBar
  );
  const {
    $selectedData,
    toggleSelectRow,
    toggleSelectAll,
    handleSelect,
  } = createSelectedData(initialSelectedData, $data, handleDelete);
  const {
    $filterValues,
    changeFilterValues,
    addFilter,
    removeFilter,
    resetFilter,
  } = createFilterValues(initialFilterValues);
  const { $page, changePage } = createPage(initialPage);
  const { $perPage, changePerPage } = createPerPage(initialPerPage);
  const { $computedData } = createComputedData(
    $data,
    $columns,
    $sort,
    $searchValue,
    $filterValues
  );
  const { $filterLists } = createFilterLists($computedData, $columns);
  const { $displayData } = createDisplayData($computedData, $page, $perPage);

  const $store = createStoreObject({
    data: $data,
    columns: $columns,
    sort: $sort,
    filterValues: $filterValues,
    searchValue: $searchValue,
    showSearchBar: $showSearchBar,
    selectedData: $selectedData,
    page: $page,
    perPage: $perPage,
    computedData: $computedData,
    filterLists: $filterLists,
    displayData: $displayData,
  });

  const actions = {
    changeData,
    changeColumns,
    changeShowSearchBar,
    changeFilterValues,
    toggleSelectRow,
    toggleSelectAll,
    toggleSearchBar,
    handleSearchValue,
    handleSort,
    addFilter,
    removeFilter,
    resetFilter,
    changePage,
    changePerPage,
    handleSelect,
    handleDelete,
  };

  const createWatcher = (onChange, $store) => name => value => {
    const {
      searchValue,
      showSearchBar,
      sort,
      filterValues,
      page,
      perPage,
      selectedData,
    } = $store.getState();

    onChange({
      name,
      value,
      state: {
        searchValue,
        showSearchBar,
        sort,
        filterValues,
        page,
        perPage,
        selectedData,
      },
    });
  };

  const subscribe = subscriber => {
    const createStoreWatcher = createWatcher(subscriber, $store);

    const unwatchShowSearchBar = $showSearchBar.watch(
      createStoreWatcher('showSearchBar')
    );
    const unwatchPage = $page.watch(createStoreWatcher('page'));
    const unwatchPerPage = $perPage.watch(createStoreWatcher('perPage'));
    const unwatchSelectedData = $selectedData.watch(
      createStoreWatcher('selectedData')
    );
    const unwatchSearchValue = $searchValue.watch(
      createStoreWatcher('searchValue')
    );
    const unwatchSort = $sort.watch(createStoreWatcher('sort'));
    const unwatchFilterValues = $filterValues.watch(
      createStoreWatcher('filterValues')
    );

    return () => {
      unwatchShowSearchBar();
      unwatchPage();
      unwatchPerPage();
      unwatchSelectedData();
      unwatchSearchValue();
      unwatchSort();
      unwatchFilterValues();
    };
  };

  return { $store, actions, subscribe };
};
