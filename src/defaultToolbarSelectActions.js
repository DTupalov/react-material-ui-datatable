import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const defaultToolbarSelectActions = ({ selectedRows, handleDelete }) => {
  return (
    <IconButton
      onClick={() => {
        handleDelete(selectedRows);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default defaultToolbarSelectActions;
