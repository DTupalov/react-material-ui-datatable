export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const sort = ({ column, direction }) => data =>
  data.sort((a, b) => {
    if (a[column] > b[column]) {
      return direction === 'ASC' ? 1 : -1;
    }
    if (a[column] < b[column]) {
      return direction === 'DESC' ? 1 : -1;
    }
    return 0;
  });

export const search = ({ value }) => data =>
  data.filter(row =>
    Object.keys(row).some(column => row[column].includes(value))
  );

export const filter = ({ values }) => data =>
  data.filter(row =>
    Object.keys(values).every(column =>
      values[column] === '' ? true : row[column] === values[column]
    )
  );

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
