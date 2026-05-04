import { Component, signal } from '@angular/core';
import { ChatUi } from '../../../features/chatbot/chat-ui/chat-ui';
import { LucideMessageCircle, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-floating-chat',
  standalone: true,
  imports: [ChatUi, LucideMessageCircle, LucideX],
  templateUrl: './floating-chat.html',
})
export class FloatingChat {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }
}
