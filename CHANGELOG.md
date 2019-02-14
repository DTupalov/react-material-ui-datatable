# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0-alpha.1"></a>
# [2.0.0-alpha.1](https://github.com/DTupalov/react-material-ui-datatable/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2019-02-14)



<a name="2.0.0-alpha.0"></a>
# [2.0.0-alpha.0](https://github.com/DTupalov/react-material-ui-datatable/compare/v1.0.0...v2.0.0-alpha.0) (2019-02-13)


### Code Refactoring

* separate model from provider ([c838e76](https://github.com/DTupalov/react-material-ui-datatable/commit/c838e76))


### Features

* **ReactMUIDatatableModel:** add memoize for calculated data ([123a736](https://github.com/DTupalov/react-material-ui-datatable/commit/123a736)), closes [#3](https://github.com/DTupalov/react-material-ui-datatable/issues/3)
* add deletable rows ([64db79e](https://github.com/DTupalov/react-material-ui-datatable/commit/64db79e)), closes [#12](https://github.com/DTupalov/react-material-ui-datatable/issues/12)
* add generic options 'searchable' and 'filterable'  + default delete button + docs ([533a7b4](https://github.com/DTupalov/react-material-ui-datatable/commit/533a7b4)), closes [#14](https://github.com/DTupalov/react-material-ui-datatable/issues/14)
* add localization ([5d2a423](https://github.com/DTupalov/react-material-ui-datatable/commit/5d2a423)), closes [#13](https://github.com/DTupalov/react-material-ui-datatable/issues/13)
* add state managing for selected rows ([9a87150](https://github.com/DTupalov/react-material-ui-datatable/commit/9a87150))
* column name with dots ([3de724f](https://github.com/DTupalov/react-material-ui-datatable/commit/3de724f)), closes [#6](https://github.com/DTupalov/react-material-ui-datatable/issues/6)
* column's options ([a1a2733](https://github.com/DTupalov/react-material-ui-datatable/commit/a1a2733)), closes [#5](https://github.com/DTupalov/react-material-ui-datatable/issues/5)


### Tests

* cover withReactMUIDatatableModel with tests ([5a533d9](https://github.com/DTupalov/react-material-ui-datatable/commit/5a533d9)), closes [#8](https://github.com/DTupalov/react-material-ui-datatable/issues/8)

### Documentation

* add description for all props and update storybook


### BREAKING CHANGES

* 'search' prop now split to 'showSearchBar' and 'searchValue'.
* Computed data now set to 'computedData' prop instead of 'data' prop. So in components we should now use 'computedData'
* With tests make some changes like:
- typo in prop `displayData`
- change signature in `changePage`
- rename `handleSelectAll` to `toggleSelectAll`
- `addFilter`, `removeFilter`  receive now `columnName` instead `column`
- `handleSearchValue` receive now string value instead event object
* ReactMUIDatatableModel rename to withReactMUIDatatableModel

Separate model from provider for better testebility. Provider now have only datatable's props



<a name="1.0.0"></a>
# 1.0.0 (2018-12-19)


### Features

* add pagination ([aa7b38e](https://github.com/DTupalov/react-material-ui-datatable/commit/aa7b38e))
* add searching, filters, sorting ([3fed0e6](https://github.com/DTupalov/react-material-ui-datatable/commit/3fed0e6))
* add selectable rows ([1e58eef](https://github.com/DTupalov/react-material-ui-datatable/commit/1e58eef))
* Add storybook and initial config ([1b444fe](https://github.com/DTupalov/react-material-ui-datatable/commit/1b444fe))
* custom cell ([06bfb5e](https://github.com/DTupalov/react-material-ui-datatable/commit/06bfb5e))
