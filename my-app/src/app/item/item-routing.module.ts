import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'item', redirectTo: 'item/index', pathMatch: 'full'},
  { path: 'item/index', component: IndexComponent },
  { path: 'item/:itemId/view', component: ViewComponent },
  { path: 'item/create', component: CreateComponent },
  { path: 'item/:itemId/edit', component: EditComponent } 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
