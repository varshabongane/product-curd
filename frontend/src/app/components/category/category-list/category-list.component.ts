import { Component, OnInit } from '@angular/core';
import { DataprocessService } from 'src/app/services/dataprocess.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    listData : any = [];
    pageNo :Number = 1; 
    totalPages :Number = 1; 
    numOfrecords :Number = 1; 
    currentPage :Number = 1; 
  constructor(
    private dataProcess:DataprocessService,
    private redirectRoutes : Router,
    private router : ActivatedRoute,
  ) { }

  ngOnInit() { 
    this.pageNo = this.router.snapshot.params.page;
    this.router.params.subscribe(params => {
      this.currentPage = params['page']!=undefined? params['page']:1;
      this.dataProcess.listCategory(this.currentPage).subscribe(
        (data) => {
          console.log(data);
          this.listData = data['records'];
          this.totalPages = data['pages'];
          this.numOfrecords = data['numOfrecords'];
        },
        (error) =>{
          console.log(error);
        }
      )
    });
    
  }

  //delete Category function
  deleteCategory(id){
    if (confirm('Are you sure you want to delete this record ?')) {
      this.dataProcess.deleteCategory(id).subscribe(
        (data) => {
          alert(data['message']);
          location.reload();
        },
        (error) =>{
          console.log(error);
        }
        );
  } else {
    return false;
   }
    
  }

}
