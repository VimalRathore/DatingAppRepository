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
// getUser(id): Observable<User> {
//   return this.http.get<User>(this.baseUrl + 'user/' + id);
// }

getuser(id): Observable<Users> {
  alert(this.baseUrl + 'user/' + id);
  return this.http.get<Users>(this.baseUrl + 'user/' + id);

}
updateUser(id: number, user: Users) {
  alert(user.introduction);
return this.http.put(this.baseUrl + 'user/' + id, user);
}
setMainPhoto(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id);
}
}
