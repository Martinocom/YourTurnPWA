import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUpdateAvailable = false
  isUpdateServiceInactive = false
  countdown = 30

  constructor(updates: SwUpdate) {
    if (updates.isEnabled) {
      updates.available.subscribe(event => {
        this.isUpdateAvailable = true 
        updates.checkForUpdate()
        updates.activateUpdate().then(() => { document.location.reload() })

        let intervalId = setInterval(() => {
          this.countdown = this.countdown - 1;
          if(this.countdown === 0) {
            clearInterval(intervalId)
            updates.checkForUpdate()
            updates.activateUpdate().then(() => { document.location.reload() })
          }
        }, 1000)
      })
    } else {
      this.isUpdateAvailable = true
    }
  }
}
