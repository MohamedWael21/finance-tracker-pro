import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatApiResponse {
  success: boolean;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private http = inject(HttpClient);
  private endpoint = `http://localhost:5000/chatBot`;

  sendMessage(messages: ChatMessage[]): Observable<ChatApiResponse> {
    return this.http.post<ChatApiResponse>(
      this.endpoint,
      { messages },
      { withCredentials: true }
    );
  }
}
