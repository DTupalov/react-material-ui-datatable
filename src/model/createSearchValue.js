import { createEvent, createStore } from 'effector';

export default (initialSearchValue, toggleSearchBar) => {
  const $searchValue = createStore(initialSearchValue);
  const handleSearchValue = createEvent();

  $searchValue
    .on(handleSearchValue, (_, nextSearchValue) => nextSearchValue)
    .reset(toggleSearchBar);

  return { $searchValue, handleSearchValue };
};
