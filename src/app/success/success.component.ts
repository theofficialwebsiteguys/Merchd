import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  sessionId: string | null = null;
  orderDetails: any = null;
  error: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if (this.sessionId) {
        this.cartService.affectInventory();
      } else {
        this.error = 'No session ID found.';
      }
    });
  }


  continueShopping(): void {
    this.router.navigate(['/']);
  }
}
