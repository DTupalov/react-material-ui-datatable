import {
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { pipe } from '../utils';
import getSuggestions from './getSuggestions';
import NoMatches from './NoMatches';
import Suggestion from './Suggestion';

const ROW_SIZE = 46;
const MAX_MENU_SIZE = 460;

const MUIAutocomplete = React.memo(props => {
  const { classes, listItems, label, placeholder, noMatchesText } = props;
  const inputRef = useMemo(() => React.createRef(), []);
  const onChange = useMemo(
    () =>
      pipe(
        v => v || '',
        props.onChange
      ),
    []
  );

  return (
    <Downshift
      // such key need to reset Downshift's state,
      // if initialInputValue or initialSelectedItem was changed
      key={`${props.initialInputValue}-${props.initialSelectedItem}`}
      initialInputValue={props.initialInputValue.toString()}
      initialSelectedItem={props.initialSelectedItem.toString()}
      onChange={onChange}
      scrollIntoView={() => {}}
    >
      {({
        openMenu,
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
        clearSelection,
        closeMenu,
      }) => {
        const suggestions = getSuggestions(inputValue, listItems);
        // itemProps need for Downshift to calculate all items
        // and then we can receive correct index
        // to highlight selected/hovered list item
        const itemProps = suggestions.map(suggestion =>
          getItemProps({ item: suggestion })
        );
        return (
          <div className={classes.container}>
            {
              <TextField
                InputProps={{
                  ...getInputProps({
                    placeholder,
                  }),
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton onClick={clearSelection}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.inputInput,
                  },
                  inputRef,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label={label}
                onClick={openMenu}
                fullWidth
              />
            }
            <Popper
              open={isOpen}
              anchorEl={inputRef.current}
              modifiers={{
                flip: { enabled: false },
              }}
              // https://stackoverflow.com/questions/53126095/how-to-show-downshift-popper-on-top-of-material-ui-dialog/53126688
              style={{ zIndex: 1400 }}
            >
              <Paper
                square
                style={{
                  zIndex: 9999,
                  marginTop: 8,
                  width: inputRef.current ? inputRef.current.clientWidth : null,
                  maxHeight: MAX_MENU_SIZE,
                  minWidth: 150,
                  overflow: 'auto',
                }}
              >
                {suggestions.length ? (
                  <FixedSizeList
                    height={
                      suggestions.length * ROW_SIZE >= MAX_MENU_SIZE
                        ? MAX_MENU_SIZE
                        : suggestions.length * ROW_SIZE
                    }
                    itemSize={ROW_SIZE}
                    itemCount={suggestions.length}
                  >
                    {({ index, style }) => {
                      const suggestion = suggestions[index];
                      return (
                        <Suggestion
                          key={suggestion}
                          suggestion={suggestion}
                          index={index}
                          itemProps={itemProps[index]}
                          highlightedIndex={highlightedIndex}
                          selectedItem={selectedItem}
                          style={style}
                        />
                      );
                    }}
                  </FixedSizeList>
                ) : (
                  <NoMatches inputValue={inputValue} text={noMatchesText} />
                )}
              </Paper>
            </Popper>
          </div>
        );
      }}
    </Downshift>
  );
});

MUIAutocomplete.defaultProps = {
  initialInputValue: '',
  initialSelectedItem: '',
  placeholder: 'All',
  noMatchesText: 'No matches',
};

MUIAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  listItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  initialInputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  label: PropTypes.string,
};

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    marginTop: theme.spacing.unit,
    maxHeight: MAX_MENU_SIZE,
    overflow: 'auto',
  },
  inputInput: {
    width: '100%',
    flexGrow: 1,
    '&::-ms-clear': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(MUIAutocomplete);
