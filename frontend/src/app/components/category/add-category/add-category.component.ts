import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {DataprocessService} from '../../../services/dataprocess.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm : FormGroup;
  submitted = false;
  successMessageFlag = false;
  successMessage = '';
  errorMessageFlag = false;
  errorMessage = '';
  lable = 'Add Category';
  constructor(
    private formBuilder : FormBuilder,
    private dataProcess : DataprocessService,
    private router : ActivatedRoute,
    private redirectRoutes : Router,
    ) { }

  ngOnInit() {
    this.lable = 'Add Category';
    this.categoryForm = this.formBuilder.group({
      name : ['category 1',Validators.required],
      isEdited : [false,Validators.required]
    });
    
    //if route is edit-category then call editCategoryView
    console.log(this.router);
    if(this.router.routeConfig.path == 'edit-category/:id'){
      this.editCategoryView(this.router.snapshot.params.id);
    }

  }

  //Validation errors
  get fval() { return this.categoryForm.controls; } 

  //save category function
  createCategory(){
    this.dataProcess.addCategory(this.categoryForm.value).subscribe(
      (data) => {
         this.submitted = false;
         this.successMessageFlag = true;
         this.successMessage = data['message'];
         this.categoryForm.reset();
         this.categoryForm.patchValue({'isEdited':false});

      },
      (error) =>{
       this.errorMessageFlag = true;
       this.errorMessage= error.error.message;
      }
      )
  }

  //update category function
  editCategory(id){
    this.dataProcess.editCategory(this.categoryForm.value,id).subscribe(
      (data) => {
         this.submitted = false;
         this.successMessageFlag = true;
         this.successMessage = data['message'];
          alert(this.successMessage);
         this.redirectRoutes.navigate(['/category-list']);

      },
      (error) =>{
       this.errorMessageFlag = true;
       this.errorMessage= error.error.message;
      }
      )
  }

  ////View edit category function
  editCategoryView(id){
    this.lable = 'Edit Category';
    this.dataProcess.editCategoryView(id).subscribe(
      (data) => {
        console.log(data);
        this.categoryForm.patchValue(data)
        this.categoryForm.patchValue({'isEdited':true});
      },
      (error) =>{
       this.errorMessageFlag = true;
       this.errorMessage= error.error.message;
        console.log(error.error.message);
      }
      )
  }

  //common submit function for save and update category
  onSubmit(){
    this.submitted = true;
    this.successMessageFlag = false;
    this.successMessage = '';
    this.errorMessageFlag = false;
    this.errorMessage = '';

    // return for here if form is invalid
    if (this.categoryForm.invalid) {
    return;
    }

    if(this.categoryForm.value.isEdited){//update
      this.editCategory(this.router.snapshot.params.id)
    }else{
      this.createCategory();//add
    }
  }

  

}
