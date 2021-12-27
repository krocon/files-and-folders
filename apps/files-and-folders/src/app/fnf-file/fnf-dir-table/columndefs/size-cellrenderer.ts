import { ValueFormatterParams } from "ag-grid-community/dist/lib/entities/colDef";

export function sizeCellRenderer(params: ValueFormatterParams) {
  if (!params) return "";
  if (!params.data) return "";
  if (params.data.status === "temp") return "-";
  if (!params.value) {
    if (params.data.isDir) return "&lt;DIR&gt;";
    return "?";
  }
  return params.value.toLocaleString("en-US", { minimumFractionDigits: 0 }); // todo anders formatieren?
}
