import { HealthCheckEntry } from "../../types";


interface Props {
  entry: HealthCheckEntry;
}
const HealthCheck = ({ entry }: Props) => {

  return (
    <div>
      Healthcheck rating: {entry.healthCheckRating}
    </div>
  );
};

export default HealthCheck;
