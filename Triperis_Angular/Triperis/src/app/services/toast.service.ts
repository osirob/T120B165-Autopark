import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private matSnackBar: MatSnackBar) { }

  public open(message: string): void {
    this.matSnackBar.open(message, 'Gerai', { duration: 3000 })
  }
}
