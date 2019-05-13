import { combine } from 'effector';
import { convertDataToFilterLists } from '../utils';

export default ($computedData, $columns) => {
  const $filterLists = combine(
    $computedData,
    $columns,
    (computedData, columns) => convertDataToFilterLists(computedData, columns)
  );

  return { $filterLists };
};
