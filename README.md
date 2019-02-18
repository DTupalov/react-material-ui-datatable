# React MaterialUI Datatable
[![Build Status](https://travis-ci.org/DTupalov/react-material-ui-datatable.svg?branch=master)](https://travis-ci.org/DTupalov/react-material-ui-datatable) [![npm version](https://badge.fury.io/js/react-material-ui-datatable.svg)](https://badge.fury.io/js/react-material-ui-datatable) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Material UI Datatable build in React way

:book: See __[Storybook](https://dtupalov.github.io/react-material-ui-datatable/)__ of this component

#### :warning: ATTENTION! WIP!
This library is under the work. At the moment there is only basic functionality

## Install
       
    npm install react-material-ui-datatable@^2.0.0-alpha --save

or 

    yarn add react-material-ui-datatable@^2.0.0-alpha

## Demo

[![Edit 9lz52zlylr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9lz52zlylr?module=%2Fsrc%2FDemo.js)

## Usage

```js
import { ReactMUIDatatable } from "react-material-ui-datatable";

const columns = [
  {
    name: "firstName",
    label: "First Name"
  },
  {
    name: "lastName",
    label: "Last Name"
  },
  {
    name: "age",
    label: "Age"
  },
  {
    name: "car.make",
    label: "Car make"
  }
];

const data = [
  { firstName: "Kylynn", lastName: "Lathey", age: 19, car: { make: "BWM" } },
  { firstName: "Cly", lastName: "Dukelow", age: 46,  car: { make: "Mitsubishi" } },
  { firstName: "Afton", lastName: "Chaffer", age: 34,  car: { make: "Audi" } },
  { firstName: "Deva", lastName: "Cowope", age: 22 car: { make: "Reno" } }
];

<ReactMUIDatatable title={"Awesome list"} data={data} columns={columns} />;
```

For more details see __[Storybook](https://dtupalov.github.io/react-material-ui-datatable/)__ of this component


## API

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | "" | Title of your table |
| columns | Object[] | [] | Options for each column. Detailed description see [here](#column-option) |
| data | Object[] | [] | Your dataset, that you want to display in the table| 
| page | number | 0 | Current page. Start with 0 |
| onPageChanged | Function | | Function trigger when `page` was changed. Signature ```(page: number) => any``` |
| perPage | number | 5 | Quantity of displaying items per page. | 
| perPageOption | number[] | [5, 10, 15] | Per page option. Displayed on the paging panel |
| selectedRows | number[] | [] | Indexes of selected rows |
| selectable | boolean | true | Enable selections |
| filterable | boolean | true | Enable filters in toolbar panel |
| searchable | boolean | true | Enable search bar in toolbar panel |
| toolbarSelectActions | Function | [defaultToolbarSelectActions](./src/defaultToolbarSelectActions.js) | Function that returns a string or React component. Used as display actions in Toolbar selection. More details you can read [here](#toolbarSelectActions). You can see example in storybook at section [Props -> toolbarSelectActions](https://dtupalov.github.io/react-material-ui-datatable/?selectedKind=ReactMUIDatatable%2FProps&selectedStory=toolbarSelectActions&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fstories%2Fstories-panel) |
| showSearchBar | boolean | false | Open or close search bar in toolbar panel | 
| onShowSearchBarChanged | Function | | Function trigger when `showSearchBar` was changed. Signature ```(showSearchBar: boolean) => any``` | 
| searchValue | string | "" | The value by which the search is performed | 
| onSearchValueChanged | Function | | Function trigger when `searchValue` was changed. Signature ```(searchValue: string) => any``` | 
| sort | Object | { [columnName]: null, direction: "ASC" } | Set sorting by column name and set direction for sorting. Direction may be: `ASC` and `DESC` |
| onSortChanged | Function | | Function trigger when `sort` was changed. Signature ```({ columnName: string, direction: 'ASC' | 'DESC' }) => any``` |
| filterValues | Object | {} | Set filters for columns |
| onFilterValuesChanged | Func | | Function trigger when `filterValues` was changed. Signature ```(filterValues: Object) => any``` |
| localization | Object | [default value](#default-value)  | More details you can read [here](#localization)

#### `toolbarSelectActions`

```js
(data: Object, selectedRows: number[], updateSelectedRows: Function, handleDelete: Function) => string | React.Component
```

| Argument | Type | Description |
| - | - | - |
| data | Object | Current dataset in the table (with applying filters and sort) | 
| selectedRows | number[] | Current selected rows (their indexes). To get selected items from data, you need to import `metaSymbol` from library, and filter data like `data.filter(row => selectedRows.includes(row[metaSymbol].rawIndex))` | 
| updateSelectedRows | ( number[] ) => void | Function, that apply new selected rows. | 
| handleDelete | ( number[] ) => void | Function, that delete selected rows. For example, you can call it, when you got successful response from your api | 

#### `localization`

##### Default value

```js
{
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
}
```

##### toolbar

| Name | Type | Default | Description
| - | - | - | - |
| searchAction | string | 'Search' | Label for search button | 
| filterAction | string | 'Filters' | Label for filters button | 
| closeSearch | string | 'Close search' | Label for close button of search bar | 

##### filterLists

| Name | Type | Default | Description
| - | - | - | - |
| title | string | 'Filter' | Label for title of filter menu | 
| allOption | string | 'All' | Label for option 'All' of select controls | 
| reset | string | 'Reset' | Label for reset button of filters | 

##### toolbarSelect

| Name | Type | Default | Description
| - | - | - | - |
| selectedRows | Function | count => \`${count} row(s) selected\` | Function that receives `count` of selected rows and returns string |

##### pagination

| Name | Type | Default | Description
| - | - | - | - |
| rowsPerPage | string | 'Rows per page' | Label for select rows per page | 
| displayedRows | Function | ({ from, to, count }) => \`${from}-${to} of ${count}\` | Function that receives `from`, `to` and `count` of data elements and returns string |

### Column option

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | | Name associated to your data"s object |
| label | string | | Display column title |
| sortable | boolean | true | Enable / disable sorting by column |
| filterable | boolean | true | Enable / disable filtering by column. `false` will exclude column from filter panel|
| searchable | boolean | true | Including / excluding column from search results |
| customCell | Function | | Function that returns a string or React component. Used as display for body cell. `function (value: string, row: Object) => string \| React.Component`|

# Thanks

- https://mockaroo.com/ - all stubs was generated by this service