import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.scss']
})
export class MyAppComponent implements OnInit {
freshnessList = ['Brand', 'Second Hand', 'Resurbished'];
productForm !:  FormGroup;
ActionBtn : string = 'Save';
  constructor(private fromBulider : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private myappRef : MatDialogRef<MyAppComponent>) { }

  ngOnInit(): void {
    this.productForm = this.fromBulider.group({
      productName : ['',Validators.required],
      category: ['', Validators.required],
      freshness : ['',Validators.required],
      price: ['',Validators.required],
      Comments : ['', Validators.required],
      date : ['',Validators.required]
    })
    if(this.editData){
      this.ActionBtn= "Update";
      this.productForm.controls['productName'].setValue(this.editData.productForm);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comments'].setValue(this.editData.Comments);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct(){
   if(this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(_res)=> {
          alert('Product added Successfully');
          this.productForm.reset();
          this.myappRef.close('save');
        },
        error:()=>{
          alert('Error while adding the product')
        }
      })
    }
   }
   else{
    this.updateproduct()
   }
  }
  updateproduct():any{
    this.api.putproduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(_res)=>{
        alert('Product Update successFully');
        this.productForm.reset();
        this.myappRef.close('Update');
      },
      error:()=>{
       alert('Error while geting the record!!') 
      }
    })
  }
}
