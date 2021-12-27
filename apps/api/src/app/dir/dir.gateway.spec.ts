import { Test } from "@nestjs/testing";
import { DirGateway } from "./dir.gateway";

import { Socket, SocketIoConfig } from "ngx-socket-io";
import { INestApplication } from "@nestjs/common";
import { DirEvent, DirPara, FileItem, FilePara } from "@fnf/fnf-data";
import * as fse from "fs-extra";
import { unpack } from "../file-action/action/unpack.fn";

const config: SocketIoConfig = {
  url: "http://localhost:3334",
  options: { autoConnect: false, reconnection: false }
};
const testDir = fse.existsSync("./test") ? "./test" : "../../test";

const prepareDemoFolder = async (): Promise<number> => {
  await fse.removeSync(testDir + "/demo");
  const para = new FilePara(
    new FileItem(testDir + "/", "demo.zip"),
    new FileItem(testDir + "/"),
    "unpack");

  return unpack(para);
};


describe("DirGateway", () => {

  let app: INestApplication;
  let dirGateway: DirGateway;
  let socket: Socket;


  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        DirGateway
      ]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    dirGateway = app.get(DirGateway);
  });

  afterAll(async () => {
    await fse.remove(testDir + "/demo");
  });

  describe("Reading dir", () => {

    it("Connecting...", (done) => {
      socket = new Socket(config);
      socket.on("connect", () => {
        done();
      });
      socket.connect();
    });

    it("Unpack demo folders...", (done) => {
      prepareDemoFolder().then(() => done());
    });

    it("Reading test/", (done) => {
      socket.on("dir123", (ev) => {
        socket.removeAllListeners("dir123");
        const received: DirEvent = ev;
        expect(received.size).toEqual(2);
        expect(received.action).toEqual("list");
        expect(received.dir).toEqual(testDir);
        expect(received.error).toEqual("");

        done();
      });
      socket.emit("dir", new DirPara(testDir, 'tab'+123, true));
    });

    it("Reading test/demo", (done) => {
      socket.on("dir124", (ev) => {
        socket.removeAllListeners("dir124");
        const received: DirEvent = ev;
        received.items.forEach(it => delete it.date); // datum wollen wir nicht vergleichen

        expect(received.size).toEqual(6);
        expect(received.action).toEqual("list");
        expect(received.dir).toEqual(testDir + "/demo");
        expect(received.error).toEqual("");
        expect(received.items).toHaveLength(6);
        expect(received).toEqual(
          {
            dir: testDir + "/demo",
            items: [
              {
                dir: testDir + "/demo",
                base: "a1",
                ext: "",
                error: "",
                size: null,
                isDir: true,
                abs: false
              },
              {
                dir: testDir + "/demo",
                base: "a2",
                ext: "",
                error: "",
                size: null,
                isDir: true,
                abs: false
              },
              {
                dir: testDir + "/demo",
                base: "a3",
                ext: "",
                error: "",
                size: null,
                isDir: true,
                abs: false
              },
              {
                dir: testDir + "/demo",
                base: "a4.txt",
                ext: ".txt",
                error: "",
                size: 4,
                isDir: false,
                abs: false
              },
              {
                dir: testDir + "/demo",
                base: "empty01",
                ext: "",
                error: "",
                size: null,
                isDir: true,
                abs: false
              },
              {
                dir: testDir + "/demo",
                base: "empty02",
                ext: "",
                error: "",
                size: null,
                isDir: true,
                abs: false
              }
            ],
            begin: true,
            end: true,
            size: 6,
            error: "",
            action: "list",
            panelIndex: 0
          }
        );

        done();
      });
      socket.emit("dir", new DirPara(testDir + "/demo", 'tab'+124, true));
    });

    /*
    it("Reading /", (done) => {
      socket.on("dir125", (ev) => {
        socket.removeAllListeners("dir125");
        const received: DirEvent = ev;
        received.items.forEach(it => delete it.date); // datum wollen wir nicht vergleichen
        expect(received.size).toEqual(6);
        done();
      });
      socket.emit("dir", new DirPara("/", 125, true));
    });
*/
    it("Disconnecting...", (done) => {
      socket.disconnect(true);
      // dirGateway.server.disconnectSockets(true);
      done();
    });

  });

});
