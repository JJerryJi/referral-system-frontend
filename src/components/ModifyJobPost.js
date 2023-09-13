import React, { useEffect, useState } from "react";
import {
  Alert,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

function JobPostModification({ token }) {
  const jobId = useParams().jobId; // Assuming you have a route parameter named "jobId"

  const [jobName, setJobName] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobQuestion, setJobQuestion] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");

  const Token = `Token ${token}`;
  async function sumbitHandler() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/job/api/posts/${jobId}`,
        {
          method: "PUT",
          headers: {
            Authorization: Token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_name: jobName,
            job_company: jobCompany,
            job_requirement: jobRequirement,
            question: jobQuestion, // Updated to match your backend property name
            job_description: jobDescription,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        setsuccessMsg(data.message);
      }
    } catch (error) {
      setErrMsg("Error: ", error);
    }
  }

  useEffect(() => {
    async function fetchJobPostData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/job/api/posts/${jobId}`,
          {
            method: "GET",
            headers: {
              Authorization: Token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setJobName(data.job_post.job_name);
          setJobCompany(data.job_post.job_company);
          setJobQuestion(data.job_post.job_question);
          setJobDescription(data.job_post.job_description);
          setJobRequirement(data.job_post.job_requirement);
        } else {
          const data = await response.json();
          setErrMsg("Error fetching job post data");
        }
      } catch (error) {
        setErrMsg(`Error fetching job post data: ${error.message}`);
        console.error("Error fetching Job Post Data: ", error);
      }
    }

    fetchJobPostData();
  }, [token, jobId]);

  return (
    <Container>
      <Paper style={{ padding: "16px" }}>
        <Typography variant="h5">Edit Your Job Post:</Typography>
        <form>
          <TextField
            label="Job Name"
            variant="outlined"
            fullWidth
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            style={{ marginBottom: "16px" }} // Add inline styling here
          />
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            value={jobCompany}
            onChange={(e) => setJobCompany(e.target.value)}
            style={{ marginBottom: "16px" }} // Add inline styling here
          />
          <TextField
            label="Job Requirement"
            variant="outlined"
            fullWidth
            value={jobRequirement}
            onChange={(e) => setJobRequirement(e.target.value)}
            style={{ marginBottom: "16px" }} // Add inline styling here
          />
          <TextField
            label="Job Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={{ marginBottom: "16px" }} // Add inline styling here
          />
          <TextField
            label="Job Question"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={jobQuestion}
            onChange={(e) => setJobQuestion(e.target.value)}
            style={{ marginBottom: "16px" }} // Add inline styling here
          />
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <Button
            variant="contained"
            color="primary"
            onClick={sumbitHandler}
            style={{ marginTop: "16px" }} // Add inline styling here
          >
            Update Job Post
          </Button>
          <Link to={"/job-posts"}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Go back to All Job Posts
            </Button>
          </Link>
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
        </form>
      </Paper>
    </Container>
  );
}

export default JobPostModification;
