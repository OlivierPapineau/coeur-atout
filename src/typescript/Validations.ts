/**
 * @author: Olivier Papineau
 * @email: olivier.12.papineau@gmail.com
 */
import { IEtatFormulaire } from './typages/interfaces';
import { initialiserEtat } from "./utilitaires/initialiserEtat";

export class Validations {

    // ATTRIBUTS
    private objMessages: JSON;

    // -- Éléments de formulaire à valider
    // Étape 1
    private refarrJeSuis: HTMLElement[] = Array.apply(null, document.querySelectorAll('[name=jesuis_genre]'));
    private refArrElements: HTMLInputElement[] = Array.apply(null, document.querySelectorAll('.champ'));

    private etatFormulaire = initialiserEtat();
    // Constructeur
    constructor(objJSON?: JSON) {

        document.querySelector('form').noValidate = true;
        fetch('./assets/objMessages.json')
            .then(response => response.json())
            .then(response => {
                this.objMessages = response;
                this.initialiser();
            });
    }

    //Initialisation des ecouteurs d'evenements
    private initialiser = (): void => {
        this.refarrJeSuis.forEach(element => {
           element.addEventListener("blur", this.valider);
        });

        // Ajout d'ecouteurs d'evenements par type de champ
        this.refArrElements.forEach(element => {
           element.addEventListener("blur", this.valider);
           if (
               element.type === "text" ||
               element.type === "number" ||
               element.type === "email" ||
               element.type === "password") {
               element.addEventListener("keyup", this.controlerChamp);
               element.addEventListener("change", this.controlerChamp);
           }
           if (element.type === "radio") {
               element.addEventListener("click", this.controlerChamp);
           }
           if (element.name === "date_naissance__mois") {
               element.addEventListener("change", this.controlerChamp);
           }
        });
        console.table(this.objMessages);
    };

    // Méthodes de validation
    private valider = (e) => {
        let copieEtat = {...this.etatFormulaire};
        console.log("copieEtat: ", copieEtat);
        //console.log(e.currentTarget);
        //console.log(e.currentTarget.pattern);
        const regexChamp = new RegExp(e.currentTarget.pattern);
        console.log("regex: ", regexChamp);

        if (!e.currentTarget.value.match(regexChamp)) {
            //Si le champ est invalide, change le state pour invalide
            copieEtat.champs[e.currentTarget.classList[0]].estValide = false;

            //Met la classe invalide au champ
            e.currentTarget.classList.add("invalide");
            console.log(copieEtat.champs[e.currentTarget.classList[0]]);
        } else {
            //Si le champ est valide, change le state pour valide
            copieEtat.champs[e.currentTarget.classList[0]].estValide = true;

            //Si le champ contient la classe invalide, l'enleve
            if (e.currentTarget.classList.contains("invalide")) {
                e.currentTarget.classList.remove("invalide");
            }

            //Met la classe valide au champ
            e.currentTarget.classList.add("valide");

            console.log(copieEtat.champs[e.currentTarget.classList[0]]);
        }
    };


    // Méthodes utilitaires
    private controlerChamp = (e): void => {
        // Creation d'un object memorisant les valeurs des champs
        console.log(e.currentTarget.className);
        this.etatFormulaire = {
            ...this.etatFormulaire,
            champs: {
                ...this.etatFormulaire.champs,
                [e.currentTarget.classList[0]]: {
                    ...[e.currentTarget.classList[0]],
                    valeur: e.currentTarget.value,
                }
            },
        };
        console.log(this.etatFormulaire.champs[e.currentTarget.classList[0]]);
    };


}