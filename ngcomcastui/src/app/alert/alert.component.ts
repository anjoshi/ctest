import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from "../services/alerts.service";
import { AlertsService } from "../services/alerts.service";

@Component({
  selector: 'app-alert',
  template: `
    <div *ngFor="let alert of alerts" class="{{ cssClass(alert) }} alert-dismissable">
      <div class="{{ cssIcon(alert) }}"></div>
      <div class="alert__message ">{{alert.message}}</div>
      <a class="alert__close icon-close" (click)="removeAlert(alert)"></a>
    </div>`,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertsService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }
      this.removeAlert(this.alerts.pop());
      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }
    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert--success alert-component';
      case AlertType.Error:
        return 'alert alert--danger alert-component';
      case AlertType.Info:
        return 'alert alert-component';
      case AlertType.Warning:
        return 'alert alert--warning alert-component';
    }
  }

  cssIcon(alert: Alert) {
    if (!alert) {
      return;
    }
    // return css Icon class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert__icon icon-check';
      case AlertType.Error:
        return 'alert__icon icon-error';
      case AlertType.Info:
        return 'alert__icon icon-info-circle';
      case AlertType.Warning:
        return 'alert__icon icon-exclamation-triangle';
    }
  }
}
