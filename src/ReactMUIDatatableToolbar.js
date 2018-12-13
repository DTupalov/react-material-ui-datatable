import { Grid, Toolbar } from '@material-ui/core';
import React from 'react';
import ReactMUIDatatableToolbarActions from './ReactMUIDatatableToolbarActions';
import ReactMUIDatatableToolbarSearchBar from './ReactMUIDatatableToolbarSearchBar';
import ReactMUIDatatableToolbarTitle from './ReactMUIDatatableToolbarTitle';

const ReactMUIDatatableToolbar = props => {
  return (
    <Toolbar>
      <Grid container>
        {props.search.showSearchBar ? (
          <ReactMUIDatatableToolbarSearchBar
            value={props.search.value}
            handleSearchValue={props.handleSearchValue}
            toggleSearchBar={props.toggleSearchBar}
          />
        ) : (
          <ReactMUIDatatableToolbarTitle title={props.title} />
        )}
        <ReactMUIDatatableToolbarActions
          toggleSearchBar={props.toggleSearchBar}
          filterLists={props.filterLists}
          filterValues={props.filterValues}
          addFilter={props.addFilter}
          resetFilter={props.resetFilter}
          columns={props.columns}
        />
      </Grid>
    </Toolbar>
  );
};

export default ReactMUIDatatableToolbar;
