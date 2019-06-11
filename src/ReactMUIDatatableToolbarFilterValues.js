import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarFilterValues = props => {
  const { filterValues, removeFilter } = useContext(ReactMUIDatatableContext);

  return (
    <Grid container className={props.classes.root} spacing={8}>
      {Object.keys(filterValues).map(
        (columnName, index) =>
          filterValues[columnName] && (
            <Grid item key={index}>
              <Chip
                label={filterValues[columnName]}
                onDelete={() => removeFilter({ columnName })}
              />
            </Grid>
          )
      )}
    </Grid>
  );
};

export default withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },
}))(ReactMUIDatatableToolbarFilterValues);
