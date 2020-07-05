import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class FormDialog extends React.Component {

  render() {
    const {text, content, onSubmit, submitLabel } = this.props
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              {text}
            </DialogContentText>
            {content}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            {onSubmit ? 
              (<Button onClick={onSubmit} color="primary">
                {submitLabel}
              </Button>) : null }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}