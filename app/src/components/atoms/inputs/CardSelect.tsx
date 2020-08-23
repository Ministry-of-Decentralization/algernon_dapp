import React from 'react'
import { useField } from 'formik'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorMessage from './ErrorMessage';
import CardItem from './CardItem'
import Flex from '../Flex';


const SelectUI = (props:any) => {
  const [field, meta, helper] = useField(props);
  const isError = meta.touched && !!meta.error
  const optionItems = props.options.map(
      ((o:any) => <CardItem key={o.value} {...o} onClick={() => helper.setValue(o.value)} isSelected={o.value === field.value} />)
    )

  return (
    <FormControl style={props.style}>
      <InputLabel>{props.label}</InputLabel>
      <Flex>
        {optionItems}
      </Flex>
      <ErrorMessage
        isError={isError}
        errorMsg={meta.error} />
    </FormControl>
  )
}

  const styles = (theme:any) => ({
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

// @ts-ignore
export default withStyles(styles)(SelectUI)