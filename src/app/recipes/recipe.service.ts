import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // recipeSelected = new EventEmitter<Recipe>();

  // This Recipe is a Model that has a object syntax.
  private recipes: Recipe[] = [
    new Recipe('Miracle Christmas',
      'Merry Christmas','https://s3.amazonaws.com/miracle-hackthon-doodles-fun/christmas.jpeg', 
      [ 
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 3)
      ]),

    new Recipe('Hackathon',
      'Hackathon','https://d3avoj45mekucs.cloudfront.net/rojakdaily/media/jessica-chua/lifestyle/2017/may/doodle%204%20google/google.png?ext=.png',
      [ 
        new Ingredient('Avacado', 1),
        new Ingredient('Onions', 3)
      ]),

    new Recipe('Mothers Day', 
      'Happy Mothers Day.','https://s3.amazonaws.com/miracle-hackthon-doodles-fun/mothersday.jpeg',
      [ 
        new Ingredient('Chiles', 20),
        new Ingredient('Eggs', 18)
      ])
  ];

  constructor(private slService: ShoppingListService){

  }

  setRecipes(recipes: Recipe[]){
    this.recipes =  recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(Ingredients: Ingredient[]){
    this.slService.addIngredients(Ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    console.log("This is from recipe service - to update.");
    console.log("This is the index value", this.recipes[index]);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

