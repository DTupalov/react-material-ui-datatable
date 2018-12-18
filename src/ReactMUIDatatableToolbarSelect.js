import { Grid, Toolbar, Typography, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import React from 'react';
import { compose, fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

/**
 *  `toolbarSelectActions` - pass separate `data` and `selectedRows`
 *  to remove unnecessary filtering `data` array with rerenders
 */
const ReactMUIDatatableToolbarSelect = props => {
  return (
    <Toolbar className={`${props.classes.root} ${props.classes.highlight}`}>
      <Grid container justify={'space-between'}>
        <Grid item className={props.classes.selected}>
          <Typography color="inherit" variant="subtitle1">
            {props.selectedRows.length} эл.
          </Typography>
        </Grid>
        <Grid item>
          {props.toolbarSelectActions({
            data: props.data,
            selectedRows: props.selectedRows,
          })}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default compose(
  fromRenderProps(ReactMUIDatatableConsumer, ({ ...datatableProps }) => ({
    selectedRows: datatableProps.selectedRows,
    toolbarSelectActions: datatableProps.toolbarSelectActions,
    data: datatableProps.data,
  })),
  withStyles(theme => ({
    root: {
      borderRadiusTopLeft: theme.shape.borderRadius,
      borderRadiusTopRight: theme.shape.borderRadius,
    },
    highlight: {
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      color: theme.palette.secondary.main,
    },
    selected: {
      alignSelf: 'center',
    },
  }))
)(ReactMUIDatatableToolbarSelect);
