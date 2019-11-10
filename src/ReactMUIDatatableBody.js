import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
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
    localization,
    customNoMatches,
  } = useContext(ReactMUIDatatableContext);

  const extraColSpanLenght =
    Number(Boolean(selectable)) + Number(Boolean(rowActions));

  return (
    <TableBody>
      {displayData.length > 0 ? (
        displayData.map((row, rowIndex) => (
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
        ))
      ) : (
        <TableCell
          colSpan={columns.length + extraColSpanLenght}
          className={props.classes.cellNoMatches}
        >
          {customNoMatches ? (
            customNoMatches(localization.body.noMatchesText)
          ) : (
            <Typography variant={'h6'} className={props.classes.textNoMatches}>
              {localization.body.noMatchesText}
            </Typography>
          )}
        </TableCell>
      )}
    </TableBody>
  );
};

export default withStyles(theme => ({
  cellNoMatches: {
    padding: theme.spacing.unit,
  },
  textNoMatches: {
    textAlign: 'center',
  },
}))(ReactDatatableBody);
