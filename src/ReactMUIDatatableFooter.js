import { TableFooter, TablePagination, TableRow } from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import React from 'react';
import { fromRenderProps } from 'recompose';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableFooter = props => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={props.perPageOption}
          colSpan={props.columns.length}
          count={props.data.length}
          rowsPerPage={props.perPage}
          page={props.page}
          SelectProps={{
            native: true,
          }}
          onChangePage={props.changePage}
          onChangeRowsPerPage={props.changePerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default fromRenderProps(
  ReactMUIDatatableConsumer,
  ({ ...datatableProps }) => ({
    page: datatableProps.page,
    perPage: datatableProps.perPage,
    perPageOption: datatableProps.perPageOption,
    data: datatableProps.data,
    changePage: datatableProps.changePage,
    changePerPage: datatableProps.changePerPage,
    columns: datatableProps.columns,
  })
)(ReactMUIDatatableFooter);
