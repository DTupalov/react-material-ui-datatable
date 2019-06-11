import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { ReactMUIDatatableContext } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarFilterPopover = props => {
  const {
    filterLists,
    filterValues,
    addFilter,
    resetFilter,
    columns,
    localization,
  } = useContext(ReactMUIDatatableContext);

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
      <Grid container spacing={24} className={props.classes.root}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {localization.filterLists.title}
          </Typography>
        </Grid>
        {Object.keys(filterLists).map((columnName, columnIndex) => (
          <Grid item xs={6} key={columnIndex}>
            <TextField
              select
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              value={filterValues[columnName] || ''}
              label={filterLists[columnName].label}
              onChange={e => addFilter({ columnName, value: e.target.value })}
              fullWidth
            >
              <MenuItem value={''} defaultChecked>
                {localization.filterLists.allOption}
              </MenuItem>
              {filterLists[columnName].list.map((value, valueIndex) => (
                <MenuItem value={value} key={valueIndex}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button color={'primary'} onClick={resetFilter} fullWidth>
            <Typography variant={'subtitle1'}>
              {localization.filterLists.reset}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default withStyles(theme => ({
  root: { padding: theme.spacing.unit * 2 },
}))(ReactMUIDatatableToolbarFilterPopover);
