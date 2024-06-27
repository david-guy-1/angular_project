import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';

import { AppComponent } from './app.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { AddStuffComponent } from './add-stuff/add-stuff.component';

export const routes: Routes = [{"path" : "data", "component" : ItemComponent}, 

    {"path":"exp", "component":ExpenseEntryComponent},
    {"path":"index", "component":AppComponent},{"path":"add", "component":AddStuffComponent}
];
