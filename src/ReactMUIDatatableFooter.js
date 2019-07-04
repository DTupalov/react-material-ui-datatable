import TablePagination from '@material-ui/core/TablePagination';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableFooter = props => {
  const {
    page,
    perPage,
    perPageOption,
    computedData,
    changePage,
    changePerPage,
    columns,
    selectable,
    localization,
    rowActions,
  } = useContext(ReactMUIDatatableContext);

  const extraColSpanLenght =
    Number(Boolean(selectable)) + Number(Boolean(rowActions));

  return (
    <TablePagination
      rowsPerPageOptions={perPageOption}
      colSpan={columns.length + extraColSpanLenght}
      count={computedData.length}
      rowsPerPage={perPage}
      page={page}
      onChangePage={(_, page) => changePage(page)}
      onChangeRowsPerPage={event => changePerPage(Number(event.target.value))}
      labelDisplayedRows={localization.pagination.displayedRows}
      labelRowsPerPage={localization.pagination.rowsPerPage}
      component={'div'}
    />
  );
};

export default ReactMUIDatatableFooter;
