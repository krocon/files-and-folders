export class DirPara {

  private static RID = 1000;
  public rid: number;

  constructor(
    public path: string,
    public componentId: string = '',
    public nocache: boolean = true
  ) {
    this.rid = DirPara.RID++;
  }
}
