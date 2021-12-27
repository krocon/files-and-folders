import { DynamicModule, Logger, Module } from "@nestjs/common";
import { DrivesService } from "./drives.service";
import { DrivesController } from "./drives.controller";

@Module({
  controllers: [
    DrivesController
  ]
})
export class DrivesModule {

  public static forRoot(restrictedPaths: string[] | undefined): DynamicModule {
    if (restrictedPaths) {
      DrivesService.restrictedPaths = restrictedPaths;
      Logger.log("DrivesService.restrictedPaths -> " + DrivesService.restrictedPaths);
    }
    return {
      module: DrivesModule,
      providers: [
        DrivesService
      ]
    };
  }

}
