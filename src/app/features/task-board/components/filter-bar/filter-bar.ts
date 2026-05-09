import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TaskStatus } from '../../../../shared/models/task.model';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

type FilterOption = TaskStatus | 'all';

const FILTER_ICONS: Record<FilterOption, string> = {
  all: 'dashboard',
  todo: 'radio_button_unchecked',
  'in-progress': 'pending',
  done: 'check_circle',
};

@Component({
  selector: 'app-filter-bar',
  imports: [MatChipsModule, MatIcon],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBar {
  @Output() filterChange = new EventEmitter<FilterOption>();

  readonly options: FilterOption[] = ['all', 'todo', 'in-progress', 'done'];
  readonly icons = FILTER_ICONS;
  readonly labels: Record<FilterOption, string> = {
    all: 'All',
    todo: 'To Do',
    'in-progress': 'In Progress',
    done: 'Done',
  };

  current: FilterOption = 'all';

  select(option: FilterOption): void {
    this.current = option;
    this.filterChange.emit(option);
  }
}
