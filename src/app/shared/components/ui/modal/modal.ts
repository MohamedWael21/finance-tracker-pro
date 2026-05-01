import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
})
export class Modal {
  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  stopEventPropagation(e: Event) {
    e.stopPropagation();
  }
}
