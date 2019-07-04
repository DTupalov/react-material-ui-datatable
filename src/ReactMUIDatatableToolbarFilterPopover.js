import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { MUIAutocomplete } from './MUIAutocomplete';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
    maxWidth: 600,
    minWidth: 400,
  },
});

const ReactMUIDatatableToolbarFilterPopover = props => {
  const {
    filterLists,
    filterValues,
    addFilter,
    resetFilter,
    columns,
    localization,
  } = useContext(ReactMUIDatatableContext);

  const filterListsKeys = Object.keys(filterLists);

  return (
    <Popover
      open={Boolean(props.anchorEl)}
      anchorEl={props.anchorEl}
      onClose={() => {
        props.updateAnchorEl(null);
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className={props.classes.container}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant={'h6'}>
              {localization.filterLists.title}
            </Typography>
          </Grid>
          {filterListsKeys.map((columnName, columnIndex) => {
            const isLastRecord = filterListsKeys.length - 1 === columnIndex;
            const isOddLength = filterListsKeys.length % 2 !== 0;
            const isOnlyInRow = isLastRecord && isOddLength;
            return (
              <Grid item xs={isOnlyInRow ? 12 : 6} key={columnIndex}>
                <MUIAutocomplete
                  listItems={filterLists[columnName].list}
                  label={filterLists[columnName].label}
                  initialInputValue={filterValues[columnName]}
                  initialSelectedItem={filterValues[columnName]}
                  onChange={value => addFilter({ columnName, value })}
                  placeholder={localization.filterLists.allOption}
                  noMatchesText={localization.filterLists.noMatchesText}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button color={'primary'} onClick={resetFilter} fullWidth>
              <Typography variant={'subtitle1'}>
                {localization.filterLists.reset}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </Popover>
  );
};

export default withStyles(styles)(ReactMUIDatatableToolbarFilterPopover);
