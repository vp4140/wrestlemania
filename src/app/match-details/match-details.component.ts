import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent {
  matchData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.matchData = data;
  }
}
