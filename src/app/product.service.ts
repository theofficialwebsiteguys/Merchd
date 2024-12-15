import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from './models/product';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = new BehaviorSubject<any>([]);
  products$ = this.products.asObservable();

  private selectedProduct: any;

  private selectedCategory = new BehaviorSubject<string | null>(null);
  

  constructor(private http: HttpClient) {
    this.loadProductsFromLocalStorage();
  }

  private loadProductsFromLocalStorage(): void {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts: any = JSON.parse(storedProducts); // Parse stored JSON
        this.products.next(parsedProducts); // Update BehaviorSubject
      } catch (error) {
        console.error('Error parsing products from local storage:', error);
        localStorage.removeItem('products'); // Clear corrupted data
      }
    }
  }
  

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  fetchProducts(): void {
    if (this.products.value.length > 0) {
      console.log('Products already loaded from local storage.');
      return;
    }

    this.http.get<any>(`${environment.api_url}/products/all-products`).subscribe(
      (products) => {
        this.products.next(products.data); // Update BehaviorSubject
        this.saveProductsToLocalStorage(products.data); // Save to local storage
        console.log(products); // Verify all products are fetched
      },
      (error) => {
        console.error('Error fetching products from backend:', error);
      }
    );
  }

  getAllProducts(): Observable<any> {
    return this.products$;
  }
  
  getProductsByCategory(category: string): Observable<any> {
    return this.products$.pipe(
      map((products) => products.filter((product: any) => product.Category.name.toUpperCase() === category.toUpperCase()))
    );
  }
  
  getBestSellers(): Observable<any> {
    return this.products$.pipe(
      map((products) => products.filter((product: any) => product.tag === 'best-seller'))
    );
  }

  // getBestSellers(): Observable<any> {
  //   return this.getAllProducts().pipe(
  //     catchError(this.handleError),
  //     map((products: any[]) =>
  //       products.filter((product) => product.tag === 'best-seller')
  //     )
  //   );
  // }

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
  localStorage.setItem('selectedProduct', JSON.stringify(product)); // Store product in local storage
}

// Getter for selected product
getSelectedProduct(): any {
  if (!this.selectedProduct) {
    const storedProduct = localStorage.getItem('selectedProduct');
    this.selectedProduct = storedProduct ? JSON.parse(storedProduct) : null; // Retrieve product from local storage
  }
  return this.selectedProduct;
}

// Reset the selected product
resetSelectedProduct(): void {
  this.selectedProduct = null;
  localStorage.removeItem('selectedProduct'); // Remove product from local storage
}


  private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Backend error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
  }

}
