import { createEvent, createStore } from 'effector';

export default initialSort => {
  const $sort = createStore(initialSort);
  const handleSort = createEvent();

  $sort.on(
    handleSort,
    (sort, { columnName, direction = 'ASC', withMultiSorting = false }) => {
      const columnSortOptions = sort.find(
        columnSortOptions => columnSortOptions.columnName === columnName
      );

      const nextColumnSortOptions = {
        columnName,
        direction: columnSortOptions
          ? columnSortOptions.direction === 'ASC'
            ? 'DESC'
            : 'ASC'
          : direction,
      };

      if (withMultiSorting) {
        const nextSort = sort.filter(
          columnSortOptions => columnSortOptions.columnName !== columnName
        );
        nextSort.push(nextColumnSortOptions);
        return nextSort;
      } else {
        return [nextColumnSortOptions];
      }
    }
  );

  return { $sort, handleSort };
};
