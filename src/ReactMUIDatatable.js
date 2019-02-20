import React from 'react';
import ReactMUIDatatableProvider from './ReactMUIDatatableProvider';
import ReactMUIDatatableRoot from './ReactMUIDatatableRoot';

const ReactMUIDatatable = props => {
  return (
    <ReactMUIDatatableProvider {...props}>
      <ReactMUIDatatableRoot />
    </ReactMUIDatatableProvider>
  );
};

export default ReactMUIDatatable;
