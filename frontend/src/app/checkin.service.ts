import { Injectable, ɵsetCurrentInjector } from '@angular/core';
import { CheckinRequest, RegistrationService } from './registration.service';
import { User } from './registration.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map, tap, pipe, OperatorFunction, Subscriber, from } from 'rxjs';
import { CheckIn } from './checkIn';
import { CheckinComponent } from './checkin/checkin.component';

var storageUrl = 'backend/storage.py';


@Injectable({
  providedIn: 'root'
})

export class CheckInService {   

  constructor(private http: HttpClient) {}

  createCheckIn(pid: number) : Observable<CheckIn> {
    let errors: string[] = [];


    if (pid.toString().length !== 9) {
      errors.push(`PID not found: ${pid}`);
    }

    let checkinRequest : CheckinRequest = {pid}
    let getValue = this.http.post<CheckIn>("/api/checkin", checkinRequest);
    return getValue

    return throwError(() => new Error("TODO: Implement me."));
}
  getCheckins() : Observable<CheckIn[]> {
    let checkInList$ = this.http.get<CheckIn[]>("/api/checkin").pipe(
      map(results => results.map(result => {result.created_at = new Date(result.created_at); return result}))
    )
    
    return checkInList$
  }


  

}