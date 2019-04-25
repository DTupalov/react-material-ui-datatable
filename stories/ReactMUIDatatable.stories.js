import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ReactMUIDatatable } from '../src/';
import users from '../stubs/users.json';
import usersWithCars from '../stubs/usersWithCars.json';

const columns = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'age',
    label: 'Age',
  },
];

const title = 'Awesome list';

const data = users;

storiesOf('ReactMUIDatatable', module).add('common', () => (
  <ReactMUIDatatable columns={columns} data={data} title={title} />
));

storiesOf('ReactMUIDatatable/Props', module)
  .add('selectable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectable={false}
    />
  ))
  .add('searchable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      searchable={false}
    />
  ))
  .add('filterable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      filterable={false}
    />
  ))
  .add('page', () => (
    <ReactMUIDatatable columns={columns} data={data} title={title} page={10} />
  ))
  .add('perPage', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      perPage={15}
    />
  ))
  .add('perPageOption', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      perPageOption={[5, 15, 50]}
    />
  ))
  .add('selectedData', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectedData={[data[0], data[1], data[2], data[3]]}
    />
  ))
  .add('toolbarSelectActions', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectedData={[data[0], data[1], data[2], data[3]]}
      toolbarSelectActions={({
        data,
        selectedData,
        updateSelectedData,
        handleDelete,
      }) => {
        return (
          <React.Fragment>
            <IconButton
              onClick={() => {
                const nextSelectedData = data.reduce(
                  (nextSelectedData, row) => {
                    if (!selectedData.includes(row)) {
                      nextSelectedData.push(row);
                    }

                    return nextSelectedData;
                  },
                  []
                );

                updateSelectedData(nextSelectedData);
              }}
            >
              <SwapHorizIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDelete(selectedData);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        );
      }}
    />
  ))
  .add('toolbarActions', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      toolbarActions={() => (
        <React.Fragment>
          <IconButton onClick={action('click Add button')}>
            <AddCircleIcon />
          </IconButton>
        </React.Fragment>
      )}
    />
  ))
  .add('showSearchBar', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      showSearchBar={true}
    />
  ))
  .add('searchValue', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      showSearchBar={true}
      searchValue={'Jo'}
    />
  ))
  .add('sort', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      sort={{ columnName: 'firstName', direction: 'DESC' }}
    />
  ))
  .add('filterValues', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      filterValues={{ age: 20 }}
    />
  ))
  .add('onStateChanged', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      onStateChanged={action('onStateChanged')}
    />
  ))
  .add('localization', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      localization={{
        toolbar: {
          searchAction: 'Поиск',
          filterAction: 'Фильтры',
          closeSearch: 'Закрыть поиск',
        },
        filterLists: {
          title: 'Фильтр',
          allOption: 'Все',
          reset: 'Сброс',
        },
        toolbarSelect: {
          selectedData: count => `Выбрано ${count} элемент(ов)`,
        },
        pagination: {
          rowsPerPage: 'Кол-во на стр.',
          displayedRows: ({ from, to, count }) => `${from}-${to} из ${count}`,
        },
      }}
    />
  ))
  .add('custom cell', props => {
    return (
      <ReactMUIDatatable
        columns={columns}
        data={data}
        title={title}
        customCell={({ value, column }) => {
          if (column.name === 'firstName') {
            return <div style={{ color: 'red' }}>{value.toUpperCase()}</div>;
          }

          return value;
        }}
      />
    );
  });

storiesOf('ReactMUIDatatable/Props/columns', module)
  .add('name with dots', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name',
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <ReactMUIDatatable columns={columns} data={data} title={title} />;
  })
  .add('searchable', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name (no search)',
        searchable: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <ReactMUIDatatable columns={columns} data={data} title={title} />;
  })
  .add('sortable', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name (no sort)',
        sortable: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <ReactMUIDatatable columns={columns} data={data} title={title} />;
  })
  .add('filterable', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name (no filter)',
        filterable: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <ReactMUIDatatable columns={columns} data={data} title={title} />;
  });
