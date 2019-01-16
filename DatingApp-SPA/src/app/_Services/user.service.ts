import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Users } from '../_models/Users';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Autherization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<Users[]> {
return this.http.get<Users[]>(this.baseUrl + 'user');
}

getuser(id): Observable<Users> {
  return this.http.get<Users>(this.baseUrl + 'user/' + id);

}
updateUser(id: number, user: Users) {
return this.http.put(this.baseUrl + 'user/' + id, user);
}
}
