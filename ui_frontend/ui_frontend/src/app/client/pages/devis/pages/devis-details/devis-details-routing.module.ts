import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevisDetailsComponent } from './devis-details.component';

const routes: Routes = [{ path: '', component: DevisDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevisDetailsRoutingModule { }
