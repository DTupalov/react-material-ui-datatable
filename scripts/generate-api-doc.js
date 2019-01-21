const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const componentPath = './src/ReactMUIDatatable.js';
const apiTemplate = require('./api-template');
const renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: __dirname,
  template: apiTemplate,
});

fs.readFile(componentPath, (error, content) => {
  const documentationPath =
    path.basename(componentPath, path.extname(componentPath)) +
    renderer.extension;
  const doc = reactDocgen.parse(content);
  fs.writeFile(
    './API.md',
    renderer.render(
      /* The path to the component, used for linking to the file. */
      componentPath,
      /* The actual react-docgen AST */
      doc,
      /* Array of component ASTs that this component composes*/
      []
    ),
    error => {
      /* handle error */
    }
  );
});
