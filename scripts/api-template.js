/** Handlebar template */

module.exports = `
## API
 
{{#if description}}{{{description}}}{{/if}}
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}
 
{{#if isMissingComposes}}
*Some or all of the composed components are missing from the list below because a documentation couldn't be generated for them.
See the source code of the component for more information.*
{{/if}}
 
{{#if composes.length}}
{{componentName}} gets more \`propTypes\` from these composed components
{{/if}}
 
{{#each composes}}
#### {{this.componentName}}
 
prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each this.props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}
 
{{/each}}
`;
