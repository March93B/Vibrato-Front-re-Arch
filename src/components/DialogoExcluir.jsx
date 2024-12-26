import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog4({ handleConfirmation, handleCancel }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    handleCancel();
  };

  const handleAgree = (e) => {
    e.stopPropagation();
    setOpen(false);
    handleConfirmation();
  };

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClick={handleDialogClick}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja excluir a conta?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleAgree} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
