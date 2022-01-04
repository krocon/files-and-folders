import {ValueFormatterParams} from "ag-grid-community/dist/lib/entities/colDef";

export function colorCellRenderer(params: ValueFormatterParams) {
  if (!params || !params.data || !params.value) return "";

  return "<div class=\"w-full h-full\" style=\"width:200px;background-color:" + params.value + "\">&nbsp;<div>";
}
