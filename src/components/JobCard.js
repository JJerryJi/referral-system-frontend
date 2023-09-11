import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function JobCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography align='center' variant="h6">{props.job_name}</Typography>
        <Typography align='center' variant="subtitle1">{props.job_company}</Typography>
        <Typography align='center' variant="body2">{props.job_description}</Typography>
        <Link to={`/job-posts/${props.id}`}>View Job Details</Link>
      </CardContent>
    </Card>
  );
}

export default JobCard;
