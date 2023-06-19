import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CheckIn } from './checkIn';

export interface User {
  pid: number;
  first_name: string;
  last_name: string;
}
export interface CheckinRequest {
  pid: number;
}
var storageUrl = 'backend/storage.py';
/**
 * This class handles the registration concerns of the system including the ability
 * to create new registrations and retrieve a list of registered users.
 */
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {}

  /**
   * Retrieve all users registered with the check-in system.
   * 
   * @returns observable array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/registrations");
  }

  /**
   * Registers a user with the check-in system.
   * 
   * @param pid 9-digit UNC PID
   * @param first_name required string with length greater than 0.
   * @param last_name 
   * @returns Obervable of User that will error if there are issues with validation or persistence.
   */
  registerUser(pid: number, first_name: string, last_name: string): Observable<User> {
    let errors: string[] = [];

    if (pid.toString().length !== 9) {
      errors.push(`Invalid PID: ${pid}`);
    }

    if (first_name === "") {
      errors.push(`First Name required.`);
    }

    if (last_name === "") {
      errors.push(`Last Name required.`)
    }

    if (errors.length > 0) {
      return throwError(() => { return new Error(errors.join("\n")) });
    }

    let user: User = {pid, first_name, last_name};
   
    let postValue = this.http.post<User>("/api/registrations", user);

    return postValue

  }
  deleteUser(pid: number): Observable<string>{

    return this.http.delete<string>(`/api/registrations/${pid}`);
    
  }

}
