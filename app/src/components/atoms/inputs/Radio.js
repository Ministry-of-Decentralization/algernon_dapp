import React from 'react'
import { useField } from 'formik'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ErrorMessage from './ErrorMessage';

const RadioUI = (props) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error
  const radioOptions = props.optionItems || 
    props.options.map(
      (o => <FormControlLabel key={o.value} value={o.value} label={o.label} control={<Radio />} />)
    )

  return (
    <FormControl style={props.style}>
      <FormLabel>{props.label}</FormLabel>
      <RadioGroup
        {...field}
        {...props}
      >
        {radioOptions}
      </RadioGroup>
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

export default withStyles(styles)(RadioUI)