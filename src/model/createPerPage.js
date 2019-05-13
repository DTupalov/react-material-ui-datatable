import { createEvent, createStore } from 'effector';

export default initialPerPage => {
  const $perPage = createStore(initialPerPage);
  const changePerPage = createEvent();

  $perPage.on(changePerPage, (_, nextPerPage) => nextPerPage);

  return { $perPage, changePerPage };
};
