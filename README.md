# React MaterialUI Datatable
[![Build Status](https://travis-ci.org/DTupalov/react-material-ui-datatable.svg?branch=master)](https://travis-ci.org/DTupalov/react-material-ui-datatable) [![npm version](https://badge.fury.io/js/react-material-ui-datatable.svg)](https://badge.fury.io/js/react-material-ui-datatable) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

__Fully uncontrolled__ and __client-side datatable__ based on __material design__. Designed with React philosophy. Just set your data and receive common manipulations on it: filtering, sorting, pagination and etc.

:book: See __[Storybook](https://dtupalov.github.io/react-material-ui-datatable/)__ of this component

## :warning: ATTENTION! WIP!
This library is under the work. It means, that we can do Breaking Changes during one major alpha version. Please, check the [CHANGELOG](./CHANGELOG.md) before update your current version.

## Install
       
    npm install react-material-ui-datatable@2.0.0-alpha.29 --save-exact

or 

    yarn add react-material-ui-datatable@2.0.0-alpha.29 --exact

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


## `ReactMUIDatatable`'s API

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | "" | Title of your table |
| columns | Object[] | [] | Options for each column. Detailed description see [here](#column-option) |
| customCell | Function | | Function that returns a string or React component. Used as display for body cell. `({value: string, column: Object, row: Object}) => string \| React.Component`|
| data | Object[] | [] | Your dataset, that you want to display in the table| 
| page | number | 0 | Current page. Start with 0 |
| perPage | number | 5 | Quantity of displaying items per page. | 
| perPageOption | number[] | [5, 10, 15] | Per page option. Displayed on the paging panel |
| selectedData | Object[] | [] | Array of refs of selected data items. For example, `[data[0], data[1]]` will select first and second row. |
| selectable | boolean | true | Enable selections |
| filterable | boolean | true | Enable filters in toolbar panel |
| searchable | boolean | true | Enable search bar in toolbar panel |
| toolbarSelectActions | Function | [defaultToolbarSelectActions](./src/defaultToolbarSelectActions.js) | Function that returns a string or React component. Used as display actions in Toolbar selection. More details you can read [here](#toolbarSelectActions). You can see example in storybook at section [Props -> toolbarSelectActions](https://dtupalov.github.io/react-material-ui-datatable/?selectedKind=ReactMUIDatatable%2FProps&selectedStory=toolbarSelectActions&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fstories%2Fstories-panel) |
| toolbarActions | Function | | Function that returns a string or React component. Used to display custom actions in toolbar panel. Signature `({data: Object, computedData: Object, displayData: Object}) => string \| React.Component` | 
| rowActions | Function | | Function that returns a string or React component. Used to display custom actions in each row. Signature `({row: Object, rowIndex: number}) => string \| React.Component`| 
| showSearchBar | boolean | false | Open or close search bar in toolbar panel | 
| searchValue | string | "" | The value by which the search is performed | 
| sort | Array | [{ columnName: '', direction: "ASC" }] | Set sorting by column name and set direction for sorting. Can be set sort with multiple columns. Direction may be: `ASC` and `DESC` |
| filterValues | Object | {} | Set filters for columns |
| onStateChanged | Function | | Handler for state changing. Receives event-like object. Signature ```(event: {name: string, value: string, state: Object}) => any```, where `name` - changed state, `value` - new value, `state` - current state of datatable component. Notice, that `state` contains only changeable values. It useful to restore state after reloading page, for example|
| localization | Object | [default localization](#default-value)  | More details you can read [here](#localization) |

#### `toolbarSelectActions`

```js
(data: Object, selectedData: Object[], updateSelectedData: Function, handleDelete: Function) => string | React.Component
```

| Argument | Type | Description |
| - | - | - |
| data | Object | Current dataset in the table (with applying filters and sort) | 
| selectedData | Object[] | Current selected data (their refs) | 
| updateSelectedData | ( Object[] ) => any | Function, that apply new selected data | 
| handleDelete | ( Object[] ) => any | Function, that delete selected data. For example, you can call it, when you got successful response from your api | 

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
    noMatchesText: 'No matches',
  },
  toolbarSelect: {
    selectedData: count => `${count} row(s) selected`,
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
| noMatchesText | string | 'No matches' | Text if no matches in autocomplete | 

##### toolbarSelect

| Name | Type | Default | Description
| - | - | - | - |
| selectedData | Function | count => \`${count} row(s) selected\` | Function that receives `count` of selected rows and returns string |

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

## `ReactMUIDatatableProvider` with `ReactMUIDatatableRoot` component

If you have separate screens for editing, creating, detailing items or you have your own screens, and you want to save state of your datatable between pages, you can lift state of the table higher with `ReactMUIDatatableProvider`. It receives all props from description [ReactMUIDatatable's API](#reactmuidatatables-api). To draw table just use `ReactMUIDatableRoot` component. It's already connect to Provider and will receive all props, that was passed into `ReactMUIDatatableProvider`. See example below.

### Example
Soon here will be link to example. Sorry :(


# Alternative
- [mui-datatables](https://github.com/gregnb/mui-datatables) - multifunctional table based on material ui components

# Thanks

- https://mockaroo.com/ - all stubs was generated by this service