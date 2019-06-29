import cloneDeep from 'lodash.clonedeep';
import { createModel } from '../src/model/index.js';
import { completeColumnsWithOptions } from '../src/utils';

let data;
let columns;

let modelStore;
let modelActions;

describe('model', () => {
  beforeEach(() => {
    data = [
      {
        firstColumn: 'f',
        secondColumn: {
          nested: 6,
        },
      },
      {
        firstColumn: 'a',
        secondColumn: {
          nested: 1,
        },
      },
      {
        firstColumn: 'c',
        secondColumn: {
          nested: 3,
        },
      },
      {
        firstColumn: 'b',
        secondColumn: {
          nested: 2,
        },
      },
      {
        firstColumn: 'e',
        secondColumn: {
          nested: 5,
        },
      },
      {
        firstColumn: 'd',
        secondColumn: {
          nested: 4,
        },
      },
    ];

    columns = [
      {
        name: 'firstColumn',
        label: 'First',
      },
      {
        name: 'secondColumn.nested',
        label: 'Second',
      },
    ];

    const { $store, actions } = createModel({
      data,
      columns: completeColumnsWithOptions(columns),
    });

    modelStore = $store;
    modelActions = actions;
  });

  it('should sort data by column name with dots in ASC direction', () => {
    modelActions.handleSort({ columnName: 'secondColumn.nested' });

    const expectedData = [
      {
        firstColumn: 'a',
        secondColumn: {
          nested: 1,
        },
      },
      {
        firstColumn: 'b',
        secondColumn: {
          nested: 2,
        },
      },
      {
        firstColumn: 'c',
        secondColumn: {
          nested: 3,
        },
      },
      {
        firstColumn: 'd',
        secondColumn: {
          nested: 4,
        },
      },
      {
        firstColumn: 'e',
        secondColumn: {
          nested: 5,
        },
      },
      {
        firstColumn: 'f',
        secondColumn: {
          nested: 6,
        },
      },
    ];

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should sort data by column name with dots in DESC direction', () => {
    modelActions.handleSort({
      columnName: 'secondColumn.nested',
      direction: 'DESC',
    });

    const expectedData = [
      {
        firstColumn: 'f',
        secondColumn: {
          nested: 6,
        },
      },
      {
        firstColumn: 'e',
        secondColumn: {
          nested: 5,
        },
      },
      {
        firstColumn: 'd',
        secondColumn: {
          nested: 4,
        },
      },
      {
        firstColumn: 'c',
        secondColumn: {
          nested: 3,
        },
      },
      {
        firstColumn: 'b',
        secondColumn: {
          nested: 2,
        },
      },
      {
        firstColumn: 'a',
        secondColumn: {
          nested: 1,
        },
      },
    ];

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should filter data by column name with dots', () => {
    const expectedData = [
      {
        firstColumn: 'c',
        secondColumn: {
          nested: 3,
        },
      },
    ];

    modelActions.addFilter({
      columnName: 'secondColumn.nested',
      value: 3,
    });

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should remove filter', () => {
    const expectedData = cloneDeep(data);

    modelActions.addFilter({
      columnName: 'firstColumn',
      value: 'a',
    });

    modelActions.removeFilter({
      columnName: 'firstColumn',
    });

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should reset all filters', () => {
    const expectedData = cloneDeep(data);

    modelActions.addFilter({
      columnName: 'firstColumn',
      value: 'a',
    });

    modelActions.addFilter({
      columnName: 'secondColumn.nested',
      value: 1,
    });

    modelActions.resetFilter();

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should search all columns', () => {
    const expectedData = [
      {
        firstColumn: 'a',
        secondColumn: {
          nested: 1,
        },
      },
    ];

    modelActions.handleSearchValue('a');

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should reset search value if search bar was closed', () => {
    const expectedData = cloneDeep(data);

    modelActions.toggleSearchBar();
    modelActions.handleSearchValue('a');
    modelActions.toggleSearchBar();

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should display rows by option perPageOption', () => {
    const expectedDisplayDataOnFirstPage = [
      {
        firstColumn: 'f',
        secondColumn: {
          nested: 6,
        },
      },
      {
        firstColumn: 'a',
        secondColumn: {
          nested: 1,
        },
      },
      {
        firstColumn: 'c',
        secondColumn: {
          nested: 3,
        },
      },
      {
        firstColumn: 'b',
        secondColumn: {
          nested: 2,
        },
      },
      {
        firstColumn: 'e',
        secondColumn: {
          nested: 5,
        },
      },
    ];

    expect(modelStore.getState().displayData).toEqual(
      expectedDisplayDataOnFirstPage
    );
  });

  it('should change count of displayed rows', () => {
    const expectedDisplayDataOnFirstPage = cloneDeep(data);

    modelActions.changePerPage(10);

    expect(modelStore.getState().displayData).toEqual(
      expectedDisplayDataOnFirstPage
    );
  });

  it('should paginate', () => {
    const expectedDisplayDataOnSecondPage = [
      {
        firstColumn: 'd',
        secondColumn: {
          nested: 4,
        },
      },
    ];

    modelActions.changePage(1);

    expect(modelStore.getState().displayData).toEqual(
      expectedDisplayDataOnSecondPage
    );
  });

  it('should delete selected data', () => {
    const expectedData = [
      {
        firstColumn: 'f',
        secondColumn: {
          nested: 6,
        },
      },
    ];

    modelActions.handleDelete([data[1], data[2], data[3], data[4], data[5]]);

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should remove only deleted data items from selected data', () => {
    const expectedSelectedData = [data[0], data[1]];

    modelActions.handleSelect([data[0], data[1], data[2], data[3]]);
    modelActions.handleDelete([data[2], data[3]]);

    expect(modelStore.getState().selectedData).toEqual(expectedSelectedData);
  });

  it('should delete from raw data', () => {
    const expectedData = [
      {
        firstColumn: 'a',
        secondColumn: {
          nested: 1,
        },
      },
      {
        firstColumn: 'c',
        secondColumn: {
          nested: 3,
        },
      },
      {
        firstColumn: 'b',
        secondColumn: {
          nested: 2,
        },
      },
      {
        firstColumn: 'e',
        secondColumn: {
          nested: 5,
        },
      },
      {
        firstColumn: 'd',
        secondColumn: {
          nested: 4,
        },
      },
    ];

    modelActions.handleSearchValue('a');
    modelActions.handleDelete([data[0]]);
    modelActions.handleSearchValue('');

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });

  it('should select enumarated data', () => {
    const expectedSelectedData = [data[1], data[3], data[5]];

    modelActions.handleSelect([data[1], data[3], data[5]]);

    expect(modelStore.getState().selectedData).toEqual(expectedSelectedData);
  });

  it('should select all data if there are no selected rows', () => {
    const expectedSelectedData = [
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
    ];

    modelActions.handleSelect([]);
    modelActions.toggleSelectAll();

    expect(modelStore.getState().selectedData).toEqual(expectedSelectedData);
  });

  it('should deselect all data if there is at least one selected data item', () => {
    const expectedSelectedData = [];

    modelActions.handleSelect([data[4]]);
    modelActions.toggleSelectAll();

    expect(modelStore.getState().selectedData).toEqual(expectedSelectedData);
  });

  it('should select data item if it was not selected', () => {
    const expectedSelectedData = [data[0]];

    modelActions.toggleSelectRow(data[0]);

    expect(modelStore.getState().selectedData).toEqual(expectedSelectedData);
  });

  it('should deselect data item if it was selected before', () => {
    const expectedSelectedData = [];

    modelActions.handleSelect([data[0]]);
    modelActions.toggleSelectRow(data[0]);

    expect(modelStore.getState().selectedData).toEqual(expectedSelectedData);
  });

  it('should select all only computed data', () => {
    modelActions.addFilter({ columnName: 'firstColumn', value: 'c' });
    modelActions.toggleSelectAll();

    expect(modelStore.getState().selectedData.length).toEqual(1);
  });

  it('should construct filter lists for each column and sort lists', () => {
    const expectedFilterLists = {
      firstColumn: {
        label: 'First',
        list: ['a', 'b', 'c', 'd', 'e', 'f'],
      },
      'secondColumn.nested': {
        label: 'Second',
        list: [1, 2, 3, 4, 5, 6],
      },
    };

    expect(modelStore.getState().filterLists).toEqual(expectedFilterLists);
  });

  it('should exclude column from filter lists if option filterable is false', () => {
    const columns = [
      {
        name: 'firstColumn',
        label: 'First',
        filterable: false,
      },
      {
        name: 'secondColumn.nested',
        label: 'Second',
      },
    ];

    const expectedFilterLists = {
      'secondColumn.nested': {
        label: 'Second',
        list: [1, 2, 3, 4, 5, 6],
      },
    };

    const { $store: modelStore, actions: modelActions } = createModel({
      data,
      columns: completeColumnsWithOptions(columns),
    });

    expect(modelStore.getState().filterLists).toEqual(expectedFilterLists);
  });

  it('should exclude column from search, if option searchable is false', () => {
    const columns = [
      {
        name: 'firstColumn',
        label: 'First',
        searchable: false,
      },
      {
        name: 'secondColumn.nested',
        label: 'Second',
      },
    ];

    const expectedData = [];

    const { $store: modelStore, actions: modelActions } = createModel({
      data,
      columns: completeColumnsWithOptions(columns),
    });

    modelActions.handleSearchValue('a');

    expect(modelStore.getState().computedData).toEqual(expectedData);
  });
});
