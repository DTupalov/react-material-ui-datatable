export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const sort = ({ columnName, direction }) => data =>
  data.sort((a, b) => {
    if (a[columnName] > b[columnName]) {
      return direction === 'ASC' ? 1 : -1;
    }
    if (a[columnName] < b[columnName]) {
      return direction === 'DESC' ? 1 : -1;
    }
    return 0;
  });

export const search = ({ value }) => data =>
  data.filter(row =>
    Object.keys(row).some(column => row[column].toString().includes(value))
  );

export const filter = ({ values }) => data =>
  data.filter(row =>
    Object.keys(values).every(column =>
      values[column] === '' ? true : row[column] === values[column]
    )
  );

export const paginate = ({ page, perPage }) => data =>
  data.slice(page * perPage, page * perPage + perPage);

export const convertDataToFilterLists = ({ data, columns }) =>
  columns.reduce((filter, column) => {
    filter[column.name] = {
      list: [],
      label: column.label,
    };

    data.forEach(
      row =>
        !filter[column.name].list.includes(row[column.name]) &&
        filter[column.name].list.push(row[column.name])
    );

    filter[column.name].list.sort();

    return filter;
  }, {});

export const convertColumnsToFilterValues = ({ columns }) =>
  columns.reduce((filterValues, column) => {
    filterValues[column.name] = '';
    return filterValues;
  }, {});

export const metaSymbol = Symbol.for('meta');

export const addMetaRawIndexToData = data =>
  data.map((row, rawIndex) => {
    /** add uniq property to data array */
    row[metaSymbol] = {
      rawIndex,
    };

    return row;
  });
