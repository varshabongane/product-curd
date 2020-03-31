import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {DataprocessService} from '../../../services/dataprocess.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})

export class AddEditProductComponent implements OnInit {
  productForm : FormGroup;
  submitted = false;
  successMessageFlag = false;
  successMessage = '';
  errorMessageFlag = false;
  errorMessage = '';
  lable = 'Add Product';
  categoryList : any =[];
  constructor(
    private formBuilder : FormBuilder,
    private dataProcess : DataprocessService,
    private router : ActivatedRoute,
    private redirectRoutes : Router,
    ) { }

  ngOnInit() {
    this.lable = 'Add product';
    this.productForm = this.formBuilder.group({
      name : ['product 1',Validators.required],
      category_id : ['',Validators.required],
      isEdited : [false,Validators.required]
    });
    
    this.dataProcess.listCategory('all').subscribe(
      (data) => {
        this.categoryList = data['records'];
      },
      (error) =>{
        console.log(error);
      }
    )
    //if route is edit-product then call editProductView
    if(this.router.routeConfig.path == 'edit-product/:id'){
      this.editProductView(this.router.snapshot.params.id);
    }

  }

  //Validation errors
  get fval() { return this.productForm.controls; } 

  //save product function
  createProduct(){
    this.dataProcess.addProduct(this.productForm.value).subscribe(
      (data) => {
         this.submitted = false;
         this.successMessageFlag = true;
         this.successMessage = data['message'];
         this.productForm.reset();
         this.productForm.patchValue({'isEdited':false});

      },
      (error) =>{
       this.errorMessageFlag = true;
       this.errorMessage= error.error.message;
      }
      )
  }

  //update product function
  editProduct(id){
    this.dataProcess.editProduct(this.productForm.value,id).subscribe(
      (data) => {
         this.submitted = false;
         this.successMessageFlag = true;
         this.successMessage = data['message'];
          alert(this.successMessage);
         this.redirectRoutes.navigate(['/product-list']);

      },
      (error) =>{
       this.errorMessageFlag = true;
       this.errorMessage= error.error.message;
      }
      )
  }

  ////View edit product function
  editProductView(id){
    this.lable = 'Edit product';
    this.dataProcess.editProductView(id).subscribe(
      (data) => {
        console.log(data);
        this.productForm.patchValue(data)
        this.productForm.patchValue({'isEdited':true});
      },
      (error) =>{
       this.errorMessageFlag = true;
       this.errorMessage= error.error.message;
        console.log(error.error.message);
      }
      )
  }

  //common submit function for save and update product
  onSubmit(){
    this.submitted = true;
    this.successMessageFlag = false;
    this.successMessage = '';
    this.errorMessageFlag = false;
    this.errorMessage = '';

    // return for here if form is invalid
    if (this.productForm.invalid) {
    return;
    }

    if(this.productForm.value.isEdited){//update
      this.editProduct(this.router.snapshot.params.id)
    }else{
      this.createProduct();//add
    }
  }

  

}