import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { withStateHandlers } from 'recompose';
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
  <ReactMUIDatatable
    columns={columns}
    data={data}
    title={title}
    searchable={true}
    filterable={true}
    selectable={true}
  />
));
storiesOf('ReactMUIDatatable', module).add('basic', () => (
  <ReactMUIDatatable columns={columns} data={data} title={title} />
));

storiesOf('ReactMUIDatatable/Config', module)
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
  .add('searchable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      searchable={true}
    />
  ))
  .add('filterable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={title}
      filterable={true}
    />
  ));

storiesOf('ReactMUIDatatable/Columns', module)
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

    return (
      <ReactMUIDatatable
        columns={columns}
        data={data}
        title={title}
        searchable={true}
      />
    );
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

    return (
      <ReactMUIDatatable
        columns={columns}
        data={data}
        title={title}
        filterable={true}
      />
    );
  })
  .add('custom cell', () => {
    const Datatable = withStateHandlers(
      { v: 1 },
      { setV: state => () => ({ v: state.v + 1 }) }
    )(props => {
      const columns = [
        {
          name: 'firstName',
          label: 'First Name',
          customCell: ({ value }) => {
            return (
              <div style={{ color: 'red' }}>
                {value.toUpperCase() + '' + props.v}
              </div>
            );
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

      setTimeout(props.setV, 1000);

      return <ReactMUIDatatable columns={columns} data={data} title={title} />;
    });
    return <Datatable />;
  });
