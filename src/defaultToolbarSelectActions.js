import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const defaultToolbarSelectActions = ({ selectedData, handleDelete }) => {
  return (
    <IconButton
      onClick={() => {
        handleDelete(selectedData);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default defaultToolbarSelectActions;
