import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarTitle = () => {
  const { title } = useContext(ReactMUIDatatableContext);

  return (
    <React.Fragment>
      <Grid item style={{ alignSelf: 'center' }}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={true} />
    </React.Fragment>
  );
};

export default ReactMUIDatatableToolbarTitle;
