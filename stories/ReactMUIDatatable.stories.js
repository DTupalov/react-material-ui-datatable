import { storiesOf } from '@storybook/react';
import React from 'react';
import { ReactMUIDatatable } from '../src/';

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

const data = [
  {
    firstName: 'Dima',
    lastName: 'Tupalov',
    age: '31',
  },
  {
    firstName: 'Pasha',
    lastName: 'Antonov',
    age: '27',
  },
  {
    firstName: 'Ivan',
    lastName: 'Popov',
    age: '21',
  },
  {
    firstName: 'Petea',
    lastName: 'Petrov',
    age: '26',
  },
  {
    firstName: 'Milana',
    lastName: 'Starovoitova',
    age: '17',
  },
  {
    firstName: 'Alex',
    lastName: 'Dan',
    age: '21',
  },
];

storiesOf('ReactMUIDatatable', module).add('basic', () => (
  <ReactMUIDatatable columns={columns} data={data} title={'Крутой список'} />
));
