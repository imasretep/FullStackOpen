export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export interface DiaryEntries {
  diaries: DiaryEntry[];
}

export interface DiaryEntry {
  id: string;
  date: string;
  visibility: Visibility;
  weather: Weather;
}

export interface NewDiaryEntry {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export interface NewEntryProps {
  onAdd: (entry: NewDiaryEntry) => void;
}

export interface NotificationProps {
  notification: string | null;
}
