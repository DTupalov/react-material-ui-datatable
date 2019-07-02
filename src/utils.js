import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import memoizeByArgs from './memoizeByArgs';

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const sort = memoizeByArgs(columnsSortOptions =>
  memoizeByArgs(data =>
    orderBy(
      data,
      columnsSortOptions.map(option => option.columnName),
      columnsSortOptions.map(option => option.direction.toLowerCase())
    )
  )
);

export const search = memoizeByArgs((value, columns) =>
  memoizeByArgs(data =>
    data.filter(row =>
      columns.some(column =>
        column.searchable
          ? get(row, column.name)
            ? get(row, column.name)
                .toString()
                .includes(value)
            : value
            ? false
            : true
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

    data.forEach(row => {
      const value = get(row, column.name);
      const isStringOrNumber = ['string', 'number'].includes(typeof value);
      const isAlreadyInList = filter[column.name].list.includes(value);

      return (
        isStringOrNumber &&
        !isAlreadyInList &&
        filter[column.name].list.push(value)
      );
    });

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
