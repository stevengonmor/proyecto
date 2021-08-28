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
    redirectTo: 'rooms',
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
      {
        path: 'reservations',
        loadChildren: () =>
          import('./rooms/reservation/reservation.module').then(
            (m) => m.ReservationPageModule
          ),
      },
      {
        path: ':roomsId/reservation/add',
        loadChildren: () =>
          import('./rooms/reservation/add/add.module').then(
            (m) => m.AddPageModule
          ),
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserPageModule),
      },
      {
        path: ':userId',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserPageModule),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./user/add/add.module').then((m) => m.AddPageModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./user/login/login.module').then((m) => m.LoginPageModule),
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
