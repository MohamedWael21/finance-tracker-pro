import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string  ;
  safeContent?: SafeHtml;
}

export interface ChatApiResponse {
  success: boolean;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private http = inject(HttpClient);
  private endpoint = environment.rawURL + '/chatBot';

  sendMessage(messages: ChatMessage[]): Observable<ChatApiResponse> {
    return this.http.post<ChatApiResponse>(
      this.endpoint,
      { messages },
      { withCredentials: true }
    );
  }
}
