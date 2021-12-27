import { Injectable } from "@nestjs/common";
import { DirEvent, DirEventIf, DirPara, FileItem, fixPath, getZipUrlInfo, isZipUrl } from "@fnf/fnf-data";

import * as fs from "fs-extra";
import * as path from "path";
import { stats2FileItem } from "./stats-to-file";
import { unpacklist } from "../file-action/action/unpack-list.fn";

@Injectable()
export class DirService {


  readdir(para: DirPara): Promise<DirEvent[]> {
    const p = para.path;

    if (isZipUrl(p)) {
      const zipUrlInfo = getZipUrlInfo(p);

      return new Promise<DirEventIf[]>((resolve, reject) => {
        unpacklist(zipUrlInfo.zipUrl)
          .then(dirEvent => {
            return resolve([dirEvent]);
          }, error => reject(error));
      });

    } else {
      return new Promise<DirEventIf[]>((resolve, reject) => {

        const fileItems: FileItem[] = [];
        try {
          const files = fs.readdirSync(p);
          for (let idx = 0; idx < files.length; idx++) {
            const f = files[idx];
            const ff = path.join(p, "/", f);
            const fileItem = new FileItem(
              p,
              fixPath(f),
              path.extname(f),
              null
            );
            fileItems.push(fileItem);
            try {
              const stats = fs.statSync(ff);
              stats2FileItem(stats, fileItem);

            } catch (e) {
              fileItem.error = e;
              console.info("DirGateWay() stats error:", e.message);
            }
          } // for
          resolve([new DirEvent(p, fileItems, true, true, fileItems.length, "", "list")]);

        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    }
  }


}
