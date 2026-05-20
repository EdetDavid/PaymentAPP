import { Component, signal } from '@angular/core';
import { PaymentDetails } from './payment-details/payment-details';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [PaymentDetails],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('PaymentAPP');
} 
