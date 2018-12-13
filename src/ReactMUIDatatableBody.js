import { TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactDatatableBody = props => {
  return (
    <TableBody>
      {props.data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {props.columns.map((column, cellIndex) => (
            <TableCell key={cellIndex}>
              {props.data[rowIndex][column.name]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    data: datatableProps.data,
    columns: datatableProps.columns,
  })
)(ReactDatatableBody);
