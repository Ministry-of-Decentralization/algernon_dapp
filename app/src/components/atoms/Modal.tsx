import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from './inputs/buttons/Button';

interface Props {
  triggerText: string;
  triggerColor?: string;
  title: string;
  contentText: string;
  getForm: any;
}

export default function Modal(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const color = props.triggerColor || "#fff"

  return (
    <div >
      <Button
        style={{ color }}
        onClick={handleClickOpen}
        label={props.triggerText}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.contentText}
          </DialogContentText>
          {props.getForm(handleClose)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
