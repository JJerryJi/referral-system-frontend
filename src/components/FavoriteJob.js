import { useEffect, useState } from "react";
import { Alert, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FavoriteJobView({ token }) {
  const [favoriteJobs, setfavoriteJobs] = useState([]);
  const favoriteJobEndpoint = "http://127.0.0.1:8000/job/api/favorite_jobs";
  const [errorMsg, setErrMsg] = useState(null);

  useEffect(() => {
    async function ViewFavJobs() {
      try {
        const response = await fetch(favoriteJobEndpoint, {
          method: "GET",
          headers: { Authorization: `Token ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          setErrMsg(data.error);
        } else {
          setfavoriteJobs(data.favorite_jobs);
        }
      } catch (error) {
        console.log(error);
      }
    }

    ViewFavJobs();
  }, [token]);

  const navigate = useNavigate();
  let autoIncreasingId = 1;

  return (
    <>
      <h1>Favorite Jobs</h1>
      {errorMsg && <Alert severity="error"> {errorMsg} </Alert>}
      {favoriteJobs.map((fav_job) => (
        <Card key={autoIncreasingId++}>
          <Typography>Favorite Job: {autoIncreasingId}</Typography>
          <Button
            onClick={() => {
              navigate(`/job-posts/${fav_job.job_id}`);
            }}
          >
            Job Post {fav_job.job_id}
          </Button>
        </Card>
      ))}
    </>
  );
}

export default FavoriteJobView;
