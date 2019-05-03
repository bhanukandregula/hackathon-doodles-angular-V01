import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router){

    }

    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => {
                    console.log("There is an error: ", error);
                }
            );
    }

    signInUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/'])
                    console.log("This is the response: ", response);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                            }
                        );
                }
            )
            .catch(
                error => {
                    console.log("This is the error:", error);
                }
            );
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }

    getToken(){
        console.log("Token is trying to get........");
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => {
                this.token = token;
            }
        );

        return this.token;
    }

    isAuthenticated(){
        return this.token != null;
    }
}