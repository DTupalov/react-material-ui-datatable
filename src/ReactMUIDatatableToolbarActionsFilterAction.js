import { IconButton, Tooltip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import { toRenderProps, withState } from 'recompose';
import ReactMUIDatatableToolbarFilterPopover from './ReactMUIDatatableToolbarFilterPopover';

const StatefulPopover = toRenderProps(
  withState('anchorEl', 'updateAnchorEl', null)
);

const ReactMUIDatatableToolbarActionsFilterAction = props => {
  return (
    <StatefulPopover>
      {({ anchorEl, updateAnchorEl }) => (
        <React.Fragment>
          <Tooltip title="Filter list">
            <IconButton
              aria-label="Filter list"
              onClick={event => updateAnchorEl(event.currentTarget)}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <ReactMUIDatatableToolbarFilterPopover
            anchorEl={anchorEl}
            updateAnchorEl={updateAnchorEl}
            filterLists={props.filterLists}
            filterValues={props.filterValues}
            addFilter={props.addFilter}
            resetFilter={props.resetFilter}
            columns={props.columns}
          />
        </React.Fragment>
      )}
    </StatefulPopover>
  );
};

export default ReactMUIDatatableToolbarActionsFilterAction;
