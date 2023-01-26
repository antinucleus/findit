let ROWS = 4; // Number of boxes in horizontally
let COLUMNS = 4; // Number of boxes in vertically
let SELECTABLE_BOX_COUNT = 7; // Number of box count will be selected
let MAX_ID = ROWS * COLUMNS; // Maximum number of boxes that will be selected

type Parameters = {
  rowCount: number;
  columnCount: number;
  selectableBoxCount: number;
};

export const createBoxArray = (
  values?: Parameters,
): [row: number[], column: number[], selectedIds: string[]] => {
  if (values) {
    const {rowCount, columnCount, selectableBoxCount} = values;
    ROWS = rowCount;
    COLUMNS = columnCount;
    SELECTABLE_BOX_COUNT = selectableBoxCount;
    MAX_ID = rowCount * columnCount;
  }

  const rowArray: number[] = Array.from(Array(ROWS), (_, i) => i + 1);
  const columnArray: number[] = Array.from(Array(COLUMNS), (_, i) => i + 1);

  const allIds: string[] = [];

  columnArray.forEach(c => {
    rowArray.forEach(p => {
      let id = String(c).concat(String(p));
      allIds.push(id);
    });
  });

  const selectedIds: string[] = [];

  while (selectedIds.length < SELECTABLE_BOX_COUNT) {
    const n = Math.floor(Math.random() * MAX_ID);
    const item = allIds[n];

    if (!selectedIds.includes(item)) {
      selectedIds.push(item);
    }
  }
  return [rowArray, columnArray, selectedIds];
};
