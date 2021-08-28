import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.user = userService.loggedUser;
  }

  ngOnInit() {
    if (this.userService.loggedUser === undefined) {
      this.router.navigate(['/user/login']);
    } else {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has('userId')) {
          return;
        }
        const userId = paramMap.get('userId');
        this.user = this.userService.getUser(userId);
      });
    }
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/user/login']);
  }
}
