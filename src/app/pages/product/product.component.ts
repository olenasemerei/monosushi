import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {

  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {}

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data;
    })
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }

}
