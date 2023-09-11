import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import JobCard from './JobCard'; // You can create this component for rendering individual job posts
import { Box, Typography, Button } from '@mui/material';
import Unauthorized from './Unauthorized';

function JobPosts({ token }) {
  const [authView, setAuthView] = useState(false); // Set initial value to true for authorized view
  const [jobPosts, setJobPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock API endpoint for job posts data
  const mockApiEndpoint = 'http://127.0.0.1:8000/job/api/posts';
  const authToken = `Token ${token}`; // Your authorization token

  useEffect(() => {
    async function fetchJobPosts() {
      try {
        const response = await fetch(mockApiEndpoint, {
          method: 'GET',
          headers: {
            Authorization: authToken,
          },
        });
        console.log(response);

        if (!response.ok) {
          setIsLoading(false);
          return; // Stop further execution
        }
        // If the token is  valid, set authView to false
        setAuthView(true);
        const data = await response.json();
        setJobPosts(data.job_post);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job posts:', error);
        setIsLoading(false);
      }
    }

    fetchJobPosts();
  }, [authToken]);

  if (isLoading) {
    return <CircularProgress />;
  }

  // Filter job posts where job_review_status is 'Pass'
  const filteredJobPosts = jobPosts.filter((jobPost) => jobPost.job_review_status === 'Pass');

  return authView ? (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {filteredJobPosts.map((jobPost) => (
        <JobCard
          key={jobPost.job_id} // You should provide a unique key for each JobCard
          job_name={jobPost.job_name}
          job_company={jobPost.job_company}
          job_description={jobPost.job_description}
          id={jobPost.job_id}
        />
      ))}
    </Box>
  ) : (
    <Unauthorized />
  );
}

export default JobPosts;
