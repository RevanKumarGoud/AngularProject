import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyAppComponent } from './my-app/my-app.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular13CRUD';

  displayedColumns: string[] = ['productName', 'category', 'date','freshness', 'price','Comments','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private myapp : MatDialog, private api : ApiService) {}
  ngOnInit(): void {
    this.getAllproducts();
  }

  openDialog() {
    this.myapp.open(MyAppComponent, {
     width: '30%'
    });
  }
  getAllproducts(){
this.api.getproduct()
.subscribe({
  next:(res)=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },
  error:(err)=>{
    alert('Error while fetching records!!');
  }
})
  }
  editproduct(row : any){
this.myapp.open(MyAppComponent,{
     width : '30%',
     data :row
}).afterClosed().subscribe(val=>{
  if(val=== 'Update'){
    this.getAllproducts();
  }
})
  }
  deleteproduct(id:number){
    this.api.deleteproduct(id)
    .subscribe({
      next:(res)=> {
        alert('Product Deleted Successfully')
      },
      error:()=>{
alert('Error While deleting the product');
      } 
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
