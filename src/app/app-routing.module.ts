import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'rooms',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./rooms/rooms.module').then((m) => m.RoomsPageModule),
      },
      {
        path: ':roomsId',
        loadChildren: () =>
          import('./rooms/room/room.module').then((m) => m.RoomPageModule),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./rooms/add/add.module').then((m) => m.AddPageModule),
      },
      {
        path: ':roomsId/edit',
        loadChildren: () =>
          import('./rooms/edit/edit.module').then((m) => m.EditPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
