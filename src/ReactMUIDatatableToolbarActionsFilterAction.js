import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import ReactMUIDatatableToolbarFilterPopover from './ReactMUIDatatableToolbarFilterPopover';

const PopoverModel = toRenderProps(
  withState('anchorEl', 'updateAnchorEl', null)
);

const ReactMUIDatatableToolbarActionsFilterAction = props => {
  return (
    <React.Fragment>
      <Tooltip title="Filter list">
        <IconButton
          aria-label="Filter list"
          onClick={event => props.updateAnchorEl(event.currentTarget)}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <ReactMUIDatatableToolbarFilterPopover
        updateAnchorEl={props.updateAnchorEl}
        anchorEl={props.anchorEl}
      />
    </React.Fragment>
  );
};

export default fromRenderProps(PopoverModel, ({ ...popoverProps }) => ({
  ...popoverProps,
}))(ReactMUIDatatableToolbarActionsFilterAction);
