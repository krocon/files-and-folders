export class EditFileData {

  constructor(
    public file: string,
    public unsaved: boolean = false,
    public loading: boolean = true
  ) {
  }
}
