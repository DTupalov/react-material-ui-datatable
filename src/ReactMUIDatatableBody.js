import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import get from 'lodash/get';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
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
                    value: get(props.diplayData[rowIndex], column.name),
                    row,
                  })
                : get(props.diplayData[rowIndex], column.name)}
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
