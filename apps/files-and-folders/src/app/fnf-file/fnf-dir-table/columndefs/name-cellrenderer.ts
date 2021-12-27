import { ValueFormatterParams } from "ag-grid-community/dist/lib/entities/colDef";
import { DOT_DOT } from "./dot-dot";

export function nameCellRenderer(params: ValueFormatterParams) {
  if (!params || !params.data || !params.value) {
    return "";
  }

  if (params.data.abs) {
    // hit from a file search:
    return params.data.dir + "/" + params.data.base;
  }

  let label = params.value;
  const ext = params.data.ext;
  if (!params.data.isDir) label = params.value.replace(ext, "");

  if (params.data.isDir) {
    if (params.data.base === DOT_DOT) {
      return "<i class=\"fa fa-angle-left width-10px\"></i> [" + label + "]";
    }
    return "<i class=\"fa fa-folder\"></i> [" + label + "]";
  }

  // not a dir, it's a file:

  if (params.data.error && params.data.error.code === "EPERM") return "<span class=\"text-muted\"><i class=\"fa fa-file-alt\"></i> " + label + "</span>";

  if (ext.match(/\.signature$/)) return "<i class=\"fa fa-file-signature-o\"></i> " + label;
  if (ext.match(/\.csv$/)) return "<i class=\"fa fa-file-csv-o\"></i> " + label;
  if (ext.match(/\.doc(x)?$/)) return "<i class=\"fa fa-file-word-o\"></i> " + label;
  if (ext.match(/\.epub$|\.rtf$|\.txt$/)) return "<i class=\"fa fa-file-text-o\"></i> " + label;
  if (ext.match(/\.pdf$/)) return "<i class=\"fa fa-file-pdf-o\"></i> " + label;
  if (ext.match(/\.avi$|\.mkv$|\.wmv$|\.mp(e)?g$|\.mov$|\.ram$/)) return "<i class=\"fa fa-file-video-o\"></i> " + label;
  if (ext.match(/\.ppt(x)?$/)) return "<i class=\"fa fa-file-powerpoint-o\"></i> " + label;
  if (ext.match(/\.xls(x)?$/)) return "<i class=\"fa fa-file-excel-o\"></i> " + label;
  if (ext.match(/\.bmp$|\.gif$|\.jpg$/)) return "<i class=\"fa fa-file-image-o\"></i> " + label;
  if (ext.match(/\.js$|\.java$|\.json$/)) return "<i class=\"fa fa-file-code-o\"></i> " + label;
  if (ext.match(/\.zip$|\.rarp$|\.7z$/)) return "<i class=\"fa fa-file-archive-o\"></i> " + label;
  if (ext.match(/\.mp3$|\.wav$/)) return "<i class=\"fa fa-file-audio-o\"></i> " + label;

  return "<i class=\"fa fa-file-o\"></i> " + label;
}
