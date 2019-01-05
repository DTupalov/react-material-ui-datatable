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

storiesOf('ReactMUIDatatable', module)
  .add('basic', () => (
    <ReactMUIDatatable columns={columns} data={data} title={title} />
  ))
  .add('custom cell', () => {
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
  })
  .add('selectable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectable={true}
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
                action('Invert selected rows')(data, selectedRows);
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
                action('Received data and selectedRows')(data, selectedRows);
                action('Delete selected rows')(
                  data.filter(row =>
                    selectedRows.includes(row[metaSymbol].rawIndex)
                  )
                );
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
  .add('column dot name', () => {
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
  .add('column options', () => {
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
        label: 'Car model (no sort)',
        sortable: false,
      },
      {
        name: 'car.year',
        label: 'Car year (no filter)',
        filterable: false,
      },
    ];

    const data = usersWithCars;

    return <ReactMUIDatatable columns={columns} data={data} title={title} />;
  });
