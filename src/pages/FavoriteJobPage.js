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

  async function removeJobFromFavorites(jobId){
    try{
      const response = await fetch(`http://127.0.0.1:8000/job/api/favorite_jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        setErrMsg(data.error);
      } else {
        const data = await response.json();
        // Remove the job from the list of favoriteJobs in the state
        console.log(data);
        setfavoriteJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      }
    } catch (error) {
      console.error("Error removing job from favorites:", error);
    }
  }

  return (
    <>
      <h1>Favorite Jobs</h1>
      {errorMsg && <Alert severity="error"> {errorMsg} </Alert>}
      {favoriteJobs.map((fav_job) => (
        <Card key={autoIncreasingId++}>
          <Typography>Favorite Job: {autoIncreasingId}</Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate(`/job-posts/${fav_job.job_id}`);
            }}
          >
            Job Post {fav_job.job_id}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              removeJobFromFavorites(fav_job.id);
            }}
          >
            Remove from Favorite
          </Button>
        </Card>
      ))}
    </>
  );
}

export default FavoriteJobView;
