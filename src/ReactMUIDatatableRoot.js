import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React, { useContext } from 'react';
import ReactMUIDatatableBody from './ReactMUIDatatableBody';
import ReactMUIDatatableFooter from './ReactMUIDatatableFooter';
import ReactMUIDatatableHeader from './ReactMUIDatatableHeader';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbar from './ReactMUIDatatableToolbar';
import ReactMUIDatatableToolbarFilterValues from './ReactMUIDatatableToolbarFilterValues';
import ReactMUIDatatableToolbarSelect from './ReactMUIDatatableToolbarSelect';

const ReactMUIDatatableRoot = props => {
  const { selectedData } = useContext(ReactMUIDatatableContext);

  return (
    <Paper>
      {selectedData.length ? (
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
  );
};

export default ReactMUIDatatableRoot;
