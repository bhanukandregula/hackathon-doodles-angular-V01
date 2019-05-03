import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { map } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';
import { tokenKey } from '@angular/core/src/view';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService){

    }

    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put('https://miracle-hackathon-may022019.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes());
    }

    getRecipes(){
        
        const token = this.authService.getToken();
        console.log("This is the Token value: ", token);
           
        this.http.get('https://miracle-hackathon-may022019.firebaseio.com/recipes.json?auth='+token)
            .pipe(
                map(
                    (response: Response) => {
                        const recipes: Recipe[] = response.json();
                        for(let recipe of recipes){
                            if(!recipe['ingredients']){
                                console.log("This is the recipe - ",recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}