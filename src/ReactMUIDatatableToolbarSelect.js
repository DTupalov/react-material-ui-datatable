import Grid from '@material-ui/core/Grid';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
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
            {props.selectedRows.length} row(s) selected
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
      borderRadius: `${theme.shape.borderRadius}px ${
        theme.shape.borderRadius
      }px 0 0`,
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
