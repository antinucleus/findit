import {create} from 'zustand';

import {createBoxArray, calculateBoxSizes} from '@/utils';

type State = {
  rowCount: number;
  columnCount: number;
  rowArray: number[];
  columnArray: number[];
  selectableBoxCount: number;
  selectedIds: string[];
  boxHeight: number;
  boxWidth: number;
  boxMargin: number;
};

type SetRowsColumns = {
  rowCount: number;
  columnCount: number;
  selectableBoxCount: number;
  boxMargin: number;
};

type Actions = {
  setRowsColumns: ({
    rowCount,
    columnCount,
    selectableBoxCount,
    boxMargin,
  }: SetRowsColumns) => void;
  reset: () => void;
};

const initialState: State = {
  rowCount: 0,
  columnCount: 0,
  selectableBoxCount: 0,
  rowArray: [],
  columnArray: [],
  selectedIds: [],
  boxHeight: 0,
  boxWidth: 0,
  boxMargin: 0,
};

export const useBox = create<State & Actions>(set => ({
  ...initialState,
  setRowsColumns: ({
    rowCount,
    columnCount,
    selectableBoxCount,
    boxMargin,
  }: SetRowsColumns) => {
    const [rowArray, columnArray, selectedIds] = createBoxArray({
      rowCount,
      columnCount,
      selectableBoxCount,
    });
    const size = calculateBoxSizes(columnCount, boxMargin);

    set({
      rowArray,
      columnArray,
      selectableBoxCount,
      selectedIds,
      boxWidth: size,
      boxHeight: size,
      boxMargin,
    });
  },
  reset: () => {
    set(initialState);
  },
}));
