import { Routes } from '@angular/router';
import { Principal } from './pages/principal/principal/principal';
import { Action } from './pages/dialogs/action/action';
import { ItemList } from './pages/listes/item-list/item-list';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';

export const routes: Routes = [
    // { path:'', component:Principal, children:[
    //     { path:'', component:Action},
    //     { path:'item', component:ItemList }
    // ] },
    {
        path:'', component:Dashboard
    }

];
