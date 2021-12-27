import {Injectable} from "@nestjs/common";
import {Config} from "@fnf/fnf-data";


@Injectable()
export class ConfigService {

  static config: Config = new Config();

  getData(): Config {
    return ConfigService.config;
  }

  hasRestrictedContainerPaths(): boolean {
    return !!ConfigService.config.containerPaths.length;
  }

  getRestrictedContainerPaths(): string[] {
    return ConfigService.config.containerPaths;
  }

  hasIncompatiblePaths(): boolean {
    return !!ConfigService.config.incompatiblePaths.length;
  }

  getIncompatiblePaths(): string[] {
    return ConfigService.config.incompatiblePaths;
  }


}
