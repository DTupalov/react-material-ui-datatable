import { createEvent, createStore } from 'effector';

export default initialColumns => {
  const $columns = createStore(initialColumns);
  const changeColumns = createEvent();

  $columns.on(changeColumns, (_, nextColumns) => nextColumns);

  return { $columns, changeColumns };
};
