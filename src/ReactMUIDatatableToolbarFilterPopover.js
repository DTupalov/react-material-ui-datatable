import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
import { ReactMUIDatatableConsumer } from './ReactMUIDatatableProvider';

const ReactMUIDatatableToolbarFilterPopover = props => {
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
          <Typography variant={'h6'}>Filter</Typography>
        </Grid>
        {Object.keys(props.filterLists).map((column, columnIndex) => (
          <Grid item xs={6} key={columnIndex}>
            <TextField
              select
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              value={props.filterValues[column]}
              label={props.filterLists[column].label}
              onChange={e => props.addFilter({ column, value: e.target.value })}
              fullWidth
            >
              <MenuItem value={''}>All</MenuItem>
              {props.filterLists[column].list.map((value, valueIndex) => (
                <MenuItem value={value} key={valueIndex}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button color={'primary'} onClick={props.resetFilter} fullWidth>
            <Typography variant={'subheading'}>Reset</Typography>
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default compose(
  fromRenderProps(ReactMUIDatatableConsumer, ({ ...datatableProps }) => ({
    filterLists: datatableProps.filterLists,
    filterValues: datatableProps.filterValues,
    addFilter: datatableProps.addFilter,
    resetFilter: datatableProps.resetFilter,
    columns: datatableProps.columns,
  })),
  withStyles(theme => ({
    root: { padding: theme.spacing.unit * 2 },
  }))
)(ReactMUIDatatableToolbarFilterPopover);
