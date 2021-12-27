import { Module } from "@nestjs/common";
import { DirGateway } from "./dir.gateway";
import { DirService } from "./dir-service";
import { DirController } from "./dir.controller";


@Module({
  imports: [],
  controllers: [
    DirController
  ],
  providers: [
    DirGateway,
    DirService
  ],
  exports: [
    DirGateway
  ]
})
export class DirModule {
}
