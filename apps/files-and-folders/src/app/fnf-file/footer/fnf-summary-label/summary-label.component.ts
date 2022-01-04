import {Component, Input} from "@angular/core";
import {PanelIndex} from "../../../service/fnf-page-data/data/panel-index";
import {SelectionLabelData} from "../../../service/fnf-page-data/data/selection-label.data";


@Component({
  selector: "fnf-summary-label",
  templateUrl: "./summary-label.component.html",
  styleUrls: ["./summary-label.component.scss"]
})
export class SummaryLabelComponent {

  @Input() selectionLabelData: SelectionLabelData = new SelectionLabelData();
  @Input() panelIndex: PanelIndex = 0;
  @Input() selected = false;

}
