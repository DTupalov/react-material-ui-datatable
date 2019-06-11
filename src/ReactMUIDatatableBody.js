import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import get from 'lodash.get';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactDatatableBody = props => {
  const {
    displayData,
    columns,
    customCell,
    selectable,
    toggleSelectRow,
    selectedData,
    rowActions,
  } = useContext(ReactMUIDatatableContext);

  return (
    <TableBody>
      {displayData.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedData.includes(row)}
                onChange={() => toggleSelectRow(row)}
              />
            </TableCell>
          )}
          {columns.map((column, cellIndex) => (
            <TableCell key={cellIndex}>
              {customCell
                ? customCell({
                    value: get(displayData[rowIndex], column.name),
                    column,
                    row,
                  })
                : get(displayData[rowIndex], column.name)}
            </TableCell>
          ))}
          {Boolean(rowActions) && (
            <TableCell>{rowActions({ row, rowIndex })}</TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ReactDatatableBody;
