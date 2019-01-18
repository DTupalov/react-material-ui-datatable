import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarSearchBar = props => {
  return (
    <React.Fragment>
      <Grid item xs={true}>
        <TextField
          value={props.value}
          onChange={event => props.handleSearchValue(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Tooltip title={props.labels.closeSearch}>
          <IconButton
            aria-label={props.labels.closeSearch}
            onClick={props.toggleSearchBar}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    value: datatableProps.search.value,
    handleSearchValue: datatableProps.handleSearchValue,
    toggleSearchBar: datatableProps.toggleSearchBar,
    labels: datatableProps.localization.toolbar,
  })
)(ReactMUIDatatableToolbarSearchBar);
