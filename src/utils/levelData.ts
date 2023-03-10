import {useScore} from '@/features/game/stores';

type RowsColumns = {
  rowCount: number;
  columnCount: number;
  selectableBoxCount: number;
  boxMargin: number;
};

export const levelData = (): RowsColumns => {
  const {score} = useScore.getState();

  switch (score) {
    case 0:
      return {
        rowCount: 2,
        columnCount: 2,
        selectableBoxCount: 2,
        boxMargin: 5,
      };
    case 1:
      return {
        rowCount: 2,
        columnCount: 3,
        selectableBoxCount: 3,
        boxMargin: 5,
      };
    case 2:
      return {
        rowCount: 3,
        columnCount: 3,
        selectableBoxCount: 5,
        boxMargin: 5,
      };
    case 3:
      return {
        rowCount: 3,
        columnCount: 3,
        selectableBoxCount: 6,
        boxMargin: 5,
      };
    case 4:
      return {
        rowCount: 4,
        columnCount: 3,
        selectableBoxCount: 7,
        boxMargin: 5,
      };
    case 5:
      return {
        rowCount: 4,
        columnCount: 4,
        selectableBoxCount: 8,
        boxMargin: 5,
      };
    case 6:
      return {
        rowCount: 4,
        columnCount: 4,
        selectableBoxCount: 9,
        boxMargin: 5,
      };
    case 7:
      return {
        rowCount: 5,
        columnCount: 4,
        selectableBoxCount: 10,
        boxMargin: 5,
      };
    case 8:
      return {
        rowCount: 5,
        columnCount: 4,
        selectableBoxCount: 12,
        boxMargin: 5,
      };
    case 9:
      return {
        rowCount: 5,
        columnCount: 4,
        selectableBoxCount: 13,
        boxMargin: 5,
      };
    case 10:
      return {
        rowCount: 4,
        columnCount: 5,
        selectableBoxCount: 14,
        boxMargin: 5,
      };
    case 11:
      return {
        rowCount: 4,
        columnCount: 5,
        selectableBoxCount: 15,
        boxMargin: 5,
      };
    case 12:
      return {
        rowCount: 5,
        columnCount: 5,
        selectableBoxCount: 15,
        boxMargin: 5,
      };
    case 13:
      return {
        rowCount: 5,
        columnCount: 5,
        selectableBoxCount: 16,
        boxMargin: 5,
      };
    case 14:
      return {
        rowCount: 5,
        columnCount: 5,
        selectableBoxCount: 18,
        boxMargin: 5,
      };
    default:
      return {
        rowCount: 0,
        columnCount: 0,
        selectableBoxCount: 0,
        boxMargin: 0,
      };
  }
};
