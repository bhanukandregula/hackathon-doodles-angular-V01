import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

// Declarator is this.
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private dataStorageService: DataStorageService, 
        private authService: AuthService){

    }

    onSaveData(){
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response: Response) => {
                    console.log("This is the response: ", response);
                }
            );
    }

    onFetchData(){
        console.log("Data is being fetched.");
        this.dataStorageService.getRecipes();
    }

    onLogout(){
        this.authService.logout();
    }

}

