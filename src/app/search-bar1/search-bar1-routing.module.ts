import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBar1Page } from './search-bar1.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBar1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBar1PageRoutingModule {}
