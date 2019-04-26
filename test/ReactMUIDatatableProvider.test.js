import React from 'react';
import renderer from 'react-test-renderer';
import ReactMUIDatatableProvider, {
  ReactMUIDatatableConsumer,
} from '../src/ReactMUIDatatableProvider';

let ReactMUIDatatable;
let RenderedMockedComponent;
let data;
let columns;
let onStateChanged;
class MockedComponent extends React.Component {
  render() {
    return null;
  }
}

describe('ReactMUIDatatableProvider', () => {
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

    ReactMUIDatatable = props => (
      <ReactMUIDatatableProvider {...props}>
        <ReactMUIDatatableConsumer>
          {datatableProps => <MockedComponent {...datatableProps} />}
        </ReactMUIDatatableConsumer>
      </ReactMUIDatatableProvider>
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
    RenderedMockedComponent.props.toggleSearchBar();
    RenderedMockedComponent.props.handleSearchValue('Caz');
    RenderedMockedComponent.props.handleSort({
      columnName: 'firstName',
      direction: 'DESC',
    });
    RenderedMockedComponent.props.addFilter({
      columnName: 'firstName',
      value: 'Caz',
    });
    RenderedMockedComponent.props.changePage(1);
    RenderedMockedComponent.props.changePerPage(15);
    RenderedMockedComponent.props.toggleSelectRow(data[0]);

    //7 times fire for initial state and 7 times - with direct call events;
    expect(onStateChanged).toBeCalledTimes(14);
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
