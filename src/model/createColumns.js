import { createStore } from 'effector';

export default initialColumns => {
  const $columns = createStore(initialColumns);

  return { $columns };
};
