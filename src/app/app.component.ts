import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { product } from './models/product';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  products: product[] = [];
  searchForm: FormGroup;
  loading: boolean = true;

  constructor(
    private productService: DataService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.productService.getData().subscribe((data: product[]) => {
      this.products = data;
    });

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(searchTerm => {
      this.filterProducts(searchTerm);
    });
  }

  filterProducts(searchTerm: string): void {
    if (searchTerm) {
      this.products = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Re-fetch products if the search term is cleared
      this.productService.getData().subscribe((data: product[]) => {
        this.products = data;
      });
    }
  }

 
}
