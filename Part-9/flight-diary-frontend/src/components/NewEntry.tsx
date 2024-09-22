import { useState } from "react"
import { NewDiaryEntry, NewEntryProps, Visibility, Weather } from "../types";

const NewEntry = (props: NewEntryProps) => {
  const [newDate, setNewDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const styles = {
    display: 'flex',
    gap: '10px',
  }

  const submit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const newDiaryEntry: NewDiaryEntry = {
      date: newDate,
      visibility: visibility,
      weather: weather,
      comment: comment,
    }

    props.onAdd(newDiaryEntry);

    setNewDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>Date:
          <input type="date" value={newDate}
            onChange={(e): void => setNewDate(e.target.value)} />
        </div>

        <div style={styles}>Visibility:
          {Object.values(Visibility).map((v) => (
            <div key={v}>
              {v}
              <input
                key={v}
                type="radio"
                value={v}
                checked={visibility === v}
                onChange={(): void => setVisibility(v)} />
            </div>
          ))}
        </div>

        <div style={styles}>Weather:
          {Object.values(Weather).map((w) => (
            <div key={w}>
              {w}
              <input
                type="radio"
                value={w}
                checked={weather === w}
                onChange={(): void => setWeather(w)} />
            </div>
          ))}
        </div>

        <div>Comment:
          <input value={comment}
            onChange={(e): void => setComment(e.target.value)} />
        </div>

        <button>add</button>
      </form>
    </div >
  )
}
export default NewEntry
