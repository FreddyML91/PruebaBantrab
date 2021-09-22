import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-companys',
  templateUrl: './create-companys.component.html',
  styleUrls: ['./create-companys.component.css']
})

export class CreateCompanysComponent implements OnInit {
  createCompany: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _companyService: CompanyService, private router: Router, private toastr: ToastrService) {
    this.createCompany = this.fb.group({
      nombre: ['', Validators.required],
      razon: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nit: ['', Validators.required],
      estado: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarEmpresa()
  {
    this.submitted = true;
    if (this.createCompany.invalid)
    {
      return;
    }

    const company: any = {
      nombre: this.createCompany.value.nombre,
      razon: this.createCompany.value.razon,
      telefono: this.createCompany.value.telefono,
      correo: this.createCompany.value.correo,
      nit: this.createCompany.value.nit,
      estado: this.createCompany.value.estado,
      direccion: this.createCompany.value.direccion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._companyService.agregarCompany(company).then(() => {
      this.toastr.success('La empresa fue registrada con éxito!', 'BanTrab');
      this.router.navigate(['/list-companys']);
    }).catch(error => {
      this.toastr.error(error, 'BanTrab');
    })
  }
}
