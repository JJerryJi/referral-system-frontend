import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";
import UserProfile from "./components/UserProfile";
import JobPosts from "./pages/JobPostsPage";
import JobDetail from "./pages/JobDetailPage";
import SignInForm from "./pages/SignInPage";
import Cookies from "universal-cookie";
import { useState } from "react";
import SubmitApplication from "./components/SubmitApplication";
import ApplicationView from "./components/StudentApplicationView";
import ModifyApplication from "./components/ModifyApplication";
import FavoriteJobView from "./pages/FavoriteJobPage";
function App() {
  const cookies = new Cookies();
  const [authToken, setAuthToken] = useState(cookies.get("authToken")); // Use state to track authToken
  const [student, setStudent] = useState(null);
  const [alumni, setAlumni] = useState(null);

  // Callback function to update authToken when a user signs in
  const handleSignIn = (newAuthToken) => {
    setAuthToken(newAuthToken);
  };

  useEffect(() => {
    async function getStudentOrAlumniId() {
      try {
        // First API call to verify the token and obtain the student ID
        const tokenResponse = await fetch(
          `http://127.0.0.1:8000/api/token?token=${authToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!tokenResponse.ok) {
          throw new Error("Network response for token verification was not ok");
        }

        const tokenData = await tokenResponse.json();

        if (tokenData.student_id) {
          // Second API call to fetch student data based on the obtained student ID
          const studentResponse = await fetch(
            `http://127.0.0.1:8000/user/api/student/${tokenData.student_id}`
          );

          if (!studentResponse.ok) {
            throw new Error("Network response for student data was not ok");
          }

          const studentData = await studentResponse.json();
          setStudent(studentData.student);
          console.log(studentData);
        } else if (tokenData.alumni_id) {
          const AlumniResponse = await fetch(
            `http://127.0.0.1:8000/user/api/alumni/${tokenData.alumni_id}`
          );
          if (!AlumniResponse.ok) {
            throw new Error("Network response for alumni data was not ok");
          }
          const alumniData = await AlumniResponse.json();
          setAlumni(alumniData.alumni);
          console.log(alumniData);
        } else {
          console.error(
            "Student ID not found in the token verification response"
          );
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    getStudentOrAlumniId();
  }, [authToken]);

  return (
    <Router>
      <div>
        <Navbar student={student} alumni={alumni}/>
        <Container maxWidth="lg">
          <Routes>
            <Route
              path="/profile"
              element={
                <UserProfile
                  token={authToken}
                  alumni={alumni}
                  student={student}
                />
              }
            />
            <Route path="/job-posts" element={<JobPosts token={authToken} />} />
            <Route
              path="/job-posts/:jobId"
              element={
                <JobDetail
                  token={authToken}
                  alumni={alumni}
                  student={student}
                />
              }
            />
            <Route
              path="/application/:jobId"
              element={<SubmitApplication token={authToken} />}
            />
            <Route
              path="/application"
              element={<ApplicationView token={authToken} />}
            />
            <Route
              path="/change-application/:applicationId"
              element={<ModifyApplication token={authToken} />}
            ></Route>
            <Route
              path="/favorite-jobs"
              element={<FavoriteJobView token={authToken} />}
            ></Route>
            <Route
              path="/sign-in"
              element={<SignInForm onSignIn={handleSignIn} />}
            />{" "}
            {/* call back function  */}
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
