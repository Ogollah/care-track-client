import { Route, Routes, useParams } from "react-router-dom";
import Login from "./features/auth/login";
import Patients from "./features/users/patients";
import Patient from "./features/users/patient";
import PatientRegistration from "./features/users/patientRegistration";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/registration" element={<PatientRegistration />} />
      <Route path="/patient/:id" element={<PatientPage />} />
    </Routes>
  );
}

function PatientPage() {
  const { id } = useParams();
  return <Patient id={id} />;
}

export default App;
