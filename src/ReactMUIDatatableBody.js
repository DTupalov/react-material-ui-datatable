import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';
import { metaSymbol } from './utils';

const ReactDatatableBody = props => {
  return (
    <TableBody>
      {props.diplayData.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {props.selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                checked={props.selectedRows.includes(row[metaSymbol].rawIndex)}
                onChange={() => props.toggleSelectRow(row[metaSymbol].rawIndex)}
              />
            </TableCell>
          )}
          {props.columns.map((column, cellIndex) => (
            <TableCell key={cellIndex}>
              {column.customCell
                ? column.customCell({
                    value: props.diplayData[rowIndex][column.name],
                    row,
                  })
                : props.diplayData[rowIndex][column.name]}
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
    diplayData: datatableProps.diplayData,
    columns: datatableProps.columns,
    selectable: datatableProps.selectable,
    toggleSelectRow: datatableProps.toggleSelectRow,
    selectedRows: datatableProps.selectedRows,
  })
)(ReactDatatableBody);
