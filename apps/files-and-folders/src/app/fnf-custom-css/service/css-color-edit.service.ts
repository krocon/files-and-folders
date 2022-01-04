import {Injectable} from "@angular/core";
import {LookAndFeelData} from "../../service/fnf-look-and-feel/look-and-feel.data";
import {CustomCssItem} from "../data/custom-css-item.data";
import {customCcsKeys} from "../data/custom-ccs-key.type";
import {CssArea, cssAreas} from "../data/css-area.type";
import {CssType} from "../data/css-type.type";


@Injectable({
  providedIn: "root"
})
export class CssColorEditService {


  buildTableRows(lookAndFeelData: LookAndFeelData): CustomCssItem[] {
    const tableRows: CustomCssItem[] = [];
    customCcsKeys.forEach(k => {
      let cssArea: CssArea = "base";
      cssAreas.forEach(a => {
        if (k.indexOf("-" + a + "-") > -1) cssArea = a;
      });
      const cssType: CssType = k.indexOf("-material-") > -1 ?
        "material" : k.indexOf("-border-") > -1 ?
          "border" : k.indexOf("-bg-") > -1 ?
            "background" : "foreground";
      const cssColor = (cssType === "foreground") ? "#000" : "#fff";
      const item = new CustomCssItem(cssArea, cssType, k, cssColor);
      tableRows.push(item);
    });

    const colors = lookAndFeelData?.colors;
    if (colors) {
      for (const key in colors) {
        const value = colors[key];
        const item = this.findItemByKey(key, tableRows);
        if (item) {
          item.cssColor = value;
        } else {
          console.error("Error in buildTableRows(). Item not found by ", key);
        }
      }
    }
    return tableRows;
  }

  private findItemByKey(key: string, tableRows: CustomCssItem[]): CustomCssItem | undefined {
    for (let i = 0; i < tableRows.length; i++) {
      const tableRow = tableRows[i];
      if (tableRow.cssKey === key) return tableRow;
    }
    return undefined;
  }

  private clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }
}
