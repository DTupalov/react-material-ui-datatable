import { ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

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
  const listItemRef = React.createRef();

  // Auto resize font for fixed height virtualized list item, until DynamicSizeList would be merged
  // https://github.com/bvaughn/react-window/pull/102
  React.useLayoutEffect(() => {
    let fontSize = 1;
    const listItemSpanNode = ReactDOM.findDOMNode(
      listItemRef.current
    ).querySelector('span');

    while (listItemSpanNode.clientHeight > 48 && fontSize > 0) {
      fontSize = fontSize - 0.1;
      listItemSpanNode.style.fontSize = `${fontSize}rem`;
    }
  }, []);

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
        ref={listItemRef}
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
