import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const NoMatches = props => {
  return (
    <div className={props.classes.noMatchesContainer}>
      <Typography variant={'body1'}>
        No matches for "{props.inputValue}"
      </Typography>
    </div>
  );
};

NoMatches.propTypes = {
  classes: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default withStyles(theme => ({
  noMatchesContainer: {
    padding: 15,
  },
}))(NoMatches);
