import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableFooter = props => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={props.perPageOption}
          colSpan={props.columns.length + (props.selectable ? 1 : 0)}
          count={props.data.length}
          rowsPerPage={props.perPage}
          page={props.page}
          SelectProps={{
            native: true,
          }}
          onChangePage={props.changePage}
          onChangeRowsPerPage={props.changePerPage}
          ActionsComponent={TablePaginationActions}
          labelDisplayedRows={props.labels.displayedRows}
          labelRowsPerPage={props.labels.rowsPerPage}
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
    selectable: datatableProps.selectable,
    labels: datatableProps.localization.pagination,
  })
)(ReactMUIDatatableFooter);
