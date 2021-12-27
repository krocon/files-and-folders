import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // {path: '', component: MainComponent},
  {
    path: "files",
    loadChildren: () =>
      import("./fnf-file/files.module").then(m => m.FilesModule)
  },
  {
    path: "setup",
    loadChildren: () =>
      import("./fnf-setup/setup.module").then(m => m.SetupModule)
  },
  {
    path: "customcss",
    loadChildren: () =>
      import("./fnf-custom-css/custom-css.module").then(m => m.CustomCssModule)
  },
  {
    path: "about",
    loadChildren: () =>
      import("./fnf-about/about.module").then(m => m.AboutModule)
  },
  {
    path: "queue",
    loadChildren: () =>
      import("./fnf-queue/queue.module").then(m => m.QueueModule)
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./fnf-edit/edit.module").then(m => m.EditModule)
  },
  {
    path: "**",
    redirectTo: "files"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
