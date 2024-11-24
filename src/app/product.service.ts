import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private selectedProduct: any;

  private selectedCategory = new BehaviorSubject<string | null>(null);

  private products = [
    {
      category: 'CLOTHING',
      tag: 'best-seller',
      title: 'Childrens T-Shirt',
      desc: 'Description goes here.....',
      price: 6.99,
      image: 'assets/clothing/fishing-buddy.jpg'
    },
    {
      category: 'CLOTHING',
      tag: 'best-seller',
      title: 'Baby Onesie',
      desc: 'Description goes here.....',
      price: 6.99,
      image: 'assets/clothing/baby-bowtie.jpg'
    },
    {
      category: 'CLOTHING',
      tag: 'best-seller',
      title: 'Adult T-Shirt',
      desc: 'Description goes here.....',
      price: 6.99,
      image: 'assets/clothing/shirt-hunt.jpg'
    },
    {
      category: 'STUFFED-ANIMALS',
      tag: 'best-seller',
      title: 'Handmade Tabletop Bowling',
      desc: 'Description goes here.....',
      price: 34.99,
      image: 'assets/stuffed-animal.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Kitty Tic Tac Toe To Go',
      desc: 'Description goes here.....',
      price: 20.99,
      image: 'assets/default.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Kitty Tic Tac Toe To Go',
      desc: 'Description goes here.....',
      price: 20.99,
      image: 'assets/default.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Kitty Tic Tac Toe To Go',
      desc: 'Description goes here.....',
      price: 20.99,
      image: 'assets/default.jpg'
    },
    {
      category: 'CROCHET',
      tag: '',
      title: 'Kitty Tic Tac Toe To Go',
      desc: 'Description goes here.....',
      price: 20.99,
      image: 'assets/default.jpg'
    },
    {
      category: 'CROCHET',
      tag: '',
      title: 'Kitty Tic Tac Toe To Go',
      desc: 'Description goes here.....',
      price: 20.99,
      image: 'assets/default.jpg'
    },
    {
      category: 'CROCHET',
      tag: '',
      title: 'Kitty Tic Tac Toe To Go',
      desc: 'Description goes here.....',
      price: 20.99,
      image: 'assets/default.jpg'
    }
  ];

  constructor(private http: HttpClient) {
  }

  getAllProducts(): any[] {
    return this.products;
  }

  getProductsByCategory(category: string): any {
    return this.products.filter((product) => product.category === category);
  }

  getBestSellers(): any {
    return this.products.filter((product) => product.tag === "best-seller");
  }

  setCategory(category: string): void {
    console.log("setting category")
    this.selectedCategory.next(category); // Update the category
  }

  getCategory() {
    return this.selectedCategory.asObservable(); // Expose the category as an Observable
  }

  // Setter for selected product
  setSelectedProduct(product: any): void {
    this.selectedProduct = product;
  }
  
  // Getter for selected product
  getSelectedProduct(): any {
    return this.selectedProduct;
  }
  
  // Reset the selected product
  resetSelectedProduct(): void {
    this.selectedProduct = null;
  }

}
