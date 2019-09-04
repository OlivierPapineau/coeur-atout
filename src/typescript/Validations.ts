/**
 *
 */
export class Validations {

    // ATTRIBUTS
    private objMessages: JSON;

    // -- Éléments de formulaire à valider
    // Étape 1
    private refarrJeSuis: Array<HTMLElement> = Array.apply(null, document.querySelectorAll('[name=jeSuis]'));


    // Constructeur
    constructor(){

        document.querySelector('form').noValidate = true;
        /* var requestURL = './assets/js/objMessages.json';
         var request = new XMLHttpRequest();
         request.open('GET', requestURL);
         request.responseType = 'json';
         request.send();

         request.onload = function() {
             var objMessages = request.response;
         }
         this.objMessages=objMessages;*/
    }

    // Méthodes de validation


    // Méthodes utilitaires



}