import { Controller, Get, Post } from "@nestjs/common";
import { DrivesService } from "./drives.service";
import { Observable } from "rxjs";
import { MessageBody } from "@nestjs/websockets";
import { DirPara } from '@fnf/fnf-data';


@Controller()
export class DrivesController {
  constructor(private readonly drivesService: DrivesService) {
  }

  @Get("drives")
  getData(): Observable<string[]> {
    return this.drivesService.getData();
  }

  @Post("exists")
  exists(@MessageBody() para: DirPara): boolean {
    return this.drivesService.exists(para.path);
  }

  @Post("checkpath")
  checkPath(@MessageBody() para: DirPara): string {
    return this.drivesService.checkPath(para.path);
  }
}
