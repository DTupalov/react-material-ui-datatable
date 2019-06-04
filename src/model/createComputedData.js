import { combine } from 'effector';
import { filter, pipe, search, sort as sortFn } from '../utils';

export default ($data, $columns, $sort, $searchValue, $filterValues) => {
  const $computedData = combine(
    $data,
    $columns,
    $sort,
    $searchValue,
    $filterValues,
    (data, columns, sort, searchValue, filterValues) =>
      pipe(
        sortFn(sort),
        search(searchValue, columns),
        filter(filterValues, columns)
      )(data)
  );

  return { $computedData };
};
