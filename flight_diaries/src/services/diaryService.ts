import diaryData from '../../data/entries';
import { DiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;

};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};