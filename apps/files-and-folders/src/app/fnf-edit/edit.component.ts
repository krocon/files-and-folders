import { Component, OnInit } from "@angular/core";
// Imports are important! You may configure it via `angular.json` as well.
import "brace";
import "brace/mode/sql";
import "brace/theme/eclipse";
import { ActivatedRoute, Router } from "@angular/router";
import { EditDataService } from "./fnf-edit-data/edit-data.service";
import { EditFileData } from "./fnf-edit-data/edit-file.data";
import { EditData } from "./fnf-edit-data/edit.data";

@Component({
  selector: "fnf-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {

  public text = "...";
  public loadedText = "...";
  public options = { maxLines: 1000, printMargin: false };
  public index = -1;
  private editFileData?: EditFileData;
  private editData: EditData = new EditData(0, []);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly editDataService: EditDataService
  ) {

  }

  get unsaved(): boolean {
    return !!this.editFileData?.unsaved;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.index = parseInt(params["idx"], 10);
      this.editData = this.editDataService.getValue();
      this.editFileData = this.editData.files[this.index];

      this.text = this.editDataService.getCachedFileContent(this.editFileData?.file);

      if (!this.text) {
        this.editDataService.readFile(
          this.index,
          (editFileData, editData, text) => {
            this.editFileData = editFileData;
            this.editData = editData;
            this.text = text;
            this.loadedText = text;
            this.editDataService.update(editData);
          });
      }
    });
  }

  onTextChanged(txt: string) {
    if (this.editFileData && this.loadedText !== txt) {
      this.editFileData.unsaved = true;
      this.editDataService.setFileContent2Cache(this.editFileData.file, this.text);
      this.editDataService.update(this.editData);
    }
  }

  onCancelClicked($event: MouseEvent) {
    if (this.editFileData) {
      this.editFileData.unsaved = false;
      this.editFileData.loading = false;
      this.editDataService.closeFile(this.editFileData, this.editData);
      this.router.navigate(["file"]);
    }
  }

  onSaveClicked($event: MouseEvent) {
    if (this.editFileData) {
      this.editDataService.saveFile(
        this.editFileData,
        this.text,
        (editFileData) => {
          this.editFileData = editFileData;
        });
    }
  }

  private clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }
}
