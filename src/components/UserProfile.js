import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import Unauthorized from "../pages/UnauthorizedPage";
import "./UserProfile.css"; // Import your custom CSS file

function UserProfile({ token, student, alumni }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="user-profile-container">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      {/* Display student profile if student data is available */}
      {student && (
        <>
          <Typography variant="h5">Username: {student.user?.username}</Typography>
          <Typography variant="h5">
            Name: {`${student.user?.first_name || ""} ${student.user?.last_name || ""}`}
          </Typography>
          <Typography variant="subtitle1">Email: {student.user?.email || ""}</Typography>
          <Typography variant="subtitle1">School: {student.school || ""}</Typography>
          <Typography variant="subtitle1">Major: {student.major || ""}</Typography>
          <Typography variant="subtitle1">Year in School: {student.year_in_school || ""}</Typography>
          <Typography variant="subtitle1">
            Graduation Year: {student.graduation_year ? new Date(student.graduation_year).toLocaleDateString() : ""}
          </Typography>
        </>
      )}

      {/* Display alumni profile if alumni data is available */}
      {alumni && (
        <>
          <Typography variant="h5">Username: {alumni.user?.username}</Typography>
          <Typography variant="h5">
            Name: {`${alumni.user?.first_name || ""} ${alumni.user?.last_name || ""}`}
          </Typography>
          <Typography variant="subtitle1">Email: {alumni.user?.email || ""}</Typography>
          <Typography>Company: {alumni.company_name}</Typography>
        </>
      )}

      {/* Display Unauthorized component if neither student nor alumni data is available */}
      {!student && !alumni && <Unauthorized />}
    </div>
  );
}

export default UserProfile;
