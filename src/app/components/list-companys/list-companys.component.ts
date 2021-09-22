import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyAPIRestService } from 'src/app/services/company-apirest.service';

@Component({
  selector: 'app-list-companys',
  templateUrl: './list-companys.component.html',
  styleUrls: ['./list-companys.component.css']
})

export class ListCompanysComponent implements OnInit {
  companys: any[] = [];

  constructor(private _companyService: CompanyService, 
              private toastr: ToastrService, 
              private _companyApiRest: CompanyAPIRestService) { 
  }

  ngOnInit(): void {
    //this.getCompanys();
    this.getCompanysAPI();
  }

  //****************************
  //**** WebDeploy Firebase ****
  //****************************

  getCompanys()
  {
    this._companyService.getCompanys().subscribe(data => {
      this.companys = [];
      data.forEach((element:any) => {
        this.companys.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarCompany(id: string)
  {
    this._companyService.eliminarCompany(id).then(() => {
      this.toastr.error('La empresa fue eliminada con éxito!', 'Empresa eliminada');
    }).catch(error => {
      console.log(error);
    })
  }

  //****************************
  //***** API REST BANTRAB *****
  //****************************

  getCompanysAPI()
  {
    this._companyApiRest.getAll().subscribe(data => {
      console.log(data);
      this.companys = [];
      data.forEach((element:any) => {
        this.companys.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarCompanyAPI(id: string)
  {
    this._companyApiRest.eliminarCompany(id).subscribe(data => {
      this.toastr.success('La empresa fue eliminada con éxito!', 'BanTrab');
    })
  }
}
