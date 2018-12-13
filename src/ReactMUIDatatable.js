import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import ReactMUIDatatableBody from './ReactMUIDatatableBody';
import ReactMUIDatatableHeader from './ReactMUIDatatableHeader';
import ReactMUIDatatableToolbar from './ReactMUIDatatableToolbar';
import ReactMUIDatatableToolbarFilterValues from './ReactMUIDatatableToolbarFilterValues';
import withReactMUIDatatable from './withReactMUIDatatable';

const ReactMUIDatatable = props => {
  return (
    <Paper>
      <ReactMUIDatatableToolbar />
      <ReactMUIDatatableToolbarFilterValues />
      <Table>
        <ReactMUIDatatableHeader />
        <ReactMUIDatatableBody />
      </Table>
    </Paper>
  );
};

export default withReactMUIDatatable(ReactMUIDatatable);
