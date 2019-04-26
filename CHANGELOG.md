# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0-alpha.12"></a>
# [2.0.0-alpha.12](https://github.com/DTupalov/react-material-ui-datatable/compare/v2.0.0-alpha.8...v2.0.0-alpha.12) (2019-04-26)


### Code Refactoring

* move to state manager effector ([647b358](https://github.com/DTupalov/react-material-ui-datatable/commit/647b358))


### BREAKING CHANGES

* `customCell` moved from `columns` to generic props and change function signature. See documentation at README.md



<a name="2.0.0-alpha.8"></a>
# [2.0.0-alpha.8](https://github.com/DTupalov/react-material-ui-datatable/compare/v2.0.0-alpha.6...v2.0.0-alpha.8) (2019-03-31)


### Code Refactoring

* add `selectedData` based on data refs ([60858fc](https://github.com/DTupalov/react-material-ui-datatable/commit/60858fc))
* optimized handler for state changing ([ca1e009](https://github.com/DTupalov/react-material-ui-datatable/commit/ca1e009))


### BREAKING CHANGES

* - `selectedRows` now is `selectedData`
- `localization.toolbarSelect.selectedRows` fn now is `selectedData` fn
- `selectedData` now receives array of `data`'s objects refs.
- `toolbarSelectActions` receives `selectedData`, `updateSelectedData`
instead of `selectedRows` and `updateSelectedRows`
- deprecate `metaSymbol`
* Props `onShowSearchBarChanged`, `onSearchValueChanged`, `onSortChanged`, `onFilterValuesChanged`, `onPageChanged`, `onPerPageChanged` were removed. Now need to use `onStateChanged`



<a name="2.0.0-alpha.6"></a>
# [2.0.0-alpha.6](https://github.com/DTupalov/react-material-ui-datatable/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2019-02-20)


### Bug Fixes

* Fix select for perPage option for material-ui@>1.5 ([8f92cd0](https://github.com/DTupalov/react-material-ui-datatable/commit/8f92cd0))


### Features

* Using datatable model separate from table component ([840cff7](https://github.com/DTupalov/react-material-ui-datatable/commit/840cff7))


### BREAKING CHANGES

* From exports was removed `withReactMUIDatableModel`



<a name="2.0.0-alpha.5"></a>
# [2.0.0-alpha.5](https://github.com/DTupalov/react-material-ui-datatable/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2019-02-19)


### Bug Fixes

* backward compatibility with material-ui@>1.0 ([52e3842](https://github.com/DTupalov/react-material-ui-datatable/commit/52e3842))



<a name="2.0.0-alpha.4"></a>
# [2.0.0-alpha.4](https://github.com/DTupalov/react-material-ui-datatable/compare/v2.0.0-alpha.2...v2.0.0-alpha.4) (2019-02-19)


### Bug Fixes

* unselect only deleted rows ([1daabdd](https://github.com/DTupalov/react-material-ui-datatable/commit/1daabdd))


### Features

* Add onFilterValuesChanged prop ([c88a041](https://github.com/DTupalov/react-material-ui-datatable/commit/c88a041))
* Add onPageChanged prop ([50eebc5](https://github.com/DTupalov/react-material-ui-datatable/commit/50eebc5))
* Add onPerPageChanged prop ([a27a956](https://github.com/DTupalov/react-material-ui-datatable/commit/a27a956))
* Add onSearchValueChanged prop ([bd289b9](https://github.com/DTupalov/react-material-ui-datatable/commit/bd289b9))
* Add onShowSearchBarChanged prop ([19b5474](https://github.com/DTupalov/react-material-ui-datatable/commit/19b5474))
* Add onSortChanged prop ([f2549dc](https://github.com/DTupalov/react-material-ui-datatable/commit/f2549dc))
* Add toolbarActions prop ([f21654b](https://github.com/DTupalov/react-material-ui-datatable/commit/f21654b))
