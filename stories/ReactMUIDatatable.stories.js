import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ReactMUIDatatable } from '../src/';
import users from '../stubs/users.json';

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

const data = users;

storiesOf('ReactMUIDatatable', module)
  .add('basic', () => (
    <ReactMUIDatatable columns={columns} data={data} title={'Крутой список'} />
  ))
  .add('selectable', () => (
    <ReactMUIDatatable
      columns={columns}
      data={data}
      title={'Крутой список'}
      selectable={true}
      toolbarSelectActions={({ data, selectedRows }) => {
        return (
          <IconButton
            onClick={() => action('Delete selected rows')(data, selectedRows)}
          >
            <DeleteIcon />
          </IconButton>
        );
      }}
    />
  ));
