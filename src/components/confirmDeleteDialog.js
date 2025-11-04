import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>تأكيد الحذف</DialogTitle>
      <DialogContent>
        <Typography>هل أنت متأكد من أنك تريد حذف هذا العنصر؟</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-evenly', px: 3 }}>
        <Button onClick={onConfirm} color="error" variant="contained">
          نعم
        </Button>
        <Button onClick={onClose} variant="outlined">
          لا
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;