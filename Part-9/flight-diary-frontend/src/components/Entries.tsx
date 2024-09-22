import Entry from "./Entry"
import { DiaryEntries } from "../types"

const Entries = (props: DiaryEntries) => {

  return (
    <div>
      <h1>Diary entries</h1>
      {
        props.diaries.map(d => (
          <div key={d.id}><Entry id={d.id} date={d.date} visibility={d.visibility} weather={d.weather} /></div >
        ))
      }
    </div>
  )
}

export default Entries
