import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableHeader = props => {
  return (
    <TableHead>
      <TableRow>
        {props.selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={
                props.selectedData.length !== 0 &&
                props.selectedData.length < props.computedData.length
              }
              checked={props.selectedData.length === props.computedData.length}
              onChange={props.toggleSelectAll}
            />
          </TableCell>
        )}
        {props.columns.map((column, index) => (
          <TableCell
            key={index}
            className={props.classes.head}
            onClick={() =>
              column.sortable &&
              props.handleSort({
                columnName: column.name,
                direction:
                  props.sort.columnName === column.name
                    ? props.sort.direction === 'ASC'
                      ? 'DESC'
                      : 'ASC'
                    : 'ASC',
              })
            }
          >
            {column.sortable && column.name === props.sort.columnName && (
              <TableSortLabel
                active={column.name === props.sort.columnName}
                direction={props.sort.direction.toLowerCase()}
              />
            )}
            {column.label}
          </TableCell>
        ))}
        {Boolean(props.rowActions) && (
          <TableCell className={props.classes.head} />
        )}
      </TableRow>
    </TableHead>
  );
};

export default compose(
  fromRenderProps(ReactMUIDatatableConsumer, ({ ...datatableProps }) => ({
    columns: datatableProps.columns,
    sort: datatableProps.sort,
    handleSort: datatableProps.handleSort,
    selectable: datatableProps.selectable,
    selectedData: datatableProps.selectedData,
    computedData: datatableProps.computedData,
    toggleSelectAll: datatableProps.toggleSelectAll,
    rowActions: datatableProps.rowActions,
  })),
  withStyles(() => ({
    head: {
      cursor: 'pointer',
    },
  }))
)(ReactMUIDatatableHeader);
