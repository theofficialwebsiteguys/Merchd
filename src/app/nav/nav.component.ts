import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [HeroComponent, CommonModule, RouterModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    menuOpen = false;

    menu = [
      { title: "Merch", category: "SPORTS-APPAREL", route: "/products" },
      { title: "Collectibles", category: "COLLECTIBLES", route: "/products" },
      { title: "Other", category: "OTHER", route: "/products" }
    ];
  
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }

    closeMenu(){
        this.menuOpen = false;
    }
    
}
