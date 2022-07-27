import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.css']
})
export class MoreOptionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MoreOptionsComponent>,
    ) { }
  

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `60px`,
    right: `500px`});
  }

}
