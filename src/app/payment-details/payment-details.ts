import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetailForm } from './payment-detail-form/payment-detail-form';
import { PaymentDetailService } from '../shared/payment-detail-service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-payment-details',
  imports: [CommonModule, PaymentDetailForm],
  templateUrl: './payment-details.html',
  styles: ``,
})
export class PaymentDetails {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePaymentDetail(id).subscribe({
        next: (res) => {
          this.service.list = res as PaymentDetail[];
          this.toastr.error('Deleted successfully', 'Payment Detail Deleted');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Failed to delete payment detail', 'Payment Detail Delete');
        },
      });
    }
  }
}
