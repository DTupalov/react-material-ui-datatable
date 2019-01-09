import React, { createContext } from 'react';
import withReactMUIDatatableModel, {
  mapDatatableCalculatedProps,
  mapDatatableHandlers,
  mapDatatableProps,
} from './withReactMUIDatatableModel';

const { Provider, Consumer } = createContext();

export const ReactMUIDatatableConsumer = Consumer;

export const ReactMUIDatatableProvider = props => {
  const { children, ...restProps } = props;
  return (
    <Provider
      value={{
        ...mapDatatableProps(restProps),
        ...mapDatatableCalculatedProps(restProps),
        ...mapDatatableHandlers(restProps),
      }}
    >
      {children}
    </Provider>
  );
};

export default withReactMUIDatatableModel(ReactMUIDatatableProvider);
