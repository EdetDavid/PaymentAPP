import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail-service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-payment-detail-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-detail-form.html',
  styles: ``,
})
export class PaymentDetailForm {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService,
  ) {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0) {
        this.insertRecord(form);
      } else {
        this.updateRecord(form);
      }
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.success('Inserted successfully', 'Payment Detail Registeration');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Failed to insert payment detail', 'Payment Detail Registration');
      },
    });
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.info('Updated successfully', 'Payment Detail Updated');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Failed to update payment detail', 'Payment Detail Update');
      },
    });
  }
}
