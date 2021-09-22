import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  constructor(private firestore: AngularFirestore) { }

  agregarCompany(company: any) : Promise<any>
  {
    return this.firestore.collection('companys').add(company);
  }

  getCompanys() : Observable<any> {
    return this.firestore.collection('companys', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarCompany(id: string) : Promise<any>
  {
    return this.firestore.collection('companys').doc(id).delete();
  }

  getCompany(id: string) : Observable<any>
  {
    return this.firestore.collection('companys').doc(id).snapshotChanges();
  }

  actualizarCompany(id: string, data: any) : Promise<any>
  {
    return this.firestore.collection('companys').doc(id).update(data);
  }
}
