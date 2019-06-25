import { createEvent, createStore } from 'effector';

export default initialShowSearchBar => {
  const $showSearchBar = createStore(initialShowSearchBar);
  const toggleSearchBar = createEvent();

  $showSearchBar.on(toggleSearchBar, showSearchBar => !showSearchBar);

  return { $showSearchBar, toggleSearchBar };
};
