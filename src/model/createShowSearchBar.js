import { createEvent, createStore } from 'effector';

export default initialShowSearchBar => {
  const $showSearchBar = createStore(initialShowSearchBar);
  const changeShowSearchBar = createEvent();
  const toggleSearchBar = createEvent();

  $showSearchBar
    .on(toggleSearchBar, showSearchBar => !showSearchBar)
    .on(changeShowSearchBar, (_, nextShowSearchBar) => nextShowSearchBar);

  return { $showSearchBar, changeShowSearchBar, toggleSearchBar };
};
