import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import renderer from 'react-test-renderer';
import { default as withReactMUIDatatableModel } from '../src/withReactMUIDatatableModel';

let ReactMUIDatatable;
let RenderedMockedComponent;
let data;
let columns;
let onStateChanged;
class MockedComponent extends React.Component {
  render() {
    // console.log(this.props);
    return null;
  }
}

describe('withReactMUIDatatableModel', () => {
  beforeEach(() => {
    onStateChanged = jest.fn(event => {});

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
      { name: 'name', label: 'Name' },
      { name: 'age', label: 'Age' },
      { name: 'car.make', label: 'Car make' },
    ];

    ReactMUIDatatable = withReactMUIDatatableModel(
      jest.fn(props => <MockedComponent {...props} />)
    );

    RenderedMockedComponent = renderer
      .create(
        <ReactMUIDatatable
          data={data}
          columns={columns}
          onStateChanged={onStateChanged}
        />
      )
      .root.findByType(MockedComponent);
  });

  it('should sort data by column name with dots in ASC direction', () => {
    RenderedMockedComponent.props.handleSort({ columnName: 'car.make' });

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

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should sort data by column name with dots in DESC direction', () => {
    RenderedMockedComponent.props.handleSort({
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

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
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

    RenderedMockedComponent.props.addFilter({
      columnName: 'car.make',
      value: 'Mitsubishi',
    });

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should remove filter', () => {
    const expectedData = cloneDeep(data);

    RenderedMockedComponent.props.addFilter({
      columnName: 'car.make',
      value: 'Mitsubishi',
    });

    RenderedMockedComponent.props.removeFilter({
      columnName: 'car.make',
    });

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should reset all filters', () => {
    const expectedData = cloneDeep(data);

    RenderedMockedComponent.props.addFilter({
      columnName: 'car.make',
      value: 'Mitsubishi',
    });

    RenderedMockedComponent.props.addFilter({
      columnName: 'name',
      value: 'Dav',
    });

    RenderedMockedComponent.props.resetFilter();

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
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

    RenderedMockedComponent.props.handleSearchValue('o');

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should reset search value if search bar was closed', () => {
    const expectedData = cloneDeep(data);

    RenderedMockedComponent.props.toggleSearchBar();
    RenderedMockedComponent.props.handleSearchValue('o');
    RenderedMockedComponent.props.toggleSearchBar();

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
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

    expect(RenderedMockedComponent.props.displayData).toEqual(
      expectedDisplayDataOnFirstPage
    );
  });

  it('should change count of displayed rows', () => {
    const expectedDisplayDataOnFirstPage = cloneDeep(data);

    RenderedMockedComponent.props.changePerPage(10);

    expect(RenderedMockedComponent.props.displayData).toEqual(
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

    RenderedMockedComponent.props.changePage(1);

    expect(RenderedMockedComponent.props.displayData).toEqual(
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

    RenderedMockedComponent.props.handleDelete([
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
    ]);

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should remove only deleted data items from selected data', () => {
    const expectedSelectedData = [data[0], data[1]];

    RenderedMockedComponent.props.handleSelect([
      data[0],
      data[1],
      data[2],
      data[3],
    ]);
    RenderedMockedComponent.props.handleDelete([data[2], data[3]]);

    expect(RenderedMockedComponent.props.selectedData).toEqual(
      expectedSelectedData
    );
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

    RenderedMockedComponent.props.handleSearchValue('a');
    RenderedMockedComponent.props.handleDelete([data[0]]);
    RenderedMockedComponent.props.handleSearchValue('');

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should select enumarated data', () => {
    const expectedSelectedData = [data[1], data[3], data[5]];

    RenderedMockedComponent.props.handleSelect([data[1], data[3], data[5]]);

    expect(RenderedMockedComponent.props.selectedData).toEqual(
      expectedSelectedData
    );
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

    RenderedMockedComponent.props.handleSelect([]);
    RenderedMockedComponent.props.toggleSelectAll();

    expect(RenderedMockedComponent.props.selectedData).toEqual(
      expectedSelectedData
    );
  });

  it('should deselect all data if there is at least one selected data item', () => {
    const expectedSelectedData = [];

    RenderedMockedComponent.props.handleSelect([data[4]]);
    RenderedMockedComponent.props.toggleSelectAll();

    expect(RenderedMockedComponent.props.selectedData).toEqual(
      expectedSelectedData
    );
  });

  it('should select data item if it was not selected', () => {
    const expectedSelectedData = [data[0]];

    RenderedMockedComponent.props.toggleSelectRow(data[0]);

    expect(RenderedMockedComponent.props.selectedData).toEqual(
      expectedSelectedData
    );
  });

  it('should deselect data item if it was selected before', () => {
    const expectedSelectedData = [];

    RenderedMockedComponent.props.handleSelect([data[0]]);
    RenderedMockedComponent.props.toggleSelectRow(data[0]);

    expect(RenderedMockedComponent.props.selectedData).toEqual(
      expectedSelectedData
    );
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

    expect(RenderedMockedComponent.props.filterLists).toEqual(
      expectedFilterLists
    );
  });

  it('should exclude column from filter lists if option filterable is false', () => {
    const columns = [
      { name: 'name', label: 'Name', filterable: false },
      { name: 'age', label: 'Age', filterable: false },
      { name: 'car.make', label: 'Car make' },
    ];

    const expectedFilterLists = {
      'car.make': {
        label: 'Car make',
        list: ['BMW', 'Ford', 'GMC', 'Honda', 'Land Rover', 'Mitsubishi'],
      },
    };

    const RenderedMockedComponent = renderer
      .create(<ReactMUIDatatable data={data} columns={columns} />)
      .root.findByType(MockedComponent);

    expect(RenderedMockedComponent.props.filterLists).toEqual(
      expectedFilterLists
    );
  });

  it('should exclude column from search, if option searchable is false', () => {
    const columns = [
      { name: 'name', label: 'Name', searchable: false },
      { name: 'age', label: 'Age' },
      { name: 'car.make', label: 'Car make' },
    ];

    const expectedData = [
      { age: 49, car: { make: 'Land Rover' }, name: 'Caz' },
    ];

    const RenderedMockedComponent = renderer
      .create(<ReactMUIDatatable data={data} columns={columns} />)
      .root.findByType(MockedComponent);

    RenderedMockedComponent.props.handleSearchValue('e');

    expect(RenderedMockedComponent.props.computedData).toEqual(expectedData);
  });

  it('should return default toolbarSelectActions with delete icon if this prop was not received', () => {
    const ToolbarSelectActions = RenderedMockedComponent.props.toolbarSelectActions(
      {}
    );

    const tree = renderer.create(ToolbarSelectActions);

    expect(tree).toMatchSnapshot();
  });

  it('should return string for selectedData localization', () => {
    expect(
      RenderedMockedComponent.props.localization.toolbarSelect.selectedData(2)
    ).toBe('2 row(s) selected');
  });

  it('should return string for displayedRows localization', () => {
    expect(
      RenderedMockedComponent.props.localization.pagination.displayedRows({
        from: 1,
        to: 5,
        count: 10,
      })
    ).toBe('1-5 of 10');
  });

  it('it should fire onStateChanged event if one of state properties was changed', () => {
    /**
     *  Used directly "setState" because we need to check only triggering `onStateChanged`
     */
    RenderedMockedComponent.props.setShowSearchBar(true);
    RenderedMockedComponent.props.setSearchValue('Caz');
    RenderedMockedComponent.props.setSort({
      columnName: 'firstName',
      direction: 'DESC',
    });
    RenderedMockedComponent.props.setFilterValues({ firstName: 'Caz' });
    RenderedMockedComponent.props.setPage(1);
    RenderedMockedComponent.props.setPerPage(15);
    RenderedMockedComponent.props.setSelectedData([data[0]]);

    expect(onStateChanged).toBeCalledTimes(7);
    expect(onStateChanged).toHaveBeenLastCalledWith({
      name: 'selectedData',
      value: [data[0]],
      state: {
        searchValue: 'Caz',
        showSearchBar: true,
        sort: { columnName: 'firstName', direction: 'DESC' },
        filterValues: { firstName: 'Caz' },
        page: 1,
        perPage: 15,
        selectedData: [data[0]],
      },
    });
  });
});
