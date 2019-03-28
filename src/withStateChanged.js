import React from 'react';

const withStateChanged = Component =>
  class WithStateChanged extends React.Component {
    render() {
      return <Component {...this.props} />;
    }

    componentDidUpdate(prevProps) {
      const initialStateKeys = [
        'showSearchBar',
        'page',
        'perPage',
        'selectedRows',
        'searchValue',
        'sort',
        'filterValues',
      ];

      const changedStates = initialStateKeys.filter(
        stateKey => prevProps[stateKey] !== this.props[stateKey]
      );

      if (changedStates) {
        const datatableState = initialStateKeys.reduce(
          (datatableState, stateKey) => {
            datatableState[stateKey] = this.props[stateKey];
            return datatableState;
          },
          {}
        );

        changedStates.forEach(stateKey =>
          this.props.onStateChanged({
            name: stateKey,
            value: this.props[stateKey],
            state: datatableState,
          })
        );
      }
    }
  };

export default withStateChanged;
