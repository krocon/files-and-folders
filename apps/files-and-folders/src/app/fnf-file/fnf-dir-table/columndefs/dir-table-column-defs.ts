import {ColDef, ColGroupDef} from "ag-grid-community";
import {nameComparator} from "./name-comparator";
import {sizeCellRenderer} from "./size-cellrenderer";
import {sizeComparator} from "./size-comparator";
import {dateCellRenderer} from "./date-cellrenderer";
import {dateComparator} from "./date-comparator";
import {nameCellRenderer} from "./name-cellrenderer";


export const dirTableColumnDefs = [
  {
    field: "base",
    headerName: "Name",
    cellRenderer: nameCellRenderer.bind(this),
    comparator: nameComparator.bind(this),

    sort: "asc",
    cellClass: "cell-col-0"
  },
  {
    field: "ext",
    width: 75,
    comparator: nameComparator.bind(this)
  },
  {
    field: "size",
    headerName: "Size  ",
    width: 130,
    cellRenderer: sizeCellRenderer.bind(this),
    comparator: sizeComparator.bind(this),
    headerClass: "ag-right-aligned-header",
    cellClass: "text-right"
  },
  {
    field: "date",
    headerName: "Date  ",
    width: 200,
    cellRenderer: dateCellRenderer.bind(this),
    comparator: dateComparator.bind(this),
    headerClass: ["ag-right-aligned-header"],
    cellClass: "text-right"
  }
] as (ColDef | ColGroupDef)[];
