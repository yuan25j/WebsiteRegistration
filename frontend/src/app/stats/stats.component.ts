import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckIn } from '../checkIn';
import { CheckInService } from '../checkin.service';
import { RegistrationService, User } from '../registration.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})


export class StatsComponent {

  public users$: Observable<User[]>;
  public checkins$: Observable<CheckIn[]>;
  public registrationService: RegistrationService
  public checkInService: CheckInService

  constructor(registrationService: RegistrationService, checkInService: CheckInService) {
    this.users$ = registrationService.getUsers()
    this.checkins$ = checkInService.getCheckins()
    this.registrationService = registrationService
    this.checkInService = checkInService
  }

  remove_user(pid: number): void {
    this.registrationService.deleteUser(pid).subscribe({
      next: (user) => this.onSuccess(),
      error: (err) => this.onError(err)})
  }
  private onSuccess(): void {
    this.users$ = this.registrationService.getUsers()
    this.checkins$ = this.checkInService.getCheckins()
    window.alert(`Deleted User`);
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert("Unknown error: " + JSON.stringify(err));
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }
}