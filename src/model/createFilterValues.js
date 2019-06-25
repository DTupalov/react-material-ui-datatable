import { createEvent, createStore } from 'effector';

export default initialFilterValues => {
  const $filterValues = createStore(initialFilterValues);
  const addFilter = createEvent();
  const removeFilter = createEvent();
  const resetFilter = createEvent();

  $filterValues
    .on(addFilter, (filterValues, { columnName, value }) => ({
      ...filterValues,
      [columnName]: value,
    }))
    .on(removeFilter, (filterValues, { columnName }) =>
      Object.keys(filterValues).reduce((nextFilterValues, prevColumnName) => {
        if (prevColumnName !== columnName) {
          nextFilterValues[prevColumnName] = filterValues[prevColumnName];
        }
        return nextFilterValues;
      }, {})
    )
    .on(resetFilter, filterValues => ({}));

  return {
    $filterValues,
    addFilter,
    removeFilter,
    resetFilter,
  };
};
