import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CompanyTask } from '../interfaces/companyTask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompanyAPIRestService {

  private api = 'https://apitest-bt.herokuapp.com/api/v1';
  private userApi = 'User123';
  private passApi = 'Password123';

  constructor(private http: HttpClient) { }

  getAll() : Observable<any>
  {
    const headersRequest = new HttpHeaders({
      'user': this.userApi,
      'password': this.passApi
    });
    const url = `${this.api}/empresas`;
    return this.http.get<CompanyTask[]>(url, { headers: headersRequest });
  }

  getCompany(id: string) : Observable<any>
  {
    const headersRequest = new HttpHeaders({
      'user': this.userApi,
      'password': this.passApi
    });
    const url = `${this.api}/empresas/${id}`;
    return this.http.get<CompanyTask>(url, { headers: headersRequest });
  }

  agregarCompany(company: CompanyTask) : Observable<any>
  {
    const headersRequest = new HttpHeaders({
      'user': this.userApi,
      'password': this.passApi
    });
    const url = `${this.api}/empresas`;
    return this.http.post(url, company, { headers: headersRequest });
  }

  actualizarCompany(company: CompanyTask) : Observable<any>
  {
    const headersRequest = new HttpHeaders({
      'user': this.userApi,
      'password': this.passApi
    });
    const url = `${this.api}/empresas/${company.id}`;
    return this.http.put<CompanyTask>(url, company, { headers: headersRequest });
  }

  eliminarCompany(id: string) : Observable<any>
  {
    const headersRequest = new HttpHeaders({
      'user': this.userApi,
      'password': this.passApi
    });
    const url = `${this.api}/empresas/${id}`;
    return this.http.delete<CompanyTask>(url, { headers: headersRequest });
  }
}
