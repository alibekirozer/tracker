// src/components/LessonAccordion.jsx
import React from "react";
import SubjectRow from "./SubjectRow";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';

const LessonAccordion = ({ lesson, subjects, onSubjectSave, open, onToggle }) => {
  // İstatistik hesaplama
  const total = subjects.length;
  const done = subjects.filter((s) => s.status === "bitti").length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Accordion sx={{ mb: 2 }} expanded={open}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          background: '#f5f5f5',
          borderRadius: '8px 8px 0 0',
          minHeight: 56,
        }}
        onClick={onToggle}
      >
        <Typography sx={{ flex: 1, fontWeight: 'bold' }}>{lesson}</Typography>
        <Typography sx={{ color: '#1976d2', fontSize: 14, mr: 2 }}>
          {done}/{total} (%{percent})
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 1, pb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{ height: 8, borderRadius: 4, mb: 2, background: '#e3f2fd' }}
        />
        {subjects.map((subject, idx) => (
          <SubjectRow
            key={subject.id}
            id={subject.id}
            subject={subject.name}
            initialStatus={subject.status}
            initialComment={subject.comment}
            onSave={(status, comment, changedField) =>
              onSubjectSave(lesson, subject.id, status, comment, changedField)
            }
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default LessonAccordion;