import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcertComponent } from 'src/app/components/concert/concert.component';
import { PlaylistManagerComponent } from 'src/app/components/playlist-manager/playlist-manager.component';
import { TrackSearchComponent } from 'src/app/components/track-search/track-search.component';

import { PremiumDashboardComponent } from '../components/premiumUser/components/premium-dashboard/premium-dashboard.component';

const routes: Routes = [
  {path: '', 
  component:PremiumDashboardComponent, 
  children: [
    {path: 'playlistManager', component:PlaylistManagerComponent},
    {path: 'trackSearch', component:TrackSearchComponent},
    {path: 'concert', component:ConcertComponent},
    {path: '', redirectTo: '/premiumUser', pathMatch: 'full'}
   ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumUserRoutingModule { }