import { useState, useEffect } from 'react'
import Entries from './components/Entries'
import { DiaryEntry, NewDiaryEntry } from './types'
import diaryService from './services/diaryService'
import NewEntry from './components/NewEntry'
import axios from 'axios'
import Notification from './components/Notification'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const response = await diaryService.getDiaries();
      setEntries(response);
    }

    fetchData();

  }, [])

  const addDiaryEntry = async (entry: NewDiaryEntry): Promise<void> => {
    try {
      const newEntry = await diaryService.postEntry(entry);
      setEntries(entries.concat(newEntry));
    } catch (error) {
      setShowNotification(true);
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data);

        setTimeout((): void => {
          setShowNotification(false);
          setNotification(null);
        }, 5000)
      }

    }
  }

  return (
    <>
      <h1> add new entry </h1>
      {showNotification ? <Notification notification={notification} /> : null}
      <NewEntry onAdd={addDiaryEntry} />
      <Entries diaries={entries} />
    </>
  )
}
export default App
