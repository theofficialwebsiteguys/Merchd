import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {
  constructor(
  ) {

  }

  ngOnInit(): void {

  }
}
