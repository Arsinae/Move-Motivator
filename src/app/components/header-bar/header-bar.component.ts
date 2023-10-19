import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  @Output() sideNavClick: EventEmitter<null> = new EventEmitter();

  public user: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
  
  async logout() {
    await this.authService.disconnect();
    this.router.navigate(['/']);
  }

}
