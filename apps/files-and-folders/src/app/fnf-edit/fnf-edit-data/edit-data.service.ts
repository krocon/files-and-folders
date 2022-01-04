import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TypedDataService} from "../../common/typed-data.service";
import {EditFileData} from "./edit-file.data";
import {EditData} from "./edit.data";
import {MemoryCacheService} from "../../common/fnf-memory-cache/memory-cache.service";

@Injectable({
  providedIn: "root"
})
export class EditDataService {

  private static readonly innerService =
    new TypedDataService<EditData>(
      "editor",
      new EditData(0, [])
    );

  private static readonly config = {
    getFile: "api/file?name=",
    saveFile: "api/file?name="
  };
  public readonly valueChanges$ = EditDataService.innerService.valueChanges$;
  private readonly innerService = EditDataService.innerService;

  constructor(
    private readonly fileContentCache: MemoryCacheService<string>,
    private readonly httpClient: HttpClient
  ) {
  }

  static forRoot(config: { [key: string]: string }) {
    Object.assign(EditDataService.config, config);
  }

  getCachedFileContent(key: string): string {
    return this.fileContentCache.getEntry(key);
  }

  setFileContent2Cache(key: string, text: string): void {
    this.fileContentCache.addEntry(key, text);
  }

  removeFromCache(key: string): void {
    this.fileContentCache.removeEntry(key);
  }

  public addFile(filename: string): number {
    const editData = this.innerService.getValue();
    if (editData !== null) {
      const editFileData = new EditFileData(filename, false, false);
      const idx = editData.files.push(editFileData);
      this.innerService.update(editData);
      return idx;
    }
    return -1;
  }

  public update(editData: EditData): void {
    this.innerService.update(editData);
  }

  public getEditData(index: number): EditFileData | undefined {
    const editData = EditDataService.innerService.getValue();
    return editData?.files[index];
  }

  public readFile(
    idx: number,
    callback: (editFileData: EditFileData, editData: EditData, text: string) => void): void {

    const editData = EditDataService.innerService.getValue();
    if (editData) {
      const editFileData = editData.files[idx];
      editFileData.loading = true;

      const subscription = this.httpClient
        .get(
          EditDataService.config.getFile + editFileData.file,
          {responseType: "text"}
        )
        .subscribe(txt => {
          this.fileContentCache.addEntry(editFileData.file, txt);
          editFileData.loading = false;
          editFileData.unsaved = false;
          this.innerService.update(editData);
          if (callback) {
            callback(editFileData, editData, txt);
          }
          subscription.unsubscribe();
        });
    }
  }

  public saveFile(
    editFileData: EditFileData,
    text: string,
    callback: (editFileData: EditFileData) => void): void {

    editFileData.loading = true;
    this.fileContentCache.addEntry(editFileData.file, text);

    const subscription = this.httpClient
      .post(
        EditDataService.config.saveFile + editFileData.file,
        text,
        {responseType: "text"}
      )
      .subscribe(txt => {
        editFileData.loading = false;
        editFileData.unsaved = false;

        if (callback) {
          callback(editFileData);
        }
        subscription.unsubscribe();
      });
  }


  public closeFile(editFileData: EditFileData, editData: EditData) {
    const idx = editData.files.indexOf(editFileData);
    if (idx > -1) {
      this.removeFromCache(editFileData.file);
      editData.files.splice(idx, 1);
      this.innerService.update(editData);
    }
  }

  public getValue(): EditData {
    if (this.innerService.getValue() === null) {
      this.innerService.update(new EditData(0, []));
    }
    return this.innerService.getValue() as EditData;
  }


}
