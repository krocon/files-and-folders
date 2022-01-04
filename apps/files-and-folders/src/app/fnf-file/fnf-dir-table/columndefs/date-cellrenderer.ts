import {ValueFormatterParams} from "ag-grid-community/dist/lib/entities/colDef";

// const dateTimeFormat = new Intl.DateTimeFormat('de-DE');

export function dateCellRenderer(params: ValueFormatterParams) {
  if (!params?.value) return "";
  const s = params.value.split(".")[0].replace(/T/g, "&nbsp;&nbsp;");
  const idx = s.lastIndexOf(":");
  return s.substr(0, idx) + "<small>" + s.substr(idx, 3) + "</small>";
  // return dateTimeFormat.format(new Date(params.value));

}
