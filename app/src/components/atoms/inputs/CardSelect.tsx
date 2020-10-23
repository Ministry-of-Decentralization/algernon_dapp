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
  const isError = false// meta.touched && !!meta.error
  const optionItems = props.options.map(
      ((o:any) => <CardItem key={o.value} {...o} onClick={() => helper.setValue(o.value)} isSelected={o.value === field.value} />)
    )

  console.log(`selecting card ${props.classes.formControl}`)
  return (
    <FormControl className={props.classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Flex justifyContent="space-around">
        {optionItems}
      </Flex>
      {isError && <ErrorMessage
        isError={isError}
      errorMsg={meta.error} /> }
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
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '0.5em',
  },
  noLabel: {
    marginTop: '0.5em',
  },
});

// @ts-ignore
export default withStyles(styles)(SelectUI)