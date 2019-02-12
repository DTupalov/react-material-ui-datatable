import get from 'lodash.get';
import memoizeByArgs from './memoizeByArgs';

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const sort = memoizeByArgs((columnName, direction) =>
  memoizeByArgs(data =>
    // `concat()` for returning a new array
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
          ? values[column.name] === ''
            ? true
            : get(row, column.name) === values[column.name]
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

export const convertColumnsToFilterValues = memoizeByArgs(columns =>
  columns.reduce((filterValues, column) => {
    filterValues[column.name] = '';
    return filterValues;
  }, {})
);

export const metaSymbol = Symbol('meta');

export const addMetaRawIndexToData = data =>
  data.map((row, rawIndex) => {
    /** add uniq property to data array */
    Object.defineProperty(row, metaSymbol, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: { rawIndex },
    });

    return row;
  });

export const completeColumnsWithOptions = columns =>
  columns.map(column => ({
    sortable: true,
    filterable: true,
    searchable: true,
    ...column,
  }));
