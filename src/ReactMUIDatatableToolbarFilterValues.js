import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
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
