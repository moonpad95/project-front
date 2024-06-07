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
        price: [this.data.price.toString() || "", Validators.required],
        amount: [this.data.amount || "", Validators.required],
        status: [this.data.status || '', Validators.required]
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
       const product: Product = this.formGroup.value;
       console.log(product)
      this.productService.addProduct(product)
        .subscribe({
          next: (result) => {
            console.log('Producto registrado de manera exitosa:', result);
            this.dialogRef.close(result); // Cerrar el diálogo después de agregar el producto
          },
          error: (err) => {
            console.error('Hubo un error al agregar producto:', err);
            // Aquí puedes manejar el error de forma adecuada, por ejemplo, mostrar un mensaje al usuario
          }
        });
    } else {
      console.log('El formulario no es válido o el estado no está seleccionado.');
    }
  }
}
