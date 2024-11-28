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
    // Clothing - Baby Onesies
    {
      category: 'CLOTHING',
      tag: 'best-seller',
      title: 'Baby Onesie - Heartfelt Quotes Collection',
      desc: 'Wrap your little one in comfort and wisdom with our Heartfelt Quotes Onesie. Each piece features a tender saying that resonates with love and positivity, making it a perfect addition to your baby\'s wardrobe.',
      price: 6.99,
      image: 'assets/clothing/heartfelt-quotes.jpg'
    },
    {
      category: 'CLOTHING',
      tag: '',
      title: 'Baby Onesie - Artistic Design Series',
      desc: 'Introduce your baby to the world of art with our Artistic Design Onesies. Adorned with unique and vibrant patterns, these bodysuits are crafted to inspire creativity from the very start.',
      price: 7.99,
      image: 'assets/clothing/artistic-design.jpg'
    },
    {
      category: 'CLOTHING',
      tag: '',
      title: 'Baby Onesie - Birthday Celebration Edition',
      desc: 'Celebrate your baby\'s special day with our Birthday Celebration Onesie. Designed with festive elements, it\'s the perfect attire for creating unforgettable birthday memories.',
      price: 8.99,
      image: 'assets/clothing/birthday-celebration.jpg'
    },
    {
      category: 'CLOTHING',
      tag: '',
      title: 'Baby Onesie - Welcome Newborn Collection',
      desc: 'Welcome your new arrival with our soft and cozy Newborn Collection Onesie. Featuring gentle designs that symbolize new beginnings, it\'s an ideal gift for newborns.',
      price: 6.49,
      image: 'assets/clothing/welcome-newborn.jpg'
    },
    {
      category: 'CLOTHING',
      tag: 'holiday-special',
      title: 'Baby Onesie - Holiday Joy Series',
      desc: 'Embrace the festive spirit with our Holiday Joy Onesies. Each piece captures the essence of the season, making your baby\'s holiday moments even more special.',
      price: 9.99,
      image: 'assets/clothing/holiday.jpg'
    },
  
    // Clothing - Children's T-Shirts
    {
      category: 'CLOTHING',
      tag: '',
      title: 'Children\'s T-Shirt - Sentimental Slogan',
      desc: 'Empower your child with our Inspirational Quotes T-Shirts. Each shirt features uplifting messages that encourage positivity and confidence.',
      price: 12.99,
      image: 'assets/clothing/sentimental-slogan.jpg'
    },
    {
      category: 'CLOTHING',
      tag: '',
      title: 'Children\'s T-Shirt - Creative Design Collection',
      desc: 'Spark imagination with our Creative Design T-Shirts. Showcasing playful and artistic graphics, these shirts are perfect for the budding artist.',
      price: 13.99,
      image: 'assets/clothing/creative-design.jpg'
    },
    {
      category: 'CLOTHING',
      tag: 'birthday-special',
      title: 'Children\'s T-Shirt - Birthday Celebration',
      desc: 'Make birthdays extra special with our Birthday Bash T-Shirt. Designed to stand out, it\'s the perfect attire for your child\'s big day.',
      price: 14.99,
      image: 'assets/clothing/cowgirl.jpg'
    },
    {
      category: 'CLOTHING',
      tag: 'holiday-special',
      title: 'Children\'s T-Shirt - Festive Holiday Series',
      desc: 'Celebrate the holidays in style with our Festive Holiday T-Shirts. Each design reflects the joy and warmth of the season, perfect for family gatherings.',
      price: 15.99,
      image: 'assets/clothing/festive-holiday.jpg'
    },
  
    // Decorations - Wine Bottles
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Decorative Wine Bottle - Sports Enthusiast\'s Collection',
      desc: 'Elevate your décor with our Sports Enthusiast\'s Decorative Wine Bottle. Handcrafted to showcase your favorite sport, it\'s a perfect piece for sports lovers.',
      price: 29.99,
      image: 'assets/decorations/sports-wine-bottle.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Decorative Wine Bottle - Collegiate Pride Series',
      desc: 'Show off your alma mater with our Collegiate Pride Decorative Wine Bottle. Customized with college themes, it\'s an elegant addition to any space.',
      price: 30.99,
      image: 'assets/decorations/college-wine-bottle.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Decorative Wine Bottle - Inspirational Quotes Edition',
      desc: 'Inspire and decorate simultaneously with our Inspirational Quotes Decorative Wine Bottle. Each bottle features a motivational saying to uplift your spirits.',
      price: 28.99,
      image: 'assets/decorations/quote-wine-bottle.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: 'best-seller',
      title: 'Decorative Wine Bottle - Wedding Bliss Collection',
      desc: 'Commemorate love with our Wedding Bliss Decorative Wine Bottle. Adorned with romantic designs, it\'s a perfect keepsake for newlyweds.',
      price: 34.99,
      image: 'assets/decorations/wedding-wine-bottle.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Decorative Wine Bottle - Birthday Cheers Series',
      desc: 'Celebrate birthdays with elegance using our Birthday Cheers Decorative Wine Bottle. Designed to add a festive touch to any birthday décor.',
      price: 32.99,
      image: 'assets/decorations/birthday-wine-bottle.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Decorative Wine Bottle - Holiday Harmony Edition',
      desc: 'Bring holiday cheer to your home with our Holiday Harmony Decorative Wine Bottle. Each piece reflects the festive spirit of the season.',
      price: 35.99,
      image: 'assets/decorations/holiday-wine-bottle.jpg'
    },
  
    // Decorations - Ornaments
    {
      category: 'DECORATIONS',
      tag: 'personalized',
      title: 'Personalized Ornament - Name Celebration',
      desc: 'Add a personal touch to your tree with our Name Celebration Ornament. Customized with your chosen name, it\'s a unique holiday keepsake.',
      price: 14.99,
      image: 'assets/decorations/name-ornament.jpg'
    },
    {
      category: 'DECORATIONS',
      tag: '',
      title: 'Inspirational Ornament - Holiday Quote Collection',
      desc: 'Decorate with meaning using our Quote Collection Ornament. Each ornament features an inspiring saying to brighten your holiday décor.',
      price: 12.99,
      image: 'assets/decorations/quote-ornament.jpg'
    },
  
    // Crochet
    {
      category: 'CROCHET',
      tag: '',
      title: 'Handcrafted Barrettes - Color Splash Set',
      desc: 'Brighten up hairstyles with our Color Splash Barrettes. Handcrafted in various vibrant colors, they add a playful touch to any look.',
      price: 5.99,
      image: 'assets/crochet/barrettes.jpg'
    },
    // Add remaining Crochet and Stuffed Animal entries here...
      // Crochet - Winter Hats
    {
      category: 'CROCHET',
      tag: 'best-seller',
      title: 'Crochet Winter Hat - Pom-Pom Delight',
      desc: 'Stay warm and stylish with our Pom-Pom Delight Winter Hat. Featuring a cozy design topped with a playful pom-pom, it\'s perfect for chilly days.',
      price: 18.99,
      image: 'assets/crochet/pom-pom-hat.jpg'
    },
    {
      category: 'CROCHET',
      tag: '',
      title: 'Crochet Winter Hat - Classic No-Pom Edition',
      desc: 'For a timeless look, our Classic No-Pom Winter Hat offers warmth and elegance without the pom-pom, suitable for any outfit.',
      price: 17.99,
      image: 'assets/crochet/no-pom-hat.jpg'
    },

    // Crochet - Baby Boots
    {
      category: 'CROCHET',
      tag: '',
      title: 'Crochet Baby Boots - Tiny Toes Collection',
      desc: 'Keep little feet snug with our Tiny Toes Baby Boots. Soft and comfortable, they\'re ideal for your baby\'s first steps.',
      price: 15.99,
      image: 'assets/crochet/baby-boots.jpg'
    },

    // Crochet - Baby Mittens
    {
      category: 'CROCHET',
      tag: '',
      title: 'Crochet Baby Mittens - Cozy Hands Set',
      desc: 'Protect tiny hands from the cold with our Cozy Hands Baby Mittens. Crafted with care, they ensure warmth and comfort.',
      price: 12.99,
      image: 'assets/crochet/baby-mittens.jpg'
    },

    // Stuffed Animals
    {
      category: 'STUFFED-ANIMALS',
      tag: 'customizable',
      title: 'Custom Stuffed Animal - Personalized Print Pal',
      desc: 'Create a unique companion with our Personalized Print Pal. Customize the design to reflect your child\'s personality, making it a cherished friend.',
      price: 25.99,
      image: 'assets/stuffed-animals/personalized-pal.jpg'
    },
    {
      category: 'STUFFED-ANIMALS',
      tag: 'customizable',
      title: 'Custom Stuffed Animal - Themed Adventure Buddy',
      desc: 'Ignite imagination with our Themed Adventure Buddy. Choose from various themes to match your child\'s interests for endless adventures.',
      price: 27.99,
      image: 'assets/stuffed-animals/adventure-buddy.jpg'
    },
    {
      category: 'STUFFED-ANIMALS',
      tag: 'best-seller',
      title: 'Custom Stuffed Animal - Memory Keepsake Bear',
      desc: 'Preserve precious memories with our Memory Keepsake Bear. Incorporate fabrics from cherished items to create a sentimental keepsake.',
      price: 29.99,
      image: 'assets/stuffed-animals/memory-keepsake.jpg'
    },
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
