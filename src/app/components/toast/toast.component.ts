import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="message$ | async as message">
      {{ message }}
    </div>
  `,
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  constructor(private toastService: ToastService) {}

  get message$() {
    return this.toastService.toast$;
  }
}
