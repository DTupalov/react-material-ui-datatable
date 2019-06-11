import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarSearchBar = props => {
  const {
    searchValue,
    handleSearchValue,
    toggleSearchBar,
    localization,
  } = useContext(ReactMUIDatatableContext);

  return (
    <React.Fragment>
      <Grid item xs={true}>
        <TextField
          value={searchValue}
          onChange={event => handleSearchValue(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Tooltip title={localization.toolbar.closeSearch}>
          <IconButton
            aria-label={localization.toolbar.closeSearch}
            onClick={toggleSearchBar}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
};

export default ReactMUIDatatableToolbarSearchBar;
