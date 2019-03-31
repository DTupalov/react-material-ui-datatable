import get from 'lodash.get';
import memoizeByArgs from './memoizeByArgs';

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const sort = memoizeByArgs((columnName, direction) =>
  memoizeByArgs(data =>
    // `concat()` for returning new array
    data.concat().sort((a, b) => {
      if (get(a, columnName) > get(b, columnName)) {
        return direction === 'ASC' ? 1 : -1;
      }
      if (get(a, columnName) < get(b, columnName)) {
        return direction === 'DESC' ? 1 : -1;
      }
      return 0;
    })
  )
);

export const search = memoizeByArgs((value, columns) =>
  memoizeByArgs(data =>
    data.filter(row =>
      columns.some(column =>
        column.searchable
          ? get(row, column.name)
              .toString()
              .includes(value)
          : false
      )
    )
  )
);

export const filter = memoizeByArgs((values, columns) =>
  memoizeByArgs(data =>
    data.filter(row =>
      columns.every(column =>
        column.filterable
          ? values[column.name]
            ? get(row, column.name) === values[column.name]
            : true
          : true
      )
    )
  )
);

export const paginate = memoizeByArgs((page, perPage) =>
  memoizeByArgs(data => data.slice(page * perPage, page * perPage + perPage))
);

export const convertDataToFilterLists = memoizeByArgs((data, columns) =>
  columns.reduce((filter, column) => {
    if (!column.filterable) return filter;

    filter[column.name] = {
      list: [],
      label: column.label,
    };

    data.forEach(
      row =>
        !filter[column.name].list.includes(get(row, column.name)) &&
        filter[column.name].list.push(get(row, column.name))
    );

    filter[column.name].list.sort();

    return filter;
  }, {})
);

export const completeColumnsWithOptions = columns =>
  columns.map(column => ({
    sortable: true,
    filterable: true,
    searchable: true,
    ...column,
  }));
