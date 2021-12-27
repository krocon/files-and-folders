import { Component, OnInit } from "@angular/core";
import { SysinfoService } from "../service/fnf-sysinfo/sysinfo.service";
import { takeWhile } from "rxjs/operators";
import { Sysinfo, SysinfoIf } from "@fnf/fnf-data";

@Component({
  selector: "fnf-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {

  sysinfo: SysinfoIf = new Sysinfo();
  private alive = true;

  constructor(
    private readonly sysinfoService: SysinfoService
  ) {
  }

  ngOnInit(): void {
    this.sysinfoService
      .getSysinfo()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(
        sysinfo => {
          this.sysinfo = sysinfo;
        });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
