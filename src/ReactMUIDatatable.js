import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import React from 'react';
import defaultToolbarSelectActions from './defaultToolbarSelectActions';
import ReactMUIDatatableBody from './ReactMUIDatatableBody';
import ReactMUIDatatableFooter from './ReactMUIDatatableFooter';
import ReactMUIDatatableHeader from './ReactMUIDatatableHeader';
import ReactMUIDatatableProvider, {
  ReactMUIDatatableConsumer,
} from './ReactMUIDatatableProvider';
import ReactMUIDatatableToolbar from './ReactMUIDatatableToolbar';
import ReactMUIDatatableToolbarFilterValues from './ReactMUIDatatableToolbarFilterValues';
import ReactMUIDatatableToolbarSelect from './ReactMUIDatatableToolbarSelect';

const ReactMUIDatatable = props => {
  return (
    <ReactMUIDatatableProvider {...props}>
      <ReactMUIDatatableConsumer>
        {({ selectedRows }) => (
          <Paper>
            {selectedRows.length ? (
              <ReactMUIDatatableToolbarSelect />
            ) : (
              <ReactMUIDatatableToolbar />
            )}
            <ReactMUIDatatableToolbarFilterValues />
            <Table>
              <ReactMUIDatatableHeader />
              <ReactMUIDatatableBody />
              <ReactMUIDatatableFooter />
            </Table>
          </Paper>
        )}
      </ReactMUIDatatableConsumer>
    </ReactMUIDatatableProvider>
  );
};

ReactMUIDatatable.propTypes = {
  /** Title of your table */
  title: PropTypes.string.isRequired,
  /** Options for each column */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** Path to value in data object. For nested object you can use dot name, like `path.to` */
      name: PropTypes.string.isRequired,
      /** Displayed name of column */
      label: PropTypes.string.isRequired,
      /** Included / excluded column in search results. Default to `true` */
      searchable: PropTypes.bool,
      /** Included / excluded column to / from filter list. Default to `true` */
      filterable: PropTypes.bool,
      /** Enable / disable column sort. Default to `true` */
      sortable: PropTypes.bool,
      /** Renderer for cell. Function must return string or React Component. Signature `({value: string, row: Object}) => string | React.Component` */
      customCell: PropTypes.func,
    })
  ).isRequired,
  /** Dataset for datatable */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Enable selections */
  selectable: PropTypes.bool,
  /** Enable filters in toolbar */
  filterable: PropTypes.bool,
  /** Enable search bar in toolbar */
  searchable: PropTypes.bool,
  /** Function that returns a string or React component. Used as display actions in Toolbar selection.
   * Signature `({data: Object, selectedRows: Number[], updateSelectedRows: (selectedRows: Number[]), handleDelete: (selectedRows: Number[]) => void})` */
  toolbarSelectActions: PropTypes.func,
  /** Localization */
  localization: PropTypes.shape({
    toolbar: PropTypes.shape({
      /** Label of search button */
      searchAction: PropTypes.string,
      /** Label of filter button */
      filterAction: PropTypes.string,
      /** Label of search close button */
      closeSearch: PropTypes.string,
    }),
    filterLists: PropTypes.shape({
      /** Title of filter popup */
      title: PropTypes.string,
      /** Label for ALL option of filter list */
      allOption: PropTypes.string,
      /** Label for reset button of filters */
      reset: PropTypes.string,
    }),
    toolbarSelect: PropTypes.shape({
      /** Function that returns label for selected rows. Signature `(count: number) => string` */
      selectedRows: PropTypes.func,
    }),
    pagination: PropTypes.shape({
      /** Label for rows per page option in pagination section */
      rowsPerPage: PropTypes.string,
      /** Function that returns label of displayed rows in pagination section. Signature `({ from: number, to: number, count: number }) => string` */
      displayedRows: PropTypes.func,
    }),
  }),
};

ReactMUIDatatable.defaultProps = {
  title: '',
  data: [],
  columns: [],
  selectable: false,
  filterable: false,
  searchable: false,
  toolbarSelectActions: defaultToolbarSelectActions,
  localization: {
    toolbar: {
      searchAction: 'Search',
      filterAction: 'Filters',
      closeSearch: 'Close search',
    },
    filterLists: {
      title: 'Filter',
      allOption: 'All',
      reset: 'Reset',
    },
    toolbarSelect: {
      selectedRows: count => `${count} row(s) selected`,
    },
    pagination: {
      rowsPerPage: 'Rows per page',
      displayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
    },
  },
};

export default ReactMUIDatatable;
