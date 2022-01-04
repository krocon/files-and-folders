import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutModule} from "@angular/cdk/layout";
import {AppRoutingModule} from "./app-routing.module";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {MainMenuModule} from "./fnf-main-menu/main-menu.module";
import {CommandModule} from "./service/fnf-command/command.module";

const config: SocketIoConfig = {
  url: "http://localhost:3334",
  options: {
    reconnection: true,
    autoConnect: true
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MainMenuModule,
    CommandModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
