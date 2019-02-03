import {
  Component,
  OnInit,
  EventEmitter,
  Output
  // OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.sass']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  // authSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(
    //   authStatus => {
    //     this.isAuth = authStatus;
    //   }
    // );
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}
