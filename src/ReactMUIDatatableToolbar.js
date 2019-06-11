import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbarActions from './ReactMUIDatatableToolbarActions';
import ReactMUIDatatableToolbarSearchBar from './ReactMUIDatatableToolbarSearchBar';
import ReactMUIDatatableToolbarTitle from './ReactMUIDatatableToolbarTitle';

const ReactMUIDatatableToolbar = props => {
  const { showSearchBar } = useContext(ReactMUIDatatableContext);

  return (
    <Toolbar>
      <Grid container>
        {showSearchBar ? (
          <ReactMUIDatatableToolbarSearchBar />
        ) : (
          <ReactMUIDatatableToolbarTitle />
        )}
        <ReactMUIDatatableToolbarActions />
      </Grid>
    </Toolbar>
  );
};

export default ReactMUIDatatableToolbar;
