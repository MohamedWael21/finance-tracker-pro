import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITransaction } from '../interfaces/itransaction';
import { IReport } from '../interfaces/ireport';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  transactionData: ITransaction[] = [];

  reportData!: IReport;

  private readonly _HttpClient = inject(HttpClient);

  getReports(startDate: Date, endDate: Date): Observable<any> {
    const formattedStart = this.formatDate(startDate);

    const formattedEnd = this.formatDate(endDate);

    console.log();

    return this._HttpClient.get(
      `${environment.baseURL}/reports/transactions-summary?startDate=${formattedStart}&endDate=${formattedEnd}`,
      {
        withCredentials: true,
      },
    );
  }

  getAllTransactions(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/transactions`, { withCredentials: true });
  }

  private formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }
}
