import {ColDef, ColGroupDef} from "ag-grid-community";
import {colorCellRenderer} from "./color-cellrenderer";


export const customCssTableColumnDefs = [
  {
    cellClass: "cell-col-0",
    checkboxSelection: true,
    width: 40
  },
  {
    field: "area",
    headerName: "Area",
    sort: "asc",
    cellClass: "cell-col-0",
    width: 100
  },
  {
    field: "type",
    width: 100,
    sort: "asc"
  },
  {
    field: "cssKey",
    headerName: "Key  ",
    width: 300
  },
  {
    field: "cssColor",
    headerName: "Value  ",
    width: 300
  },
  {
    field: "cssColor",
    headerName: "Sample  ",
    width: 250,
    cellClass: "flex flex-grow",
    cellRenderer: colorCellRenderer
  }
] as (ColDef | ColGroupDef)[];
