import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarActions from './ReactMUIDatatableToolbarActions';
import ReactMUIDatatableToolbarSearchBar from './ReactMUIDatatableToolbarSearchBar';
import ReactMUIDatatableToolbarTitle from './ReactMUIDatatableToolbarTitle';

const ReactMUIDatatableToolbar = props => {
  return (
    <Toolbar>
      <Grid container>
        {props.showSearchBar ? (
          <ReactMUIDatatableToolbarSearchBar />
        ) : (
          <ReactMUIDatatableToolbarTitle />
        )}
        <ReactMUIDatatableToolbarActions />
      </Grid>
    </Toolbar>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    showSearchBar: datatableProps.showSearchBar,
  })
)(ReactMUIDatatableToolbar);
