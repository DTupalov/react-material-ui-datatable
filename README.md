# React MaterialUI Datatable
[![Build Status](https://travis-ci.org/DTupalov/react-material-ui-datatable.svg?branch=master)](https://travis-ci.org/DTupalov/react-material-ui-datatable) [![npm version](https://badge.fury.io/js/react-material-ui-datatable.svg)](https://badge.fury.io/js/react-material-ui-datatable) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

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
  },
  {
    name: "car.make",
    label: "Car make",
  }
];

const data = [
  { firstName: "Kylynn", lastName: "Lathey", age: 19, car: { make: 'Maserati' } },
  { firstName: "Cly", lastName: "Dukelow", age: 46, car: { make: 'Hyundai' } },
  { firstName: "Afton", lastName: "Chaffer", age: 34, car: { make: 'Porsche' } },
  { firstName: "Deva", lastName: "Cowope", age: 22, car: { make: 'Toyota' } }
];

<ReactMUIDatatable title={"Awesome list"} data={data} columns={columns} />;
```

For more details see __[Storybook](https://dtupalov.github.io/react-material-ui-datatable/)__ of this component

## API docs

[Read them here](./API.md)

## CHANGELOGS

[Read them here](./CHANGELOG.md)