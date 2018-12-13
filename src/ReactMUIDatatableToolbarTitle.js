import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarTitle = props => {
  return (
    <React.Fragment>
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item xs={true} />
    </React.Fragment>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    title: datatableProps.title,
  })
)(ReactMUIDatatableToolbarTitle);
