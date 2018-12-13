import { TableSortLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { compose, defaultProps, withProps, withStateHandlers } from 'recompose';
import ReactMUIDatatableToolbar from './ReactMUIDatatableToolbar';
import ReactMUIDatatableToolbarFilterValues from './ReactMUIDatatableToolbarFilterValues';
import {
  convertColumnsToFilterValues,
  convertDataToFilterLists,
  filter,
  pipe,
  search,
  sort,
} from './utils';

const ReactMUIDatatable = props => {
  return (
    <Paper>
      <ReactMUIDatatableToolbar
        title={props.title}
        search={props.search}
        handleSearchValue={props.handleSearchValue}
        toggleSearchBar={props.toggleSearchBar}
        filterLists={props.filterLists}
        filterValues={props.filterValues}
        addFilter={props.addFilter}
        resetFilter={props.resetFilter}
        columns={props.columns}
      />
      <ReactMUIDatatableToolbarFilterValues
        filterValues={props.filterValues}
        removeFilter={props.removeFilter}
      />
      <Table>
        <TableHead>
          <TableRow>
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
      </Table>
    </Paper>
  );
};

export default compose(
  defaultProps({
    data: [],
    columns: [],
  }),
  withStateHandlers(
    props => ({
      data: props.data,
      search: {
        showSearchBar: false,
        value: '',
      },
      sort: { column: null, direction: 'ASC' },
      filterLists: convertDataToFilterLists({
        data: props.data,
        columns: props.columns,
      }),
      filterValues: convertColumnsToFilterValues({ columns: props.columns }),
    }),
    {
      toggleSearchBar: state => () => ({
        search: {
          showSearchBar: !state.search.showSearchBar,
          value: '',
        },
      }),
      handleSearchValue: state => e => ({
        search: {
          showSearchBar: state.search.showSearchBar,
          value: e.target.value,
        },
      }),
      handleSort: state => ({ column, direction = 'ASC' }) => ({
        sort: { column, direction },
      }),
      addFilter: state => ({ column, value }) => ({
        filterValues: {
          ...state.filterValues,
          [column]: value,
        },
      }),
      removeFilter: state => ({ column }) => ({
        filterValues: {
          ...state.filterValues,
          [column]: '',
        },
      }),
      resetFilter: (state, props) => () => ({
        filterValues: convertColumnsToFilterValues({ columns: props.columns }),
      }),
    }
  ),
  withProps(props => ({
    data: pipe(
      sort({ column: props.sort.column, direction: props.sort.direction }),
      search({ value: props.search.value }),
      filter({ values: props.filterValues })
    )(props.data),
  })),
  withProps(props => ({
    filterLists: convertDataToFilterLists({
      data: props.data,
      columns: props.columns,
    }),
  }))
)(ReactMUIDatatable);
