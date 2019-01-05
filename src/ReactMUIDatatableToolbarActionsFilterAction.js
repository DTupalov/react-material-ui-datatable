import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import { compose } from 'recompose';
import fromRenderProps from 'recompose/fromRenderProps';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarFilterPopover from './ReactMUIDatatableToolbarFilterPopover';

const PopoverModel = toRenderProps(
  withState('anchorEl', 'updateAnchorEl', null)
);

const ReactMUIDatatableToolbarActionsFilterAction = props => {
  return (
    <React.Fragment>
      <Tooltip title={props.labels.filterAction}>
        <IconButton
          aria-label={props.labels.filterAction}
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

export default compose(
  fromRenderProps(ReactMUIDatatableConsumer, ({ ...datatableProps }) => ({
    labels: datatableProps.localization.toolbar,
  })),
  fromRenderProps(PopoverModel, ({ ...popoverProps }) => ({
    ...popoverProps,
  }))
)(ReactMUIDatatableToolbarActionsFilterAction);
