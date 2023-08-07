import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { IUser } from './interfaces/user';
import { IAdventure } from './interfaces/adventure';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  user: IUser | null = null;

  loadAllAdventures() {
    return this.http.get<IAdventure[]>(`${apiUrl}/adventures/catalog`);
  }
  loadRecentAdventures() {
    return this.http.get<IAdventure[]>(`${apiUrl}/adventures/catalog/most-recent`);
  }

  loadAdventureById(id: string) {
    return this.http.get<IAdventure>(`${apiUrl}/adventures/catalog/${id}`);
  }

  updateAdventure(id: string | undefined, adventure: {}) {
    return this.http.put<IAdventure>(`${apiUrl}/adventures/catalog/edit/${id}`, adventure);
  }

  deleteAdventure(id: string | undefined) {
    return this.http.delete(`${apiUrl}/adventures/catalog/${id}`);
  }

  getAdventureByOwner() {
    return this.http.get<IAdventure[]>(`${apiUrl}/auth/profile`);
  }

  updateProfile(data:{}){
    return this.http.put<IUser>(`${apiUrl}/auth/profile/edit`,data)
  }

  createAdventure(data: {}) {
    return this.http.post(`${apiUrl}/adventures/catalog/create`, data);
  }
}