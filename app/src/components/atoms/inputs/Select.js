import React from 'react'
import { useField } from 'formik'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ErrorMessage from './ErrorMessage';

const SelectUI = (props) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error
  const selectOptions = props.optionItems || 
    props.options.map(
      (o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)
    )

  return (
    <FormControl style={props.style}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...field}
        {...props}
      >
        {selectOptions}
      </Select>
      <ErrorMessage
        isError={isError}
        errorMsg={meta.error} />
    </FormControl>
  )
}

  const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(SelectUI)