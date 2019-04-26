import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableFooter = props => {
  const extraColSpanLenght =
    Number(Boolean(props.selectable)) + Number(Boolean(props.rowActions));

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={props.perPageOption}
          colSpan={props.columns.length + extraColSpanLenght}
          count={props.computedData.length}
          rowsPerPage={props.perPage}
          page={props.page}
          onChangePage={(_, page) => props.changePage(page)}
          onChangeRowsPerPage={event =>
            props.changePerPage(Number(event.target.value))
          }
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
    computedData: datatableProps.computedData,
    changePage: datatableProps.changePage,
    changePerPage: datatableProps.changePerPage,
    columns: datatableProps.columns,
    selectable: datatableProps.selectable,
    labels: datatableProps.localization.pagination,
    rowActions: datatableProps.rowActions,
  })
)(ReactMUIDatatableFooter);
