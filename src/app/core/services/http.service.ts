import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FieldResponse, FormResponse} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly API_URL = 'https://frontend-homework-mock.prod.paynt.com'

  constructor(private httpClient: HttpClient) {
  }

  getForm(): Observable<FormResponse[]> {
    return this.httpClient.get<FormResponse[]>(`${this.API_URL}/form`);
  }

  getFields(): Observable<FieldResponse[]> {
    return this.httpClient.get<FieldResponse[]>(`${this.API_URL}/fields`);
  }

  postForm(form: {[key: string]: string}): Observable<null> {
    return this.httpClient.post<null>(`${this.API_URL}/form`, form);
  }
}
