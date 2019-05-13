import { createEvent, createStore } from 'effector';

export default initialPage => {
  const $page = createStore(initialPage);
  const changePage = createEvent();

  $page.on(changePage, (_, nextPage) => nextPage);

  return { $page, changePage };
};
