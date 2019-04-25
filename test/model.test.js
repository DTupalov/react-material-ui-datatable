import cloneDeep from 'lodash.clonedeep';
import createModel from '../src/model';
import { completeColumnsWithOptions } from '../src/utils';

let data;
let columns;

let modelStores;
let modelActions;

describe('model', () => {
  beforeEach(() => {
    data = [
      {
        name: 'Caz',
        age: 49,
        car: {
          make: 'Land Rover',
        },
      },
      {
        name: 'Dav',
        age: 69,
        car: {
          make: 'Mitsubishi',
        },
      },
      {
        name: 'Yule',
        age: 68,
        car: {
          make: 'Ford',
        },
      },
      {
        name: 'Fredra',
        age: 67,
        car: {
          make: 'GMC',
        },
      },
      {
        name: 'Ursula',
        age: 80,
        car: {
          make: 'BMW',
        },
      },
      {
        name: 'Ailsun',
        age: 41,
        car: {
          make: 'Honda',
        },
      },
    ];

    columns = [
      {
        name: 'name',
        label: 'Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
    ];

    const { stores, actions } = createModel({
      data,
      columns: completeColumnsWithOptions(columns),
    });

    modelStores = stores;
    modelActions = actions;
  });

  it('should sort data by column name with dots in ASC direction', () => {
    modelActions.handleSort({ columnName: 'car.make' });

    const expectedData = [
      {
        name: 'Ursula',
        age: 80,
        car: {
          make: 'BMW',
        },
      },
      {
        name: 'Yule',
        age: 68,
        car: {
          make: 'Ford',
        },
      },
      {
        name: 'Fredra',
        age: 67,
        car: {
          make: 'GMC',
        },
      },
      {
        name: 'Ailsun',
        age: 41,
        car: {
          make: 'Honda',
        },
      },
      {
        name: 'Caz',
        age: 49,
        car: {
          make: 'Land Rover',
        },
      },
      {
        name: 'Dav',
        age: 69,
        car: {
          make: 'Mitsubishi',
        },
      },
    ];

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should sort data by column name with dots in DESC direction', () => {
    modelActions.handleSort({
      columnName: 'car.make',
      direction: 'DESC',
    });

    const expectedData = [
      {
        name: 'Dav',
        age: 69,
        car: {
          make: 'Mitsubishi',
        },
      },
      {
        name: 'Caz',
        age: 49,
        car: {
          make: 'Land Rover',
        },
      },
      {
        name: 'Ailsun',
        age: 41,
        car: {
          make: 'Honda',
        },
      },
      {
        name: 'Fredra',
        age: 67,
        car: {
          make: 'GMC',
        },
      },
      {
        name: 'Yule',
        age: 68,
        car: {
          make: 'Ford',
        },
      },
      {
        name: 'Ursula',
        age: 80,
        car: {
          make: 'BMW',
        },
      },
    ];

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should filter data by column name with dots', () => {
    const expectedData = [
      {
        name: 'Dav',
        age: 69,
        car: {
          make: 'Mitsubishi',
        },
      },
    ];

    modelActions.addFilter({
      columnName: 'car.make',
      value: 'Mitsubishi',
    });

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should remove filter', () => {
    const expectedData = cloneDeep(data);

    modelActions.addFilter({
      columnName: 'car.make',
      value: 'Mitsubishi',
    });

    modelActions.removeFilter({
      columnName: 'car.make',
    });

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should reset all filters', () => {
    const expectedData = cloneDeep(data);

    modelActions.addFilter({
      columnName: 'car.make',
      value: 'Mitsubishi',
    });

    modelActions.addFilter({
      columnName: 'name',
      value: 'Dav',
    });

    modelActions.resetFilter();

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should search all columns', () => {
    const expectedData = [
      {
        name: 'Caz',
        age: 49,
        car: {
          make: 'Land Rover',
        },
      },
      {
        name: 'Yule',
        age: 68,
        car: {
          make: 'Ford',
        },
      },
      {
        name: 'Ailsun',
        age: 41,
        car: {
          make: 'Honda',
        },
      },
    ];

    modelActions.handleSearchValue('o');

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should reset search value if search bar was closed', () => {
    const expectedData = cloneDeep(data);

    modelActions.toggleSearchBar();
    modelActions.handleSearchValue('o');
    modelActions.toggleSearchBar();

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should display rows by option perPageOption', () => {
    const expectedDisplayDataOnFirstPage = [
      {
        name: 'Caz',
        age: 49,
        car: {
          make: 'Land Rover',
        },
      },
      {
        name: 'Dav',
        age: 69,
        car: {
          make: 'Mitsubishi',
        },
      },
      {
        name: 'Yule',
        age: 68,
        car: {
          make: 'Ford',
        },
      },
      {
        name: 'Fredra',
        age: 67,
        car: {
          make: 'GMC',
        },
      },
      {
        name: 'Ursula',
        age: 80,
        car: {
          make: 'BMW',
        },
      },
    ];

    expect(modelStores.displayData.getState()).toEqual(
      expectedDisplayDataOnFirstPage
    );
  });

  it('should change count of displayed rows', () => {
    const expectedDisplayDataOnFirstPage = cloneDeep(data);

    modelActions.changePerPage(10);

    expect(modelStores.displayData.getState()).toEqual(
      expectedDisplayDataOnFirstPage
    );
  });

  it('should paginate', () => {
    const expectedDisplayDataOnSecondPage = [
      {
        name: 'Ailsun',
        age: 41,
        car: {
          make: 'Honda',
        },
      },
    ];

    modelActions.changePage(1);

    expect(modelStores.displayData.getState()).toEqual(
      expectedDisplayDataOnSecondPage
    );
  });

  it('should delete selected data', () => {
    const expectedData = [
      {
        name: 'Caz',
        age: 49,
        car: {
          make: 'Land Rover',
        },
      },
    ];

    modelActions.handleDelete([data[1], data[2], data[3], data[4], data[5]]);

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should remove only deleted data items from selected data', () => {
    const expectedSelectedData = [data[0], data[1]];

    modelActions.handleSelect([data[0], data[1], data[2], data[3]]);
    modelActions.handleDelete([data[2], data[3]]);

    expect(modelStores.selectedData.getState()).toEqual(expectedSelectedData);
  });

  it('should delete from raw data', () => {
    const expectedData = [
      {
        name: 'Dav',
        age: 69,
        car: {
          make: 'Mitsubishi',
        },
      },
      {
        name: 'Yule',
        age: 68,
        car: {
          make: 'Ford',
        },
      },
      {
        name: 'Fredra',
        age: 67,
        car: {
          make: 'GMC',
        },
      },
      {
        name: 'Ursula',
        age: 80,
        car: {
          make: 'BMW',
        },
      },
      {
        name: 'Ailsun',
        age: 41,
        car: {
          make: 'Honda',
        },
      },
    ];

    modelActions.handleSearchValue('a');
    modelActions.handleDelete([data[0]]);
    modelActions.handleSearchValue('');

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });

  it('should select enumarated data', () => {
    const expectedSelectedData = [data[1], data[3], data[5]];

    modelActions.handleSelect([data[1], data[3], data[5]]);

    expect(modelStores.selectedData.getState()).toEqual(expectedSelectedData);
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

    expect(modelStores.selectedData.getState()).toEqual(expectedSelectedData);
  });

  it('should deselect all data if there is at least one selected data item', () => {
    const expectedSelectedData = [];

    modelActions.handleSelect([data[4]]);
    modelActions.toggleSelectAll();

    expect(modelStores.selectedData.getState()).toEqual(expectedSelectedData);
  });

  it('should select data item if it was not selected', () => {
    const expectedSelectedData = [data[0]];

    modelActions.toggleSelectRow(data[0]);

    expect(modelStores.selectedData.getState()).toEqual(expectedSelectedData);
  });

  it('should deselect data item if it was selected before', () => {
    const expectedSelectedData = [];

    modelActions.handleSelect([data[0]]);
    modelActions.toggleSelectRow(data[0]);

    expect(modelStores.selectedData.getState()).toEqual(expectedSelectedData);
  });

  it('should construct filter lists for each column and sort lists', () => {
    const expectedFilterLists = {
      age: {
        label: 'Age',
        list: [41, 49, 67, 68, 69, 80],
      },
      'car.make': {
        label: 'Car make',
        list: ['BMW', 'Ford', 'GMC', 'Honda', 'Land Rover', 'Mitsubishi'],
      },
      name: {
        label: 'Name',
        list: ['Ailsun', 'Caz', 'Dav', 'Fredra', 'Ursula', 'Yule'],
      },
    };

    expect(modelStores.filterLists.getState()).toEqual(expectedFilterLists);
  });

  it('should exclude column from filter lists if option filterable is false', () => {
    const columns = [
      {
        name: 'name',
        label: 'Name',
        filterable: false,
      },
      {
        name: 'age',
        label: 'Age',
        filterable: false,
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
    ];

    const expectedFilterLists = {
      'car.make': {
        label: 'Car make',
        list: ['BMW', 'Ford', 'GMC', 'Honda', 'Land Rover', 'Mitsubishi'],
      },
    };

    const { stores: modelStores, actions: modelActions } = createModel({
      data,
      columns: completeColumnsWithOptions(columns),
    });

    expect(modelStores.filterLists.getState()).toEqual(expectedFilterLists);
  });

  it('should exclude column from search, if option searchable is false', () => {
    const columns = [
      {
        name: 'name',
        label: 'Name',
        searchable: false,
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
    ];

    const expectedData = [
      { age: 49, car: { make: 'Land Rover' }, name: 'Caz' },
    ];

    const { stores: modelStores, actions: modelActions } = createModel({
      data,
      columns: completeColumnsWithOptions(columns),
    });

    modelActions.handleSearchValue('e');

    expect(modelStores.computedData.getState()).toEqual(expectedData);
  });
});
