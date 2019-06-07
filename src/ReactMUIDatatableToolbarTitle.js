import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarTitle = props => {
  return (
    <React.Fragment>
      <Grid item style={{ alignSelf: 'center' }}>
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
