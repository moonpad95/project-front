import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/products';
import { ProductsListService } from 'src/app/services/products-list.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.sass']
})
export class SalesListComponent implements OnInit {
  productList!: MatTableDataSource<Product>;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductsListService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.productListMethod();
  }
  
  productListMethod() {
    try {
      this.productService.getProducts().subscribe(item => {
        const filteredProducts = item.filter(product => !product.deleteDate);
        this.productList = new MatTableDataSource(filteredProducts);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        this.productListMethod();
      }
    });
  }

  // editDialog(element: Product) {
  //   const dialogRef = this.dialog.open(ProductFormComponent, {
  //     data: element,
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log('The dialog was closed');
  //     if (result) {
  //       this.productListMethod();
  //     }
  //   });
  // }

  // deleteProduct(productId: string) {
  //   this.productService.deleteProduct(productId).subscribe(
  //     () => {
  //       Swal.fire('Eliminado', 'El producto fue eliminado correctamente', 'success');
  //       this.productListMethod();
  //     },
  //     (error) => {
  //       Swal.fire('Error', 'Ocurrió un error al eliminar el producto', 'error');
  //       console.error('Error al eliminar el producto', error);
  //     }
  //   );
  // }

  // deleteDialog(element: Product) {
  //   Swal.fire({
  //     title: `¿Estás seguro que deseas eliminar el producto ${element.name}?`,
  //     text: 'No podrás recuperarlo posteriormente',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Eliminar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.deleteProduct(element.id);
  //     }
  //   });
  // }


}
