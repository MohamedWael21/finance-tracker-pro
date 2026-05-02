import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-toggle',
  imports: [],
  templateUrl: './toggle.html',
})
export class Toggle {
  checked = model<boolean>(false);
  label = input<string>('');
  disabled = input<boolean>(false);

  toggle() {
    if (!this.disabled()) {
      this.checked.set(!this.checked());
    }
  }
}
