import { Patient, Entry, Diagnosis } from "../../types";
import { getPatient } from "../../services/patients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hospital from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHeatlhcareEntry";
import HealthCheck from "./HealthCheckEntry";
import { Box, Typography, } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async (): Promise<void> => {
      if (id !== undefined) {
        const pat = await getPatient(id);
        setPatient(pat);
      }
    };
    void fetchPatient();
  }, [id]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryType = (e: Entry) => {
    switch (e.type) {
      case "Hospital":
        return <Hospital entry={e} />;

      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={e} />;

      case "HealthCheck":
        return <HealthCheck entry={e} />;

      default:
        return assertNever(e);
    }
  };

  return (
    <div>
      <Box marginTop={5}>
        <Typography align="left" variant="h4">{patient?.name}</Typography>
        <Typography marginTop={2} align="left" variant="body1">
          Gender: {patient?.gender} <br />
          Date of Birth: {patient?.dateOfBirth} <br />
          Occupation: {patient?.occupation} <br />
          Social security number: {patient?.ssn} <br />
        </Typography>


        <Typography marginTop={2} marginBottom={2} align="left" variant="h5">Entries</Typography>



        {patient?.entries.map((e: Entry) => (
          <div key={e.id}>
            <Box border={2} color={"black"} marginTop={2} padding={1}>
              {e.date} <br />
              {e.description} <br />
              <ul>
                {e.diagnosisCodes?.map((code: string) => {
                  const diagExpl = diagnoses.find((d: Diagnosis) => d.code === code);
                  return (
                    <li>{code} : {diagExpl?.name} </li>
                  );
                })}
              </ul>
              {EntryType(e)}

              diagnosed by: <strong>{e.specialist}</strong>
            </Box>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;
