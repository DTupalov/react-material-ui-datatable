import { createEvent, createStore, sample } from 'effector';

export default (initialSelectedData, $data, handleDelete) => {
  const $selectedData = createStore(initialSelectedData);
  const toggleSelectRow = createEvent();
  const toggleSelectAll = createEvent();
  const handleSelect = createEvent();

  $selectedData
    .on(handleSelect, (_, nextSelectedData) => nextSelectedData)
    .on(toggleSelectRow, (selectedData, selectedDataItem) => {
      const nextSelectedData = [...selectedData];
      const dataIndex = nextSelectedData.findIndex(
        data => data === selectedDataItem
      );
      if (dataIndex !== -1) {
        nextSelectedData.splice(dataIndex, 1);
      } else {
        nextSelectedData.push(selectedDataItem);
      }
      return nextSelectedData;
    })
    .on(sample($data, toggleSelectAll), (selectedData, data) =>
      selectedData.length ? [] : [...data]
    )
    .on(handleDelete, (selectedData, deletedData) =>
      selectedData.filter(dataIndex => !deletedData.includes(dataIndex))
    );

  return { $selectedData, toggleSelectRow, toggleSelectAll, handleSelect };
};
