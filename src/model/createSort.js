import { createEvent, createStore } from 'effector';

export default initialSort => {
  const $sort = createStore(initialSort);
  const handleSort = createEvent();

  $sort.on(handleSort, (_, { columnName, direction = 'ASC' }) => ({
    columnName,
    direction,
  }));

  return { $sort, handleSort };
};
