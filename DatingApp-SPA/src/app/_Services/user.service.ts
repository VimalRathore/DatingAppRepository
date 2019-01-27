import { AlertifyService } from './alertify.service';
import { Users } from './../_models/Users';
import { PaginatedResult } from './../_models/Pagination';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

constructor(private http: HttpClient, private alertify: AlertifyService) { }

 getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Users[]>> {
  const paginatedResult: PaginatedResult<Users[]> = new PaginatedResult<Users[]>();

   let params = new HttpParams();

   if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
   params = params.append('minAge', userParams.minAge);
   params = params.append('maxAge', userParams.maxAge);
   params = params.append('gender', userParams.gender);
   params = params.append('orderBy', userParams.orderBy);
  }

  return this.http.get<Users[]>(this.baseUrl + 'user', { observe: 'response', params })
       .pipe( map(response => {
       // this.alertify(response.body);
           paginatedResult.result = response.body;
           if (response.headers.get('Pagination') != null) {
           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
         }
           return paginatedResult;
         })
       );
 }





getuser(id): Observable<Users> {
  return this.http.get<Users>(this.baseUrl + 'user/' + id);

}
updateUser(id: number, user: Users) {
return this.http.put(this.baseUrl + 'user/' + id, user);
}
setMainPhoto(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id);
}
}
