import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result, Update } from './result';

@Injectable({
  providedIn: 'root'
})
export class ManualUpdateDataService {

  constructor(private http: HttpClient) { }

  private apiBaseURl = environment.apiBaseUrl;
                // build:
  // private apiBaseUrl = 'http://localhost:3000/api';
              // production:
  private apiBaseUrl = 'https://manualupdate.herokuapp.com/api';
  

  public search: string;

  public getResults(): Promise<Result[]> {
    const url: string = `${this.apiBaseUrl}/results/search/${this.search}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Result[])
      .catch(this.handleError);
  }

  public getSearchResults(searchstring: string): Promise<Result[]> {
    const url: string = `${this.apiBaseUrl}/results/search/${searchstring}`;
    this.search=searchstring;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Result[])
      .catch(this.handleError);
  }

  public getResultById(resultId: string): Promise<Result> {
    const url: string = `${this.apiBaseUrl}/results/${resultId}`;
    console.log("result_id", resultId);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Result)
      .catch(this.handleError);
  }
  

  public addUpdateByResultId(resultId: string, formData: Update): Promise<Update> {
    const url: string = `${this.apiBaseUrl}/results/${resultId}/updates`;
    console.log("formdate", formData)
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as Update)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

}