import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterPlayersComponent } from './enter-players/enter-players.component';
import { EnterWrestlerDetailsComponent } from './enter-wrestler-details/enter-wrestler-details.component';

const routes: Routes = [
  { path: '', component: EnterPlayersComponent   },
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  


}
