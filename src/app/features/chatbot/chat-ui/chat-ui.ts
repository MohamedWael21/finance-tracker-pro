import {
  Component,
  inject,
  signal,
  computed,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../chatbot.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-ui.html',
})
export class ChatUi implements AfterViewChecked {
  private chatbot = inject(ChatbotService);
  private toast = inject(ToastService);
  private sanitizer = inject(DomSanitizer);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLTextAreaElement>;

  // ✅ store ONLY text (no HTML here)
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);

  inputValue = '';
  private shouldScroll = false;

  suggestions = [
    'How can I reduce my spending?',
    'Summarize my budget status',
    'Tips for saving money',
    'What is a good saving rate?',
  ];

  // ✅ render layer (HTML transformation happens here only)
  renderedMessages = computed(() => {
    return this.messages().map((msg) => ({
      role: msg.role,
      html: this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(msg.content) as string
      ),
    }));
  });

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  onEnter(event: Event) {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      ke.preventDefault();
      this.send();
    }
  }

  autoResize(event: Event) {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  }

  send() {
    const content = this.inputValue.trim();
    if (!content || this.loading()) return;

    // user message (raw text only)
    const userMsg: ChatMessage = {
      role: 'user',
      content,
    };

    this.messages.update((msgs) => [...msgs, userMsg]);

    this.inputValue = '';
    this.resetTextarea();
    this.shouldScroll = true;

    this.loading.set(true);

    this.chatbot.sendMessage(this.messages()).subscribe({
      next: (res) => {
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: res.data, 
        };

        this.messages.update((msgs) => [...msgs, assistantMsg]);

        this.loading.set(false);
        this.shouldScroll = true;
      },

      error: (err) => {
        this.loading.set(false);
        console.log(err);
        this.toast.error(
          err?.error?.message || 'Failed to get a response. Please try again.'
        );
      },
    });
  }

  sendSuggestion(text: string) {
    this.inputValue = text;
    this.send();
  }

  bubbleClass(role: 'user' | 'assistant'): string {
    return role === 'user'
      ? 'bg-primary text-primary-foreground rounded-br-sm'
      : 'bg-muted text-foreground rounded-bl-sm';
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }

  private resetTextarea() {
    if (this.inputEl) {
      this.inputEl.nativeElement.style.height = 'auto';
    }
  }
}
