import {RowNode} from "ag-grid-community/dist/lib/entities/rowNode";

export function sizeComparator(value1: any, value2: any, row1: RowNode, row2: RowNode, isInverted: boolean) {
  const f = isInverted ? -1 : 1;

  if (!row1) return f;
  if (!row2) return -f;

  if (!value1) value1 = 0;
  if (!value2) value2 = 0;

  if (!row1.data) return f;
  if (!row2.data) return -f;

  const u1 = row1.data.base;
  const u2 = row2.data.base;

  if (row1.data.isDir && !row2.data.isDir) return -f;
  if (!row1.data.isDir && row2.data.isDir) return f;

  // if (row1.favs.isDir && row2.favs.isDir) return u2 - u1;

  return value1 - value2;
}
