import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import get from 'lodash.get';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactDatatableBody = props => {
  return (
    <TableBody>
      {props.displayData.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {props.selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                checked={props.selectedData.includes(row)}
                onChange={() => props.toggleSelectRow(row)}
              />
            </TableCell>
          )}
          {props.columns.map((column, cellIndex) => (
            <TableCell key={cellIndex}>
              {column.customCell
                ? column.customCell({
                    value: get(props.displayData[rowIndex], column.name),
                    row,
                  })
                : get(props.displayData[rowIndex], column.name)}
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
    displayData: datatableProps.displayData,
    columns: datatableProps.columns,
    selectable: datatableProps.selectable,
    toggleSelectRow: datatableProps.toggleSelectRow,
    selectedData: datatableProps.selectedData,
  })
)(ReactDatatableBody);
