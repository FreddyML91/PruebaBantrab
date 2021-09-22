import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyAPIRestService } from 'src/app/services/company-apirest.service';
import { CompanyTask } from 'src/app/interfaces/companyTask';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent implements OnInit {
  editCompany: FormGroup;
  id: string | null;
  idVal: string;
  submitted = false;

  constructor(private fb: FormBuilder, 
              private _companyService: CompanyService, 
              private router: Router, 
              private toastr: ToastrService, 
              private aRoute: ActivatedRoute,
              private _companyApiRest: CompanyAPIRestService) { 
    this.editCompany = this.fb.group({
      nombre: ['', Validators.required],
      razon: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nit: ['', Validators.required],
      estado: ['', Validators.required],
      direccion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.idVal = '';
  }

  ngOnInit(): void {
    //this.esEditar();
    this.esEditarAPI();
  }

  //****************************
  //**** WebDeploy Firebase ****
  //****************************

  esEditar()
  {
    if (this.id !== null)
    {
      this._companyService.getCompany(this.id).subscribe(data => {
        this.editCompany.setValue({
          nombre: data.payload.data()['nombre'],
          razon: data.payload.data()['razon'],
          telefono: data.payload.data()['telefono'],
          correo: data.payload.data()['correo'],
          nit: data.payload.data()['nit'],
          estado: data.payload.data()['estado'],
          direccion: data.payload.data()['direccion']
        })
      })
    }
  }

  editarEmpresa()
  {
    this.submitted = true;
    if (this.editCompany.invalid)
    {
      return;
    }

    const company: any = {
      nombre: this.editCompany.value.nombre,
      razon: this.editCompany.value.razon,
      telefono: this.editCompany.value.telefono,
      correo: this.editCompany.value.correo,
      nit: this.editCompany.value.nit,
      estado: this.editCompany.value.estado,
      direccion: this.editCompany.value.direccion,
      fechaActualizacion: new Date()
    }

    if (this.id !== null)
    {
      this.idVal = this.id;
    }

    this._companyService.actualizarCompany(this.idVal, company).then(() => {
      this.toastr.info('La empresa fue modificada con éxito!', 'Empresa actualizada');
      this.router.navigate(['/list-companys']);
    }).catch(error => {
      this.toastr.error(error, 'BanTrab');
    })
  }

  //****************************
  //***** API REST BANTRAB *****
  //****************************

  esEditarAPI()
  {
    if (this.id !== null)
    {
      this._companyApiRest.getCompany(this.id).subscribe(data => {
        this.editCompany.setValue({
          nombre: data.payload.data()['nombre_comercial'],
          razon: data.payload.data()['razon_social'],
          telefono: data.payload.data()['telefono'],
          correo: data.payload.data()['correo'],
          nit: data.payload.data()['nit'],
          estado: data.payload.data()['estado'],
          direccion: data.payload.data()['direccion']
        })
      })
    }
  }

  editarEmpresaAPI()
  {
    this.submitted = true;
    if (this.editCompany.invalid)
    {
      return;
    }
    
    if (this.id !== null)
    {
      this.idVal = this.id;
    }

    this._companyApiRest.getCompany(this.idVal).subscribe(data => {
      const company: CompanyTask = {
        id: this.idVal,
        nombre_comercial: this.editCompany.value.nombre,
        razon_social: this.editCompany.value.razon,
        telefono: this.editCompany.value.telefono,
        correo: this.editCompany.value.correo,
        nit: this.editCompany.value.nit,
        estado: this.editCompany.value.estado,
        direccion: this.editCompany.value.direccion,
        created_at: data.payload.data()['created_at'],
        updated_at: new Date()
      }

      this._companyApiRest.actualizarCompany(company).subscribe(data => {
        this.toastr.info('La empresa fue modificada con éxito!', 'Empresa actualizada');
        this.router.navigate(['/list-companys']);
      })
    })
  }
}
