import DetailedApplicationView from "./DetailedApplicationView";
import { useEffect, useState } from "react";

function ApplicationView({token}) {
  const [applications, setApplications] = useState([]);
  const ApplicationEndpoint = `http://127.0.0.1:8000/application/api/application`;

  useEffect(() => {
    // Fetch applications with authorization header
    async function fetchApplications() {
      try {
        const response = await fetch(ApplicationEndpoint, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setApplications(data.application);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    }
    fetchApplications();
  }, [token]);

  return (
    <div>
      <h1>Your Applications</h1>
      {applications.map((application) => (
        <DetailedApplicationView key={application.id} application={application} />
      ))}
    </div>
  );
}



export default ApplicationView;
