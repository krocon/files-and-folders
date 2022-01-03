import {Injectable} from "@nestjs/common";
import * as os from "os";
import * as process from "process";

import {exec} from "child_process";
import {from, Observable} from "rxjs";
import {Sysinfo, SysinfoIf} from "@fnf/fnf-data";
import {SysInfoCallbackFn} from "./sysInfo-callback.fn";

const env = process.env;
const FNF_START_PATH = env.FNF_START_PATH;
const FNF_CONTAINER_PATHS = env.FNF_CONTAINER_PATHS;
const platform = os.platform();

@Injectable()
export class SysinfoService {
  private systemInfo: SysinfoIf;

  /**
   *
   * @param cb  callback(error, {
                    type: 'Windows_NT',
                    platform: 'win32',
                    arch: 'x64',
                    linux: false,
                    osx: false,
                    windows: true,
                    smartMachine: false,
                    hostname: 'DEFRAWS123456',
                    username: 'krocon',
                    homedir: 'C:\\Users\\krocon',
                    tmpdir: 'C:\\Users\\krocon\\AppData\\Local\\Temp'
                })
   * @returns {*}
   */
  getSystemInfo(cb: SysInfoCallbackFn): void {
    if (this.systemInfo) {
      return cb(null, this.systemInfo);
    }


    const ret = new Sysinfo();
    ret.type = os.type();
    ret.platform = platform;
    ret.arch = os.arch();
    ret.linux = platform.indexOf("linux") === 0;
    ret.osx = platform === "darwin";
    ret.windows = platform.indexOf("win") === 0;
    ret.smartMachine = platform === "sunos";
    ret.hostname = os.hostname();
    ret.username = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
    ret.homedir = os.homedir().replace(/\\/g, "/");
    ret.tmpdir = os.tmpdir().replace(/\\/g, "/");

    if (ret.username) {
      return cb(null, ret);
    }

    if (ret.osx || ret.linux) {
      exec("id -un", (err, stdout) => {
        ret.username = stdout.trim();
        this.systemInfo = ret;
        cb(err, ret);
      });
    } else if (ret.windows) {
      exec("whoami", { encoding: "utf8" }, (err, stdout) => {
        ret.username = stdout.trim().replace(/^.*\\/, ""); // xyz\user -> user

        this.systemInfo = ret;
        cb(err, ret);
      });
    } else {
      this.systemInfo = ret;
      cb(null, ret);
    }
  }

  getSystemInfoPromise(): Promise<SysinfoIf> {
    return new Promise<SysinfoIf>((resolve, reject) => {
      this.getSystemInfo((err, info) => {
        if (err) {
          return reject(err);
        }
        resolve(info);
      });
    });
  }

  getData(): Observable<SysinfoIf> {
    return from(this.getSystemInfoPromise());
  }

  getFirstStartFolder(): string {
    const homeDir = os.homedir()?.replace(/\\/g, "/");
    const win = platform.indexOf("win") === 0;
    return FNF_START_PATH ? FNF_START_PATH :
      FNF_CONTAINER_PATHS ? FNF_CONTAINER_PATHS.split(',')[0] :
        win ? homeDir :
          '/';
  }
}
