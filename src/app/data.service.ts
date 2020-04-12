import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class DataService {
  baseUrl = "https://crudcrud.com/api/b0aab30aaca8443fa2890b0211da78b9";

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }

  addUser(param: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, param);
  }

  updateUser(id: string, param: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id}`, param);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`);
  }
}
