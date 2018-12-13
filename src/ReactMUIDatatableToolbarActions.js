import { Grid, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import ReactMUIDatatableToolbarActionsFilterAction from './ReactMUIDatatableToolbarActionsFilterAction';

const ReactMUIDatatableToolbarActions = props => {
  return (
    <Grid item>
      <Tooltip title="Search">
        <IconButton aria-label="Search" onClick={props.toggleSearchBar}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <ReactMUIDatatableToolbarActionsFilterAction
        filterLists={props.filterLists}
        filterValues={props.filterValues}
        addFilter={props.addFilter}
        resetFilter={props.resetFilter}
        columns={props.columns}
      />
    </Grid>
  );
};

export default ReactMUIDatatableToolbarActions;
