import React from 'react';
import { useField } from 'formik'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { getFilteredTags } from '../../../queries/tag'
import useAccumulatedList from '../../hooks/useAccumulatedList';


const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function AutoComplete(props) {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error

  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const fetchList = (input) => getFilteredTags(props.client, input)
  const [loadingOptions, options, updateFilter] = useAccumulatedList(fetchList);

  return (
    <Autocomplete
      {...field}
      {...props}
      style={{ width: 300 }}
      getOptionLabel={props.getOptionLabel}// (option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        console.log(`autocomplete onchange: ${JSON.stringify(newValue)}`)
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        console.log(`autocomplete oninputchange: ${newInputValue}`)

        setInputValue(newInputValue);
        updateFilter(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.inputLabel} variant="outlined" fullWidth />
      )}
      renderOption={(option) => {
        console.log(`option is ${JSON.stringify(option)}`)

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
            <Typography variant="body2" color="textPrimary">
                {option.tag}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {option.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
