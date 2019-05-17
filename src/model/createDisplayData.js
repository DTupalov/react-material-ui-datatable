import { combine } from 'effector';
import { paginate } from '../utils';

export default ($computedData, $page, $perPage) => {
  const $displayData = combine(
    $computedData,
    $page,
    $perPage,
    (computedData, page, perPage) => paginate(page, perPage)(computedData)
  );

  return { $displayData };
};
