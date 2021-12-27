import { Test } from "@nestjs/testing";

import { Socket, SocketIoConfig } from "ngx-socket-io";
import { INestApplication } from "@nestjs/common";
import { FileItem, FilePara, WalkData, WalkParaData } from "@fnf/fnf-data";
import * as fse from "fs-extra";
import { unpack } from "../file-action/action/unpack.fn";
import { WalkGateway } from "./walk.gateway";
import { SubscribeMessage } from "@nestjs/websockets";

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


describe("WalkGateway", () => {

  let app: INestApplication;
  let walkGateway: WalkGateway;
  let socket: Socket;


  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        WalkGateway
      ]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    walkGateway = app.get(WalkGateway);
  });

  afterAll((done) => {
    fse.removeSync(testDir + "/demo");
    done();
  });

  describe("Walking dir", () => {

    it("Unpack demo folders...", (done) => {
      prepareDemoFolder().then(() => done());
    });

    it("Connecting...", (done) => {
      socket = new Socket(config);
      socket.on("connect", () => {
        done();
      });
      socket.connect();
    });

    it("Walking test/demo", (done) => {
      socket.on("walk123", (ev) => {
        socket.removeAllListeners("walk123");

        const received: WalkData = ev;
        expect(received.folderCount).toEqual(12);
        expect(received.fileCount).toEqual(20);
        expect(received.last).toBeTruthy();

        done();
      });
      socket.emit("walkdir", new WalkParaData([testDir + "/demo"], "walk123", "cancelwalk123", 200));
    });


    it("Disconnecting...", (done) => {
      socket.disconnect(true);
      done();
    });

  });

});
