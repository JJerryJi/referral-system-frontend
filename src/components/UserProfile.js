import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import Unauthorized from "./Unauthorized";
import "./UserProfile.css"; // Import your custom CSS file

function UserProfile({ token, student, alumni }) {
  // const [student, setStudent] = useState(null);
  // const [alumni, setAlumni] = useState(null)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [token]);
  

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="user-profile-container">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {student && (
        <>
          <Typography variant="h5">
            Username: {student.user?.username}
          </Typography>
          <Typography variant="h5">
            Name:{" "}
            {`${student.user?.first_name || ""} ${
              student.user?.last_name || ""
            }`}
          </Typography>
          <Typography variant="subtitle1">
            Email: {student.user?.email || ""}
          </Typography>
          <Typography variant="subtitle1">
            School: {student.school || ""}
          </Typography>
          <Typography variant="subtitle1">
            Major: {student.major || ""}
          </Typography>
          <Typography variant="subtitle1">
            Year in School: {student.year_in_school || ""}
          </Typography>
          <Typography variant="subtitle1">
            Graduation Year:{" "}
            {student.graduation_year
              ? new Date(student.graduation_year).toLocaleDateString()
              : ""}
          </Typography>
        </>
      )}
      {alumni && (
        <>
          <Typography variant="h5">
            Username: {alumni.user?.username}
          </Typography>
          <Typography variant="h5">
            Name:{" "}
            {`${alumni.user?.first_name || ""} ${alumni.user?.last_name || ""}`}
          </Typography>
          <Typography variant="subtitle1">
            Email: {alumni.user?.email || ""}
          </Typography>
          <Typography>Company: {alumni.company_name}</Typography>
        </>
      )}
      {!alumni && !student && <Unauthorized />}
    </div>
  );
}

export default UserProfile;
