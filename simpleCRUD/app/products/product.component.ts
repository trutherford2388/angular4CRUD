import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { clone } from 'lodash';

@Component({
    moduleId: module.id,
    templateUrl: 'product.template.html'
})

export class ProductComponent implements OnInit {
    products: Product[];
    productForm: boolean = false;
    editProductForm: boolean = false;
    isNewForm: boolean;
    newProduct: any = {};
    editedProduct: any = {};

    constructor(private _productService: ProductService) {}
    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.products = this._productService.getProductsFromData();
    }

    showEditProductForm(product: Product) {
        if(!product) {
            this.productForm = false;
            return;
        }
        this.editProductForm = true;
        this.editedProduct = clone(product);
    }

    showAddProductForm() {
        // reset form if edited product
        if(this.products.length) {
            this.newProduct = {};
        }
        this.productForm = true;
        this.isNewForm = true;
    }

    saveProduct(product: Product) {
        if(this.isNewForm) {
            // add new product
            this._productService.addProduct(product);
        }
        this.productForm = false;
    }

    updateProduct() {
        this._productService.updateProduct(this.editedProduct);
        this.editProductForm = false;
        this.editedProduct = {};
    }

    removeProduct(product: Product) {
        this._productService.deleteProduct(product);
    }

    cancelNewProduct() {
        this.newProduct = {};
        this.productForm = false;
    }

    cancelEdits() {
        this.editedProduct = {};
        this.editProductForm = false;
    }
}
