
## API
 

 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**columns** | `Array[]<Shape>` | `[]` | :x: | Options for each column
**columns[].customCell** | `Function` |  | :x: | Renderer for cell. Function must return string or React Component. Signature `({value: string, row: Object}) => string | React.Component`
**columns[].filterable** | `Boolean` |  | :x: | Included / excluded column to / from filter list. Default to `true`
**columns[].label** | `String` |  | :white_check_mark: | Displayed name of column
**columns[].name** | `String` |  | :white_check_mark: | Path to value in data object. For nested object you can use dot name, like `path.to`
**columns[].searchable** | `Boolean` |  | :x: | Included / excluded column in search results. Default to `true`
**columns[].sortable** | `Boolean` |  | :x: | Enable / disable column sort. Default to `true`
**data** | `Array[]<Object>` | `[]` | :x: | Dataset for datatable
**filterable** | `Boolean` | `false` | :x: | Enable filters in toolbar
**localization** | `Shape` | `{   toolbar: {     searchAction: 'Search',     filterAction: 'Filters',     closeSearch: 'Close search',   },   filterLists: {     title: 'Filter',     allOption: 'All',     reset: 'Reset',   },   toolbarSelect: {     selectedRows: count => `${count} row(s) selected`,   },   pagination: {     rowsPerPage: 'Rows per page',     displayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,   }, }` | :x: | Localization
**localization.filterLists** | `Shape` |  | :x: | 
**localization.filterLists.allOption** | `String` |  | :x: | Label for ALL option of filter list
**localization.filterLists.reset** | `String` |  | :x: | Label for reset button of filters
**localization.filterLists.title** | `String` |  | :x: | Title of filter popup
**localization.pagination** | `Shape` |  | :x: | 
**localization.pagination.displayedRows** | `Function` |  | :x: | Function that returns label of displayed rows in pagination section. Signature `({ from: number, to: number, count: number }) => string`
**localization.pagination.rowsPerPage** | `String` |  | :x: | Label for rows per page option in pagination section
**localization.toolbar** | `Shape` |  | :x: | 
**localization.toolbar.closeSearch** | `String` |  | :x: | Label of search close button
**localization.toolbar.filterAction** | `String` |  | :x: | Label of filter button
**localization.toolbar.searchAction** | `String` |  | :x: | Label of search button
**localization.toolbarSelect** | `Shape` |  | :x: | 
**localization.toolbarSelect.selectedRows** | `Function` |  | :x: | Function that returns label for selected rows. Signature `(count: number) => string`
**searchable** | `Boolean` | `false` | :x: | Enable search bar in toolbar
**selectable** | `Boolean` | `false` | :x: | Enable selections
**title** | `String` | `''` | :x: | Title of your table
**toolbarSelectActions** | `Function` | `defaultToolbarSelectActions` | :x: | Function that returns a string or React component. Used as display actions in Toolbar selection. Signature `({data: Object, selectedRows: Number[], updateSelectedRows: (selectedRows: Number[]), handleDelete: (selectedRows: Number[]) => void})`
 
 
 
