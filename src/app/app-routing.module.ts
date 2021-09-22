import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanysComponent } from './components/create-companys/create-companys.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { ListCompanysComponent } from './components/list-companys/list-companys.component';

const routes: Routes = [
    { path: '', redirectTo: 'list-companys', pathMatch: 'full' },
    { path: 'list-companys', component: ListCompanysComponent },
    { path: 'create-company', component: CreateCompanysComponent },
    { path: 'edit-company/:id', component: EditCompanyComponent },
    { path: '**', redirectTo: 'list-companys', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }