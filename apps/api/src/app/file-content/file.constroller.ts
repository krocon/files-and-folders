import { Controller, Get, Post, Query } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import { PlainBody } from "./plain-body";


@Controller("file")
export class FileController {


  // see http://localhost:3333/api/file?name=f:/leeching/_out/delete-empty.bat
  @Get("")
  getFile(@Query() query): string {
    const filename = query.name;
    return readFileSync(filename, { encoding: "utf-8" });
  }

  // see https://stackoverflow.com/questions/52283713/how-do-i-pass-plain-text-as-my-request-body-using-nestjs
  @Post("")
  async saveFile(@Query() query, @PlainBody() text: string) {
    const filename = query.name;
    writeFileSync(filename, text, { encoding: "utf-8" });
  }

}
