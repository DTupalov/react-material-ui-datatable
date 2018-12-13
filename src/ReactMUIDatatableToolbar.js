import { Grid, Toolbar } from '@material-ui/core';
import React from 'react';
import { fromRenderProps } from 'recompose';
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
    showSearchBar: datatableProps.search.showSearchBar,
  })
)(ReactMUIDatatableToolbar);
