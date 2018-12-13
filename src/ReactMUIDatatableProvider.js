import React, { createContext } from 'react';

const { Provider, Consumer } = createContext();

export const ReactMUIDatatableConsumer = Consumer;

export const ReactMUIDatatableProvider = props => {
  const { children, ...restProps } = props;
  return <Provider value={restProps}>{children}</Provider>;
};

export default ReactMUIDatatableProvider;
