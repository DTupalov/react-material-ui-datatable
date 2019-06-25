import { createEvent, createStore } from 'effector';

export default initialData => {
  const $data = createStore(initialData);
  const handleDelete = createEvent();

  $data.on(handleDelete, (data, deletedData) =>
    data.filter(dataItem => !deletedData.includes(dataItem))
  );

  return { $data, handleDelete };
};
