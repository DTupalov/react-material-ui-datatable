import { combine, createEvent, createStore, createStoreObject } from 'effector';
import {
  convertDataToFilterLists,
  filter,
  paginate,
  pipe,
  search,
  sort as sortFn,
} from './utils';

const createWatcher = (onChange, store) => name => value => {
  const {
    searchValue,
    showSearchBar,
    sort,
    filterValues,
    page,
    perPage,
    selectedData,
  } = store.getState();

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

const createModel = ({
  data: initialData = [],
  columns: initialColumns = [],
  showSearchBar: initialShowSearchBar = false,
  searchValue: initialSearchValue = '',
  sort: initialSort = { columnName: null, direction: 'ASC' },
  page: initialPage = 0,
  perPage: initialPerPage = 5,
  selectedData: initialSelectedData = [],
  filterValues: initialFilterValues = {},
}) => {
  /** data */
  const data = createStore(initialData);
  const changeData = createEvent();
  const handleDelete = createEvent();

  data
    .on(changeData, (_, nextData) => nextData)
    .on(handleDelete, (data, deletedData) =>
      data.filter(dataItem => !deletedData.includes(dataItem))
    );

  /** columns */
  const columns = createStore(initialColumns);
  const changeColumns = createEvent();

  columns.on(changeColumns, (_, nextColumns) => nextColumns);

  /** sort */
  const sort = createStore(initialSort);
  const handleSort = createEvent();

  sort.on(handleSort, (_, { columnName, direction = 'ASC' }) => ({
    columnName,
    direction,
  }));

  /** showSearchBar */
  const showSearchBar = createStore(initialShowSearchBar);
  const changeShowSearchBar = createEvent();
  const toggleSearchBar = createEvent();

  showSearchBar
    .on(toggleSearchBar, showSearchBar => !showSearchBar)
    .on(changeShowSearchBar, (_, nextShowSearchBar) => nextShowSearchBar);

  /** searchValue */
  const searchValue = createStore(initialSearchValue);
  const handleSearchValue = createEvent();

  searchValue
    .on(handleSearchValue, (_, nextSearchValue) => nextSearchValue)
    .reset(toggleSearchBar);

  /** selectedData */
  const selectedData = createStore(initialSelectedData);
  const toggleSelectRow = createEvent();
  const toggleSelectAll = createEvent();
  const handleSelect = createEvent();

  selectedData
    .on(handleSelect, (_, nextSelectedData) => nextSelectedData)
    .on(toggleSelectRow, (selectedData, selectedDataItem) => {
      const nextSelectedData = [...selectedData];
      const dataIndex = nextSelectedData.findIndex(
        data => data === selectedDataItem
      );
      if (dataIndex !== -1) {
        nextSelectedData.splice(dataIndex, 1);
      } else {
        nextSelectedData.push(selectedDataItem);
      }
      return nextSelectedData;
    })
    .on(toggleSelectAll, selectedData =>
      selectedData.length ? [] : [...data.getState()]
    )
    .on(handleDelete, (selectedData, deletedData) =>
      selectedData.filter(dataIndex => !deletedData.includes(dataIndex))
    );

  /** filterValues */
  const filterValues = createStore(initialFilterValues);
  const changeFilterValues = createEvent();
  const addFilter = createEvent();
  const removeFilter = createEvent();
  const resetFilter = createEvent();

  filterValues
    .on(addFilter, (filterValues, { columnName, value }) => ({
      ...filterValues,
      [columnName]: value,
    }))
    .on(removeFilter, (filterValues, { columnName }) =>
      Object.keys(filterValues).reduce((nextFilterValues, prevColumnName) => {
        if (prevColumnName !== columnName) {
          nextFilterValues[prevColumnName] = filterValues[prevColumnName];
        }
        return nextFilterValues;
      }, {})
    )
    .on(changeFilterValues, (_, nextFilterValues) => nextFilterValues)
    .reset(resetFilter);

  /** page */
  const page = createStore(initialPage);
  const changePage = createEvent();

  page.on(changePage, (_, nextPage) => nextPage);

  /** perPage */
  const perPage = createStore(initialPerPage);
  const changePerPage = createEvent();

  perPage.on(changePerPage, (_, nextPerPage) => nextPerPage);

  /** Computed Stores */
  const computedData = combine(
    data,
    columns,
    sort,
    searchValue,
    filterValues,
    (data, columns, sort, searchValue, filterValues) =>
      pipe(
        sortFn(sort.columnName, sort.direction),
        search(searchValue, columns),
        filter(filterValues, columns)
      )(data)
  );
  const filterLists = combine(computedData, columns, (computedData, columns) =>
    convertDataToFilterLists(computedData, columns)
  );
  const displayData = combine(
    computedData,
    page,
    perPage,
    (computedData, page, perPage) => paginate(page, perPage)(computedData)
  );

  /** Stores object */
  const store = createStoreObject({
    data,
    columns,
    sort,
    filterValues,
    searchValue,
    showSearchBar,
    selectedData,
    page,
    perPage,
    computedData,
    filterLists,
    displayData,
  });

  /** Actions object */
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

  const subscribe = subscriber => {
    const createStoreWatcher = createWatcher(subscriber, store);

    const unwatchShowSearchBar = showSearchBar.watch(
      createStoreWatcher('showSearchBar')
    );
    const unwatchPage = page.watch(createStoreWatcher('page'));
    const unwatchPerPage = perPage.watch(createStoreWatcher('perPage'));
    const unwatchSelectedData = selectedData.watch(
      createStoreWatcher('selectedData')
    );
    const unwatchSearchValue = searchValue.watch(
      createStoreWatcher('searchValue')
    );
    const unwatchSort = sort.watch(createStoreWatcher('sort'));
    const unwatchFilterValues = filterValues.watch(
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

  return { store, actions, subscribe };
};

export default createModel;
