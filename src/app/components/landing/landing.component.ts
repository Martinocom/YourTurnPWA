import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, authState, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  isLoggedInCheckPerformed = false;
  isLoggedIn = false
  isRefreshAlreadyTriggered = false

  constructor(private auth: Auth, private router: Router) {
    if (auth) {
      console.log("Check user auth")
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.isLoggedInCheckPerformed = true
        this.isLoggedIn = isLoggedIn

        if (this.isLoggedIn) {
          this.isRefreshAlreadyTriggered = true
          this.onUserLoggedIn()
          console.log("Is logged!")
        }
      });

      
      if (this.isRefreshAlreadyTriggered == false) {
        if (this.user != null) {
          this.user.subscribe(user => {
            if (this.isRefreshAlreadyTriggered == false) {
              if (user != null) {
                // this.user.subscribe is valid
                this.onUserLoggedIn()
              } else {
                // subscribed user is null
                this.isLoggedIn = false
              }
            }
          })
        } else {
          // this.user is null
          this.isLoggedIn = false
        }
      }

    } else {
      console.log("No auth service is checking :(")
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async onLoginClick() {
    console.log("Inside dude!")
    const result = await signInWithPopup(this.auth, new GoogleAuthProvider());

    if (result != null && result.user != null) {
      this.onUserLoggedIn()
    }
  }

  onUserLoggedIn() {
    if (this.isLoggedIn == false) {
      this.isLoggedIn = true
      this.router.navigate(['dashboard'])
      console.log("Is logged in!")
    }
  }

}
