import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";

function JobDetail({ token, alumni, student }) {
  const { jobId } = useParams();
  // console.log(jobId);
  const [jobDetail, setJobDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [AddtoFavJob, setToFavJob] = useState(false);
  const [Error, setErrorMsg] = useState(null);

  // Mock API endpoint for job detail data
  const mockApiEndpoint = `http://127.0.0.1:8000/job/api/posts/${jobId}`;
  const authToken = `Token ${token}`; // Your authorization token

  useEffect(() => {
    async function fetchJobDetail() {
      try {
        const response = await fetch(mockApiEndpoint, {
          headers: {
            Authorization: authToken,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setJobDetail(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job detail:", error);
        setIsLoading(false);
      }
    }

    fetchJobDetail();
  }, [authToken, mockApiEndpoint]);

  
  if (isLoading) {
    return <CircularProgress />;
  }

  if (!jobDetail.job_post) {
    return <Typography variant="body1">Job detail not available.</Typography>;
  }

  // console.log(jobDetail);

  const onSumbitHandler = async () => {
    try {
      let studentId;

      if (student) {
        studentId = student.student_id;
      } else {
        console.error("Student data not available.");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/job/api/favorite_jobs",
        {
          method: "POST",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify({
            student_id: studentId, // Use the appropriate ID field here
            job_id: jobId,
          }),
        }
      );
      if (response.ok) {
        setToFavJob(true);
      } else {
        const msg = await response.json();
        console.error("Failed to add job to favorite jobs.");
        setErrorMsg(msg.error);
      }
    } catch (error) {
      console.error("Error adding job to favorite jobs:", error);
    }
  };

  // Define the paths for the Link components
  const jobPostsPath = "/job-posts";
  const applicationPath = `/application/${jobId}`;
  const editJobPostPath = `/edit-job-posts/${jobId}`
  return (
    <div>
      <Typography variant="h5">
        Job Name: {jobDetail.job_post.job_name}
      </Typography>
      <Typography variant="h5">
        Job Company: {jobDetail.job_post.job_company}
      </Typography>
      <Typography variant="h6">
        Job Requirement: {jobDetail.job_post.job_requirement}
      </Typography>
      <Typography variant="h6">
        Job Description: {jobDetail.job_post.job_description}
      </Typography>
      <Typography variant="h6">
        Question: {jobDetail.job_post.job_question}
      </Typography>
      <Typography variant="h6">
        Job Open Status: {jobDetail.job_post.job_open_status}
      </Typography>
      <Typography variant="h6">
        Number of applicants: {jobDetail.job_post.num_of_applicants}
      </Typography>
      <div>
        <Link to={jobPostsPath}>
          <Button variant="contained">Back to Job Posts Page</Button>
        </Link>
      </div>

      {/* Conditional Rendering Application button */}
      {student && <div>
        {jobDetail.job_post.job_open_status === "closed" ? (
          <Button variant="contained" disabled>
            Application Closed
          </Button>
        ) : (
          <Link to={applicationPath}>
            <Button variant="contained"> Go to Application Page</Button>
          </Link>
        )}
      </div>}

      {student && (
        <Button variant="contained" onClick={onSumbitHandler}>
          Add to Favorite Jobs
        </Button>
      )}
      {alumni &&( <Link to={editJobPostPath}> <Button variant="contained">Modify Job Post</Button> </Link>)}
      {AddtoFavJob && <Alert severity="success">Add to fav_job</Alert>}
      {Error && <Alert severity="error"> {Error} </Alert>}
    </div>
  );
}

export default JobDetail;
