import { storiesOf } from '@storybook/react';
import React from 'react';
import { MUIAutocomplete } from '../src/MUIAutocomplete';

const listItems = [
  'Afghanistan',
  'Aland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia, Plurinational State of',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
];

storiesOf('MUIAutocomplete', module).add('common', () => (
  <React.Fragment>
    <MUIAutocomplete
      onChange={console.log}
      listItems={listItems}
      label={'Countries'}
      initialInputValue={''}
      initialSelectedItem={''}
    />
  </React.Fragment>
));
