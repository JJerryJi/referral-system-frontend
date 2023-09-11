import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import Unauthorized from "./Unauthorized";
import "./UserProfile.css"; // Import your custom CSS file

function UserProfile({ token, student, alumni }) {
  // const [student, setStudent] = useState(null);
  // const [alumni, setAlumni] = useState(null)
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setIsLoading(false)
  }, [token])
  // useEffect(() => {
  //   async function getStudentOrAlumniId() {
  //     try {
  //       // First API call to verify the token and obtain the student ID
  //       const tokenResponse = await fetch(
  //         `http://127.0.0.1:8000/api/token?token=${token}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!tokenResponse.ok) {
  //         throw new Error("Network response for token verification was not ok");
  //       }

  //       const tokenData = await tokenResponse.json();
  //       if (tokenData.student_id) {
  //         // Second API call to fetch student data based on the obtained student ID
  //         const studentResponse = await fetch(
  //           `http://127.0.0.1:8000/user/api/student/${tokenData.student_id}`
  //         );

  //         if (!studentResponse.ok) {
  //           throw new Error("Network response for student data was not ok");
  //         }

  //         const studentData = await studentResponse.json();
  //         setStudent(studentData.student);
  //         setIsLoading(false);

  //       } else if (tokenData.alumni_id){
  //         const AlumniResponse = await fetch(
  //           `http://127.0.0.1:8000/user/api/alumni/${tokenData.alumni_id}`
  //         );
  //         if (!AlumniResponse.ok){
  //           throw new Error('Network response for alumni data was not ok');
  //         }
  //         const alumniData = await AlumniResponse.json()
  //         setIsLoading(false);
  //         setAlumni(alumniData.alumni);
  //         console.log(alumniData)
  //       }
  //       else {
  //         console.error(
  //           "Student ID not found in the token verification response"
  //         );
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching student data:", error);
  //       setIsLoading(false);
  //     }
  //   }

  //   getStudentOrAlumniId();
  // }, [token]);

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
            {`${alumni.user?.first_name || ""} ${
              alumni.user?.last_name || ""
            }`}
          </Typography>
          <Typography variant="subtitle1">
            Email: {alumni.user?.email || ""}
          </Typography>
          <Typography>Company: {alumni.company_name}</Typography>
        </>
      )}
      {!alumni && !student &&(<Unauthorized/>)}
    </div>
  );
}

export default UserProfile;
