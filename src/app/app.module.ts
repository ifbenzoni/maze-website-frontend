import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SquareComponent } from './square/square.component';
import { MazeVisualComponent } from './maze-visual/maze-visual.component';

import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { SolveComponent } from './solve/solve.component';
import { SavesComponent } from './saves/saves.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PolicyPageComponent } from './policy-page/policy-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'game', component: SolveComponent },
  { path: 'saves', component: SavesComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'privacy', component: PolicyPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SquareComponent,
    MazeVisualComponent,
    DemoComponent,
    SolveComponent, 
    SavesComponent,
    AdminPageComponent, 
    PolicyPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
