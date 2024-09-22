import { HospitalEntry } from "../../types";
import { Typography, } from '@mui/material';


interface Props {
  entry: HospitalEntry;
}

const Hospital = ({ entry }: Props) => {

  return (
    <div>
      <Typography align="left">Discharge</Typography>
      <Typography align="left" variant="body1">
        {entry.discharge.date} <br />
        {entry.discharge.criteria} <br />
      </Typography>
    </div>
  );
};

export default Hospital;
