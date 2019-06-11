import Grid from '@material-ui/core/Grid';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarSelect = props => {
  const {
    handleSelect,
    handleDelete,
    selectedData,
    toolbarSelectActions,
    computedData,
    localization,
  } = useContext(ReactMUIDatatableContext);

  return (
    <Toolbar className={`${props.classes.root} ${props.classes.highlight}`}>
      <Grid container justify={'space-between'}>
        <Grid item className={props.classes.selected}>
          <Typography color="inherit" variant="subtitle1">
            {localization.toolbarSelect.selectedData(selectedData.length)}
          </Typography>
        </Grid>
        <Grid item>
          {toolbarSelectActions({
            data: computedData,
            selectedData: selectedData,
            updateSelectedData: handleSelect,
            handleDelete: handleDelete,
          })}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default withStyles(theme => ({
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
}))(ReactMUIDatatableToolbarSelect);
