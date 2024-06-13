import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/products';
import { ProductsListService } from 'src/app/services/products-list.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  productList!: MatTableDataSource<Product>;
  columnsHeader=["date","name","price","amount","status","opciones"]
  
  
  constructor(private productService:ProductsListService,
  public dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
  this.productListMethod();
  }
  
  productListMethod(){
  try{
  this.productService.getProducts()
  .subscribe(item => this.productList= new MatTableDataSource(item))
  
  }catch(error){
  console.log(error)
  }
  
  }


  
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  
  this.productList.filter=filterValue.trim();
  
  }

  opendDialog(){
    const dialogRef = this.dialog.open(ProductFormComponent,{
      data:null,
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      if(result){
        this.productListMethod();
      }
    });
  }
  editDialog(element: Product){
    const dialogRef = this.dialog.open(ProductFormComponent,{
      data : element,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialogwas closed');
      if(result){
        this.productListMethod();
      }
    })
  }

  deleteDialog(element: Product){
          // Confirmación con mensaje y acciones
      Swal.fire({
        title: `Estas seguro que deseas eliminar el registro`,
        text: 'No podras recuperarlo posterior a su eliminacion',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Eliminado!', 'El registro fue correctamente eliminado', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'El registro no fue eliminado', 'info');
        }
      });
        }
}
