import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableHeader = props => {
  const {
    columns,
    sort,
    handleSort,
    selectable,
    selectedData,
    computedData,
    toggleSelectAll,
    rowActions,
  } = useContext(ReactMUIDatatableContext);

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={
                selectedData.length !== 0 &&
                selectedData.length < computedData.length
              }
              checked={selectedData.length === computedData.length}
              onChange={toggleSelectAll}
            />
          </TableCell>
        )}
        {columns.map((column, index) => {
          const columnSortOptions =
            sort.find(
              columnSortOptions => columnSortOptions.columnName === column.name
            ) || {};

          return (
            <TableCell
              key={index}
              className={props.classes.head}
              onClick={event =>
                column.sortable &&
                handleSort({
                  columnName: column.name,
                  withMultiSorting: event.shiftKey,
                })
              }
            >
              {column.sortable &&
                column.name === columnSortOptions.columnName && (
                  <TableSortLabel
                    active={column.name === columnSortOptions.columnName}
                    direction={columnSortOptions.direction.toLowerCase()}
                  />
                )}
              {column.label}
            </TableCell>
          );
        })}
        {Boolean(rowActions) && <TableCell className={props.classes.head} />}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(() => ({
  head: {
    cursor: 'pointer',
  },
}))(ReactMUIDatatableHeader);
