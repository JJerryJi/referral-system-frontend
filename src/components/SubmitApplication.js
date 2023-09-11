import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";

function SubmitApplication({ token }) {
  const { jobId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitSuccess, setSubmitStatus] = useState(false);
  const [errorText, setErrorText] = useState(""); // Added state for error message

  const ApplicationApiEndpoint = 'http://127.0.0.1:8000/application/api/application';
  const authToken = `Token ${token}`;

  useEffect(() => {
    setLoading(false); // Assuming loading is done when the component mounts
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setResumeFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("job_id", jobId);
      formData.append("linkedIn", linkedIn);
      formData.append("answer", answer);
      console.log(authToken)
      const response = await fetch(ApplicationApiEndpoint, {
        method: "POST",
        headers: {
          Authorization: authToken,
        },
        body: formData, // Using FormData for multipart/form-data
      });

      if (response.ok) {
        setSubmitStatus(true);
        console.log('Submission success!');
      } else {
        // Handle the error response and extract the error message
        const responseData = await response.json();
        setErrorText(responseData.error);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };


  return (
    <> 
    <Container maxWidth="sm">
      <Typography variant="h4">Submit Job Application</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <form>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <TextField
            label="LinkedIn URL"
            variant="outlined"
            fullWidth
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <TextField
            label="Answer"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      )}
    </Container>
    {submitSuccess && <Alert severity="success">Submission successful!</Alert>}
    {errorText && <Alert severity="error">{errorText}</Alert>} {/* Display error message */}
   </>
  );
}

export default SubmitApplication;
