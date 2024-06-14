import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/products';
import { ProductsListService } from 'src/app/services/products-list.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder: FormBuilder,
    private productService: ProductsListService // Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (!this.data) {
      this.formGroup = this.formBuilder.group({
        name: ["", Validators.required],
        code: ["", Validators.required],
        category: ["", Validators.required],
        description: ["", Validators.required],
        price: [Validators.required] ,
        amount: [Validators.required],
        status: [Validators.required]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        name: [this.data.name || "", Validators.required],
        code: [this.data.code || "", Validators.required],
        category: [this.data.category || "", Validators.required],
        description: [this.data.description || "", Validators.required],
        price: [this.data.price || "", Validators.required],
        amount: [this.data.amount || "", Validators.required],
        status: [this.data.status || '', Validators.required]
      });
    }
  }

  save(): void{
    let request={
      id:this.data!=null?this.data._id:null,
      name:this.formGroup.value.name,
      code:this.formGroup.value.code,
      category:this.formGroup.value.category,
      price:this.formGroup.value.price,
      amount:this.formGroup.value.amount,
      description:this.formGroup.value.description

    }
    try{
      if(!this.data){
        this.productService.addProduct(request).subscribe(item=>console.log(item))
      }else{
        this.productService.editProducts(request).subscribe(item=>console.log(item))
      }
      this.dialogRef.close(true) //cerrar modal
    } catch(error){
      console.log(error);
    }

  }


}
