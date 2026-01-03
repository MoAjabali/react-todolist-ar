import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function EditTaskDialog({ open, onClose, task, onSave }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDetails, setEditedDetails] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDetails(task.details);
    }
  }, [task]);

  const validateAndSave = () => {
    if (editedTitle.length < 2) {
      setTitleError("يجب أن يحتوي العنوان على حرفين على الأقل");
      return;
    }
    onSave(editedTitle, editedDetails);
    setTitleError("");
  };

  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>تعديل المهمة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="عنوان المهمة"
          type="text"
          fullWidth
          variant="outlined"
          value={editedTitle}
          onChange={(e) => {
            setEditedTitle(e.target.value);
            if (e.target.value.length >= 2) {
              setTitleError("");
            }
          }}
          error={!!titleError}
          helperText={titleError}
          sx={{ 
            mb: 2,
            '& .MuiInputBase-input': {
              textAlign: 'right',
              direction: 'rtl',
            },
            '& .MuiInputLabel-root': {
              transformOrigin: 'top right',
              left: 'auto',
              right: 26,
            },
            '& .MuiFormHelperText-root': {
              textAlign: 'right',
            }
          }}
        />

        <TextField
          margin="dense"
          label="تفاصيل المهمة"
          type="text"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={editedDetails}
          onChange={(e) => setEditedDetails(e.target.value)}
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'right',
              direction: 'rtl',
            },
            '& .MuiInputLabel-root': {
              transformOrigin: 'top right',
              left: 'auto',
              right: 26,
              
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          إلغاء
        </Button>
        <Button onClick={validateAndSave} color="primary">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}