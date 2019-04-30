import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarActionsFilterAction from './ReactMUIDatatableToolbarActionsFilterAction';

const ReactMUIDatatableToolbarActions = props => {
  const { data, computedData, displayData } = props;
  return (
    <Grid item>
      {props.searchable && (
        <Tooltip title={props.labels.searchAction}>
          <IconButton
            aria-label={props.labels.searchAction}
            onClick={props.toggleSearchBar}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
      {props.filterable && <ReactMUIDatatableToolbarActionsFilterAction />}
      {Boolean(props.toolbarActions) &&
        props.toolbarActions({ data, computedData, displayData })}
    </Grid>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    toggleSearchBar: datatableProps.toggleSearchBar,
    labels: datatableProps.localization.toolbar,
    searchable: datatableProps.searchable,
    filterable: datatableProps.filterable,
    toolbarActions: datatableProps.toolbarActions,
    data: datatableProps.data,
    computedData: datatableProps.computedData,
    displayData: datatableProps.displayData,
  })
)(ReactMUIDatatableToolbarActions);
