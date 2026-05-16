import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskStatus } from '../../../shared/models/task.model';

export type FilterOption = 'all' | TaskStatus;

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  //  private readonly _filter$ = signal('all');
  private readonly _filter$ = new BehaviorSubject<FilterOption>('all');
  readonly filter$ = this._filter$.asObservable();

  setFilter(filter: FilterOption): void {
    this._filter$.next(filter);
  }
}
