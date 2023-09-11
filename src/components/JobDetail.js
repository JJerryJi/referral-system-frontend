import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";

function JobDetail({ token }) {
  const { jobId } = useParams();
  console.log(jobId);
  const [jobDetail, setJobDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [FavJob, setFavJob] = useState(false)

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

  console.log(jobDetail);

  const onSumbitHandler = async () => {
    // response = await fetch("http:127.0.0.1:8000/api/favorite_jobs", {
    //   method: "POST",
    //   headers: { Authorization: authToken },
    //   body: {
    //       "student_id": studentId,// get student_id from auth-token,
    //       "job_id": jobId,
    //   }
    // });
    // if(response.ok){
    //   setFavJob(true)
    // }
  };

  // Define the paths for the Link components
  const jobPostsPath = "/job-posts";
  const applicationPath = `/application/${jobId}`;

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
      <div>
        {jobDetail.job_post.job_open_status === "closed" ? (
          <Button variant="contained" disabled>
            Application Closed
          </Button>
        ) : (
          <Link to={applicationPath}>
            <Button variant="contained"> Go to Application Page</Button>
          </Link>
        )}
      </div>
      <Button variant="contained" onClick={onSumbitHandler}>
        Add to Favorite Jobs
      </Button>
      {FavJob && <Alert severity="success">Add to fav_job</Alert>}
    </div>
  );
}

export default JobDetail;
