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
          <Typography variant={'title'}>{props.labels.title}</Typography>
        </Grid>
        {Object.keys(props.filterLists).map((columnName, columnIndex) => (
          <Grid item xs={6} key={columnIndex}>
            <TextField
              select
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              value={props.filterValues[columnName] || ''}
              label={props.filterLists[columnName].label}
              onChange={e =>
                props.addFilter({ columnName, value: e.target.value })
              }
              fullWidth
            >
              <MenuItem value={''} defaultChecked>
                {props.labels.allOption}
              </MenuItem>
              {props.filterLists[columnName].list.map((value, valueIndex) => (
                <MenuItem value={value} key={valueIndex}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button color={'primary'} onClick={props.resetFilter} fullWidth>
            <Typography variant={'subheading'}>{props.labels.reset}</Typography>
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
    labels: datatableProps.localization.filterLists,
  })),
  withStyles(theme => ({
    root: { padding: theme.spacing.unit * 2 },
  }))
)(ReactMUIDatatableToolbarFilterPopover);
