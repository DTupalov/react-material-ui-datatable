import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import React, { useContext, useState } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarFilterPopover from './ReactMUIDatatableToolbarFilterPopover';

const ReactMUIDatatableToolbarActionsFilterAction = props => {
  const { localization } = useContext(ReactMUIDatatableContext);
  const [anchorEl, updateAnchorEl] = useState(null);

  return (
    <React.Fragment>
      <Tooltip title={localization.toolbar.filterAction}>
        <IconButton
          aria-label={localization.toolbar.filterAction}
          onClick={event => updateAnchorEl(event.currentTarget)}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <ReactMUIDatatableToolbarFilterPopover
        updateAnchorEl={updateAnchorEl}
        anchorEl={anchorEl}
      />
    </React.Fragment>
  );
};

export default ReactMUIDatatableToolbarActionsFilterAction;
