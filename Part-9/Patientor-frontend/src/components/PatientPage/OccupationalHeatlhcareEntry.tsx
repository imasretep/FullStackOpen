import { OccupationalHealthcareEntry } from "../../types";
import { Typography, } from '@mui/material';

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry }: Props) => {

  return (
    <div>
      <Typography align="left" variant="h6">Occupational Healthcare</Typography>
      <Typography align="left" variant="body1">
        Employer: {entry.employerName} <br />
        {entry.sickLeave ?
          <div>
            Sick Leave Start: {entry.sickLeave?.startDate} <br />
            Sick Leave End: {entry.sickLeave?.endDate} <br />
          </div>
          :
          null
        }
      </Typography>
    </div>
  );
};

export default OccupationalHealthcare;
