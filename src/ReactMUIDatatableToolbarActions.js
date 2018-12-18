import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
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
