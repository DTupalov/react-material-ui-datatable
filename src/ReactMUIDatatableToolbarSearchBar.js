import { Grid, IconButton, TextField, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const ReactMUIDatatableToolbarSearchBar = props => {
  return (
    <React.Fragment>
      <Grid item xs={true}>
        <TextField
          value={props.value}
          onChange={props.handleSearchValue}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Tooltip title="Close search">
          <IconButton aria-label="Close search" onClick={props.toggleSearchBar}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
};

export default ReactMUIDatatableToolbarSearchBar;
