import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import ReactMUIDatatableBody from './ReactMUIDatatableBody';
import ReactMUIDatatableFooter from './ReactMUIDatatableFooter';
import ReactMUIDatatableHeader from './ReactMUIDatatableHeader';
import ReactMUIDatatableProvider, {
  ReactMUIDatatableConsumer,
} from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbar from './ReactMUIDatatableToolbar';
import ReactMUIDatatableToolbarFilterValues from './ReactMUIDatatableToolbarFilterValues';
import ReactMUIDatatableToolbarSelect from './ReactMUIDatatableToolbarSelect';

const ReactMUIDatatable = props => {
  return (
    <ReactMUIDatatableProvider {...props}>
      <ReactMUIDatatableConsumer>
        {({ selectedRows }) => (
          <Paper>
            {selectedRows.length ? (
              <ReactMUIDatatableToolbarSelect />
            ) : (
              <ReactMUIDatatableToolbar />
            )}
            <ReactMUIDatatableToolbarFilterValues />
            <Table>
              <ReactMUIDatatableHeader />
              <ReactMUIDatatableBody />
              <ReactMUIDatatableFooter />
            </Table>
          </Paper>
        )}
      </ReactMUIDatatableConsumer>
    </ReactMUIDatatableProvider>
  );
};

export default ReactMUIDatatable;
