import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../registration.service';
import { RegistrationService } from '../registration.service';
import { CheckInService } from '../checkin.service';
import { CheckIn } from '../checkIn';
import { provideImageKitLoader } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent {

  form2 = this.formBuilder2.group({
    pid: '',
  });

  constructor(
    private checkInService: CheckInService,
    private formBuilder2: FormBuilder,
  ) {}



  onSubmit(): void {
    let form2 = this.form2.value;
    let pid = parseInt(form2.pid ?? "");

    if (pid.toString().length !== 9) {
      window.alert(`Invalid PID: ${pid}`);
    }
    else {
      this.checkInService
      .createCheckIn(pid)
      .subscribe({
        next: (checkIn) => this.onSuccess(checkIn),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(checkIn: CheckIn): void {
    window.alert(`Thanks for checking in: ${checkIn.user.first_name} ${checkIn.user.last_name}`);
    this.form2.reset();
  }

  private onError(err: HttpErrorResponse) {
    if (err.error.detail) {
      window.alert(err.error.detail);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

}