import { Injectable } from '@nestjs/common';
import * as os from 'os';

import { spawn } from 'child_process';
import { from, Observable, of } from 'rxjs';
import * as fse from 'fs-extra';
import * as path from 'path';
import { fixPath, VOLS_DIR } from '@fnf/fnf-data';

export type DrivesCallbackFn = (eror: number, sysinfo: string[]) => void;

@Injectable()
export class DrivesService {

  static restrictedPaths: string[];

  containerVols: string[];
  containerMode = false;


  constructor() {
    this.containerMode = this.exists(VOLS_DIR);
    if (this.containerMode) {
      try {
        const ffs = fse.readdirSync(VOLS_DIR);
        this.containerVols = ffs
          .filter(n => n.indexOf('.') === -1)
          .map(n => path.join(VOLS_DIR, '/', n));
      } catch (e) {
        // ignore
      }
    }
  }


  getData(): Observable<string[]> {
    if (this.containerVols?.length) {
      return of(this.containerVols);
    }
    return from(this.getDrivesPromise());
  }

  hasRestrictedPaths(): boolean {
    return !!DrivesService.restrictedPaths?.length;
  }

  exists(path: string) {
    try {
      return fse.existsSync(path);
    } catch (e) {
      try {
        // zip-Url?
        return fse.existsSync(path.split(':')[0]);
      } catch (e) {
        return false;
      }
    }
  }

  /**
   *
   * @param path  the path (if exists) , else the next possible path
   */
  checkPath(path: string): string {
    path = fixPath(path);

    while (path.length > 0) {
      if (this.exists(path)) {
        return path;
      }
      if (path.indexOf('/') > -1) {
        path = path.substr(0, path.lastIndexOf('/'));
      } else {
        return '/';
      }
    }
    return '/';
  }

  private getWinDrives(callback: DrivesCallbackFn) {
    if (os.platform().indexOf('win') !== 0) {
      return callback(null, []);
    } // for windows only.

    let stdout = '';
    const list = spawn('cmd');

    list.stdout.on('data', function(data) {
      stdout += data;
    });

    list.stderr.on('data', function(data) {
      console.error('stderr: ' + data);
    });

    list.on('exit', function(code) {
      if (code == 0) {
        let data = stdout.split('\r\n');
        data = data.splice(4, data.length - 7);
        data = data
          .map(Function.prototype.call, String.prototype.trim)
          .map(s => s + '/');
        callback(null, data);
      } else {
        callback(code, null);
      }
    });
    list.stdin.write('wmic logicaldisk get caption\n');
    list.stdin.end();
  }

  private getDrivesPromise(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.getWinDrives((err, info) => {
        if (err) {
          return reject(err);
        }
        resolve(info);
      });
    });
  }
}
