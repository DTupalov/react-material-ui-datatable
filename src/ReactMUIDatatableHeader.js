import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React from 'react';
import { fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableHeader = props => {
  return (
    <TableHead>
      <TableRow>
        {props.selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={
                props.selectedRows.length !== 0 &&
                props.selectedRows.length < props.data.length
              }
              checked={props.selectedRows.length === props.data.length}
              onChange={props.handleSelectAll}
            />
          </TableCell>
        )}
        {props.columns.map((column, index) => (
          <TableCell
            key={index}
            onClick={() =>
              props.handleSort({
                column: column.name,
                direction:
                  props.sort.column === column.name
                    ? props.sort.direction === 'ASC'
                      ? 'DESC'
                      : 'ASC'
                    : 'ASC',
              })
            }
          >
            <TableSortLabel
              active={column.name === props.sort.column}
              hideSortIcon={column.name !== props.sort.column}
              direction={props.sort.direction.toLowerCase()}
            />
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    columns: datatableProps.columns,
    sort: datatableProps.sort,
    handleSort: datatableProps.handleSort,
    selectable: datatableProps.selectable,
    selectedRows: datatableProps.selectedRows,
    data: datatableProps.data,
    handleSelectAll: datatableProps.handleSelectAll,
  })
)(ReactMUIDatatableHeader);
