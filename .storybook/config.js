import { configure } from '@storybook/react';

const productionRequire = require.context(
  '../stories',
  true,
  /ReactMUIDatatable.stories.js$/
);
const developmentRequire = require.context('../stories', true, /.stories.js$/);

const req =
  process.env.NODE_ENV === 'production'
    ? productionRequire
    : developmentRequire;
function loadStories() {
  req.keys().forEach(filename => {
    req(filename);
  });
}

configure(loadStories, module);
