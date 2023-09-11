import React from "react";
import { Card, CardContent, Typography, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DetailedApplicationView({ application }) {
  const navigate = useNavigate();

  // Check if the application object is defined before accessing its properties
  if (!application) {
    return null; // Return null or some placeholder content if application is undefined
  }

  let severity = null;
  if (application.status === "Selected") {
    severity = "success";
  } else if (application.status === "In Progress") {
    severity = "info";
  } else {
    severity = "error";
  }

  return (
    <Card variant="outlined" style={{ margin: "16px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Application to Job ID: {application.job_id}
        </Typography>
        <Alert severity={severity}>
          Status: {application.status}
        </Alert>
        <Typography variant="body2" color="text.secondary">
        Application ID: {application.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Resume Path: {application.resume_path}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          LinkedIn: {application.linkedIn}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Application Date: {application.application_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Answer: {application.answer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Modified Date: {application.modified_date}
        </Typography>
        <Button
          variant="contained"  
          onClick={() => {
            navigate(`/job-posts/${application.job_id}`);
          }}
        >
          Link to Job Post
        </Button>
        <Button 
        variant='contained'
        onClick={() => {
          // Pass in application.id 
            navigate(`/change-application/${application.id}`);
          }}>
          Modify this Application
        </Button>
      </CardContent>
    </Card>
  );
}

export default DetailedApplicationView;
