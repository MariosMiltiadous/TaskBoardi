import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FilterOption } from '../../services/filter-service';

const FILTER_META: Record<FilterOption, { label: string; icon: string }> = {
  all: { label: 'All', icon: 'dashboard' },
  todo: { label: 'To Do', icon: 'radio_button_unchecked' },
  'in-progress': { label: 'In Progress', icon: 'pending' },
  done: { label: 'Done', icon: 'check_circle' },
};

@Component({
  selector: 'app-filter-bar',
  imports: [MatChipsModule, MatIcon],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBar {
  @Input({ required: true }) current!: FilterOption;
  @Output() filterChange = new EventEmitter<FilterOption>();

  readonly options: FilterOption[] = ['all', 'todo', 'in-progress', 'done'];
  readonly meta = FILTER_META;
}
