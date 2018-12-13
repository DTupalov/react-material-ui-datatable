import { Grid, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarActionsFilterAction from './ReactMUIDatatableToolbarActionsFilterAction';

const ReactMUIDatatableToolbarActions = props => {
  return (
    <Grid item>
      <Tooltip title="Search">
        <IconButton aria-label="Search" onClick={props.toggleSearchBar}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <ReactMUIDatatableToolbarActionsFilterAction />
    </Grid>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    toggleSearchBar: datatableProps.toggleSearchBar,
  })
)(ReactMUIDatatableToolbarActions);
