import { createEvent, createStore } from 'effector';

export default initialData => {
  const $data = createStore(initialData);
  const changeData = createEvent();
  const handleDelete = createEvent();

  $data
    .on(changeData, (_, nextData) => nextData)
    .on(handleDelete, (data, deletedData) =>
      data.filter(dataItem => !deletedData.includes(dataItem))
    );

  return { $data, changeData, handleDelete };
};
