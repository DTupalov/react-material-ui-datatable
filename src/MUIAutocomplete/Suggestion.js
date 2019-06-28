import { ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Suggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
  style,
}) => {
  selectedItem = (selectedItem && selectedItem.toString()) || '';
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem.includes(suggestion);

  return (
    <ListItem
      {...itemProps}
      style={style}
      selected={isHighlighted}
      component="div"
    >
      <ListItemText
        primaryTypographyProps={{
          style: {
            fontWeight: isSelected ? 600 : 400,
          },
        }}
        primary={suggestion}
      />
    </ListItem>
  );
};

Suggestion.propTypes = {
  style: PropTypes.object,
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  suggestion: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default Suggestion;
