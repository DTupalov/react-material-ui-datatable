import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarActionsFilterAction from './ReactMUIDatatableToolbarActionsFilterAction';

const ReactMUIDatatableToolbarActions = props => {
  const {
    toggleSearchBar,
    localization,
    searchable,
    filterable,
    toolbarActions,
    data,
    computedData,
    displayData,
  } = useContext(ReactMUIDatatableContext);

  return (
    <Grid item>
      {searchable && (
        <Tooltip title={localization.toolbar.searchAction}>
          <IconButton
            aria-label={localization.toolbar.searchAction}
            onClick={toggleSearchBar}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
      {filterable && <ReactMUIDatatableToolbarActionsFilterAction />}
      {Boolean(toolbarActions) &&
        toolbarActions({ data, computedData, displayData })}
    </Grid>
  );
};

export default ReactMUIDatatableToolbarActions;
