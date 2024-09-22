import { CourseProps } from "../types";
import Part from "./Part"

const Courses = (props: CourseProps) => {
  return (
    <div>
      {
        props.courses.map((c) => (
          <div key={c.name}>
            <Part parts={c} />
          </div>
        ))
      }
    </div>
  );
};

export default Courses
