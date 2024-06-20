import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/services/users.service';
import { UsersComponent } from '../users/users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {
  userList!: MatTableDataSource<Users>;
  columnsHeader = ["username", "name", "lastName", "phone", "email", "status","opciones"];
  
  constructor(private productService: UsersService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userListMethod();
  }
  
  userListMethod() {
    try {
      this.productService.getUsers().subscribe(item => {
        // Filtrar productos para excluir aquellos con deleteDate
        const filteredProducts = item.filter(user => !user.deleteDate);
        this.userList = new MatTableDataSource(filteredProducts);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UsersComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        Swal.fire({
          title: 'Confirmación',
          text: '¿Deseas agregar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, agregar',
          cancelButtonText: 'No, cancelar'
        }).then((confirmationResult) => {
          if (confirmationResult.isConfirmed) {
            this.userListMethod();
            Swal.fire('Usuario agregado', 'El usuario ha sido agregado exitosamente', 'success');
          } else if (confirmationResult.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado', 'No se ha agregado ningún usuario', 'error');
          }
        });      }
    });
  }

  editDialog(element: Users) {
    const dialogRef = this.dialog.open(UsersComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        this.userListMethod();
      }
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteUser(productId).subscribe(
      () => {
        // Éxito al eliminar
        Swal.fire('Eliminado', 'El usuario fue eliminado correctamente', 'success');
        // Actualizar la lista de productos
        this.userListMethod();
      },
      (error) => {
        // Manejo de errores
        Swal.fire('Error', 'Ocurrió un error al eliminar el producto', 'error');
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  deleteDialog(element: any) {
    // Confirmación con mensaje y acciones
    Swal.fire({
      title: `¿Estás seguro que deseas eliminar el usuario ${element.name}?`,
      text: 'No podrás recuperarlo posteriormente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(element._id);
      }
    });
  }
}
