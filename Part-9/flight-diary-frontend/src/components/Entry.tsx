import { DiaryEntry } from "../types";

const Entry = (props: DiaryEntry) => {
  return (
    <div>
      <h3>{props.date}</h3>
      visibility: {props.visibility} <br />
      weather: {props.weather}
    </div>
  )
}

export default Entry
