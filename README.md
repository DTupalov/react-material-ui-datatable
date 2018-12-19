# React MaterialUI Datatable

Material UI Datatable build in React way

:book: See __[Storybook](https://dtupalov.github.io/react-material-ui-datatable/)__ of this component

#### :warning: ATTENTION
This library is under the work. At the moment there is only basic functionality

## Install
       
    npm install react-material-ui-datatable --save

or 

    yarn add react-material-ui-datatable

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
  }
];

const data = [
  { firstName: "Kylynn", lastName: "Lathey", age: 19 },
  { firstName: "Cly", lastName: "Dukelow", age: 46 },
  { firstName: "Afton", lastName: "Chaffer", age: 34 },
  { firstName: "Deva", lastName: "Cowope", age: 22 }
];

<ReactMUIDatatable title={"Awesome list"} data={data} columns={columns} />;
```

For more details see __[Storybook](https://dtupalov.github.io/react-material-ui-datatable/)__ of this component


## API

#### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | "" | Title of your table |
| columns | Object[] | [] | Options for each column |
| data | Object[] | [] | Dataset | 
| selectable | boolean | false | Enable selections |

#### Column option

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | | Name associated to your data's object |
| label | string | | Display column title |
| customCell | Function | | Function that returns a string or React component. Used as display for body cell. `function (value: string, row: Object) => string \| React.Component`|