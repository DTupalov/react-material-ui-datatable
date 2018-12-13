import React from 'react';
import ReactMUIDatatableModel from './ReactMUIDatatableModel';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const withReactMUIDatatable = Component => props => {
  return (
    <ReactMUIDatatableModel {...props}>
      <ReactMUIDatatableConsumer>
        {({ ...datatableProps }) => <Component {...datatableProps} />}
      </ReactMUIDatatableConsumer>
    </ReactMUIDatatableModel>
  );
};

export default withReactMUIDatatable;
