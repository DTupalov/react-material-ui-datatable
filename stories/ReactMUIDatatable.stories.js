import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { metaSymbol, ReactMUIDatatable } from '../src/';
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
  .add('onPageChanged', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      onPageChanged={action('onPageChanged called')}
    />
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
  .add('selectedRows', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectedRows={[0, 1, 2, 3]}
    />
  ))
  .add('toolbarSelectActions', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectedRows={[0, 1, 2, 3]}
      toolbarSelectActions={({
        data,
        selectedRows,
        updateSelectedRows,
        handleDelete,
      }) => {
        return (
          <React.Fragment>
            <IconButton
              onClick={() => {
                const nextSelectedRows = data.reduce(
                  (nextSelectedRows, row) => {
                    if (!selectedRows.includes(row[metaSymbol].rawIndex)) {
                      nextSelectedRows.push(row[metaSymbol].rawIndex);
                    }

                    return nextSelectedRows;
                  },
                  []
                );

                updateSelectedRows(nextSelectedRows);
              }}
            >
              <SwapHorizIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDelete(selectedRows);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        );
      }}
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
  .add('onShowSearchBarChanged', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      onShowSearchBarChanged={action('onShowSearchBarChanged called')}
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
  .add('onSearchValueChanged', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      onSearchValueChanged={action('onSearchValueChanged called')}
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
  .add('onSortChanged', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      onSortChanged={action('onSortChanged called')}
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
  .add('onFilterValuesChanged', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      onFilterValuesChanged={action('onFilterValuesChanged called')}
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
          selectedRows: count => `Выбрано ${count} элемент(ов)`,
        },
        pagination: {
          rowsPerPage: 'Кол-во на стр.',
          displayedRows: ({ from, to, count }) => `${from}-${to} из ${count}`,
        },
      }}
    />
  ));

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
  })
  .add('custom cell', props => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name',
        customCell: ({ value }) => {
          return <div style={{ color: 'red' }}>{value.toUpperCase()}</div>;
        },
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

    return <ReactMUIDatatable columns={columns} data={data} title={title} />;
  });
