import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  name = 'ngx sharebuttons';

  constructor(public dialogRef: MatDialogRef< ShareComponent>,
    ) { }
  

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `30px`,
    right: `450px`});
  }

}
