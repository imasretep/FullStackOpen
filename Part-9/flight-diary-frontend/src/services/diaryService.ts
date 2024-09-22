import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const BASE_URL = "http://localhost:3000/api/";

const getDiaries = async (): Promise<DiaryEntry[]> => {
  const res = await axios.get<DiaryEntry[]>(`${BASE_URL}diaries`);
  return res.data;
};

const postEntry = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  console.log(entry);
  const res = await axios.post<DiaryEntry>(`${BASE_URL}diaries`, entry);
  return res.data;
};

export default { getDiaries, postEntry };
