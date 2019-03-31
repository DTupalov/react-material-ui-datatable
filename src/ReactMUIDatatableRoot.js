import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import { fromRenderProps } from 'recompose';
import ReactMUIDatatableBody from './ReactMUIDatatableBody';
import ReactMUIDatatableFooter from './ReactMUIDatatableFooter';
import ReactMUIDatatableHeader from './ReactMUIDatatableHeader';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbar from './ReactMUIDatatableToolbar';
import ReactMUIDatatableToolbarFilterValues from './ReactMUIDatatableToolbarFilterValues';
import ReactMUIDatatableToolbarSelect from './ReactMUIDatatableToolbarSelect';

const ReactMUIDatatableRoot = props => {
  return (
    <Paper>
      {props.selectedData.length ? (
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

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({ selectedData: datatableProps.selectedData })
)(ReactMUIDatatableRoot);
