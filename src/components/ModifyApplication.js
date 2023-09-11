import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Grid, Paper, Alert } from "@mui/material";
import { useParams } from "react-router-dom";

function ApplicationForm({token}) {
  const { applicationId } = useParams();
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    // Fetch the existing application data and populate the form fields if needed
    async function fetchApplicationData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/application/api/application/${applicationId}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if (response.ok) {
          const data = await response.json();
        //   console.log("Data received from backend:", data);

          // populate the field iwth 
          setLinkedIn(data.application.linkedIn);
          setAnswer(data.application.answer);
          setResumeFile(data.application.resume_path)
        } else {
          setErrorText("Error fetching application data");
        }
      } catch (error) {
        setErrorText("Error fetching application data");
        console.error("Error fetching application data:", error);
      }
    }

    fetchApplicationData();
  }, [applicationId, token]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setResumeFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
      if (linkedIn){
      formData.append("linkedIn", linkedIn);
      }
      if (answer){
      formData.append("answer", answer);
      }

      const response = await fetch(`http://127.0.0.1:8000/application/api/application/${applicationId}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const responseData = await response.json();
        setErrorText(responseData.error);
      }
    } catch (error) {
        console.error("Error submitting application:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4">Edit Your Job Application: {applicationId}</Typography>
        {errorText && (
          <Alert severity="error">{errorText}</Alert>
        )}
        {submitSuccess && (
          <Alert severity="success">Application updated successfully!</Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="LinkedIn URL"
                variant="outlined"
                fullWidth
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Answer"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Update Application
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ApplicationForm;
