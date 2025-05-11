import React, { useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const statusOptions = [
  { label: "Bitti", value: "bitti" },
  { label: "Bitmedi", value: "bitmedi" },
  { label: "Arada", value: "arada" },
];

const SubjectRow = ({ id, subject, onSave, initialStatus, initialComment }) => {
  const [status, setStatus] = useState(initialStatus || "bitmedi");
  const [comment, setComment] = useState(initialComment || "");

  // Durum değişince hemen kaydet
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onSave(newStatus, comment, "status");
  };

  // Yorum kaydet
  const handleSaveComment = () => {
    onSave(status, comment, "comment");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        mb: 0.5,
        px: 1,
        py: 0.4,
        minHeight: 15,
        background: '#fafbfc',
        borderRadius: 2,
        boxShadow: 'none',
        transition: 'background 0.2s',
        '&:hover': { background: '#f0f4f8' },
      }}
    >
      <Box
        sx={{
          width: 280,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flexShrink: 0,
          color: '#222',
        }}
        title={subject}
      >
        {subject}
      </Box>
      <ButtonGroup variant="outlined" sx={{ flex: 1, minWidth: 220 }}>
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={status === option.value ? "contained" : "outlined"}
            color={
              option.value === "bitti"
                ? "success"
                : option.value === "bitmedi"
                ? "error"
                : "warning"
            }
            onClick={() => handleStatusChange(option.value)}
            sx={{ minWidth: 100 }}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Yorum"
        size="small"
        sx={{ flex: 4, minWidth: 120, mx: 2 }}
        inputProps={{ maxLength: 100 }}
      />
      <Button
        onClick={handleSaveComment}
        variant="contained"
        color="primary"
        sx={{ minWidth: 90, fontWeight: 600 }}
      >
        Kaydet
      </Button>
    </Paper>
  );
};

export default SubjectRow;