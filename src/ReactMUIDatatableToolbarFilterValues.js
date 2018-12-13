import { Chip, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { compose, fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarFilterValues = props => {
  return (
    <Grid container className={props.classes.root} spacing={8}>
      {Object.keys(props.filterValues).map(
        (column, index) =>
          props.filterValues[column] && (
            <Grid item key={index}>
              <Chip
                label={props.filterValues[column]}
                onDelete={() => props.removeFilter({ column })}
              />
            </Grid>
          )
      )}
    </Grid>
  );
};

export default compose(
  fromRenderProps(ReactMUIDatatableConsumer, ({ ...datatableProps }) => ({
    filterValues: datatableProps.filterValues,
    removeFilter: datatableProps.removeFilter,
  })),
  withStyles(theme => ({
    root: { paddingLeft: theme.spacing.unit * 2 },
  }))
)(ReactMUIDatatableToolbarFilterValues);
