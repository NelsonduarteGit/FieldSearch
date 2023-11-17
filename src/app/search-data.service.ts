import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Search } from './search.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formData: Search[] = [];

  submitForm(data: Search): void {
    this.formData.push(data);
  }

  getFormData(): Observable<Search[]> {
    return of(this.formData);
  }
}
