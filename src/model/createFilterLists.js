import { combine } from 'effector';
import { convertDataToFilterLists } from '../utils';

export default ($data, $columns) => {
  const $filterLists = combine($data, $columns, convertDataToFilterLists);

  return { $filterLists };
};
