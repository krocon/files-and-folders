import {RowNode} from "ag-grid-community/dist/lib/entities/rowNode";

export function dateComparator(value1: any, value2: any, row1: RowNode, row2: RowNode, isInverted: boolean) {
  const f = isInverted ? -1 : 1;

  if (!row1) return f;
  if (!row2) return -f;

  if (!value1) value1 = "";
  if (!value2) value2 = "";

  if (!row1.data) return f;
  if (!row2.data) return -f;

  if (row1.data.isDir && !row2.data.isDir) return -f * 10;
  if (!row1.data.isDir && row2.data.isDir) return f * 10;

  const u1 = value1.toUpperCase();
  const u2 = value2.toUpperCase();

  if (row1.data.isDir && row2.data.isDir) return u1.localeCompare(u2);

  return u1.localeCompare(u2);
}
