/**
 * @author: Olivier Papineau
 * @email: olivier.12.papineau@gmail.com
 */
import {IEtatFormulaire} from './typages/interfaces';
import {initialiserEtat} from "./utilitaires/initialiserEtat";
import {Etapes} from "./Etapes";

export class Validations {

    // ATTRIBUTS
    private objMessages: JSON;
    private refBarreEtapes: Etapes = null;

    // -- Éléments de formulaire à valider
    // Étape 1
    private refarrJeSuis: HTMLElement[] = Array.apply(null, document.querySelectorAll('[name=jesuis_genre]'));
    private refArrElements: HTMLInputElement[] = Array.apply(null, document.querySelectorAll('.champ'));
    private etatFormulaire = initialiserEtat();

    // Constructeur
    constructor(barreEtapes: Etapes, objJSON?: JSON) {
        this.refBarreEtapes = barreEtapes;

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
        this.verifierSection();
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
                element.addEventListener("blur", this.verifierSection);
            }
            if (element.name === "date_naissance__mois") {
                element.addEventListener("change", this.controlerChamp);
            }
        });
        console.table(this.objMessages);
    };

    /*
    * @METHOD valider
    * @Params: e -> evenement
    * Valide la valeur au "blur" du champp courant et met a jour son etat de validation
    * dans l'objet d'etat
    *
    * @return void
    * */
    // Méthodes de validation
    private valider = (e) => {
        let copieEtat = {...this.etatFormulaire};
        const regexChamp = new RegExp(e.currentTarget.pattern);
        console.log("regex: ", regexChamp);

        //Si le champ fait partie des champs DATE
        if (e.currentTarget.classList[0].indexOf("dateNaissance") > -1) {
            //console.log("Ceci est un champ de date");
            switch (e.currentTarget.classList[0]) {
                case "dateNaissance__jour":
                    console.log("Champ jour");
                    console.log(e.currentTarget.classList[0]);
                    //Si le champ possede une valeur fautive
                    if (!e.currentTarget.value) {
                        //Le mettre invalide dans l'etat
                        this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = false;
                        //Lui mettre la classe invalide
                        e.currentTarget.classList.add("invalide");
                        //Ajouter le message d'erreur correspondant a son champ dans le paragraphe d'erreur
                        document.getElementById(`${e.currentTarget.classList[0]}--message`).innerHTML = this.objMessages["dateNaissance"].erreurs.type.jour;
                        //Ajouter la classe de message invalide
                        document.getElementById(`${e.currentTarget.classList[0]}--message`).classList.add("messageInvalide");
                    } else { //Si le champ possede une valeur valide
                        //Mettre son etat a valide
                        this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = true;
                        //Si la classe invalide existe dessus, l'enlever
                        if (e.currentTarget.classList.contains("invalide")) {
                            e.currentTarget.classList.remove("invalide");
                        }
                        //Lui mettre la classe valide
                        e.currentTarget.classList.add("valide");

                        //Enlever le message d'erreur
                        document.getElementById(`${e.currentTarget.classList[0]}--message`)
                            .innerHTML = "";
                        document.getElementById(`${e.currentTarget.classList[0]}--message`)
                            .classList.remove("messageInvalide");
                    }
                    break;
                case "dateNaissance__mois":
                    console.log("Champ mois");
                    if (this.etatFormulaire.champs[e.currentTarget.classList[0]].valeur === "") {
                        this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = false;
                        e.currentTarget.classList.add("invalide");
                        document.getElementById(`${e.currentTarget.classList[0]}--message`).innerHTML = this.objMessages["dateNaissance"].erreurs.type.mois;
                        document.getElementById(`${e.currentTarget.classList[0]}--message`).classList.add("messageInvalide");
                    } else {
                        this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = true;
                        if (e.currentTarget.classList.contains("invalide")) {
                            e.currentTarget.classList.remove("invalide");
                        }
                        e.currentTarget.classList.add("valide");

                        document.getElementById(`${e.currentTarget.classList[0]}--message`)
                            .innerHTML = "";
                        document.getElementById(`${e.currentTarget.classList[0]}--message`)
                            .classList.remove("messageInvalide");
                    }
                    break;
                case "dateNaissance__annee":
                    console.log("Champ annee");
                    if (!e.currentTarget.value) {
                        this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = false;
                        e.currentTarget.classList.add("invalide");
                        document.getElementById(`${e.currentTarget.classList[0]}--message`).innerHTML = this.objMessages["dateNaissance"].erreurs.type.annee;
                        document.getElementById(`${e.currentTarget.classList[0]}--message`).classList.add("messageInvalide");
                    } else {
                        this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = true;
                        if (e.currentTarget.classList.contains("invalide")) {
                            e.currentTarget.classList.remove("invalide");
                        }
                        e.currentTarget.classList.add("valide");

                        document.getElementById(`${e.currentTarget.classList[0]}--message`)
                            .innerHTML = "";
                        document.getElementById(`${e.currentTarget.classList[0]}--message`)
                            .classList.remove("messageInvalide");
                    }
                    break;
            }
        //Si le champ est d'un autre type et que sa valeur correspond a son expression reguliere
        } else if (!e.currentTarget.value.match(regexChamp)) {
            //Si le champ est invalide, change le state pour invalide
            this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = false;

            //Met la classe invalide au champ
            e.currentTarget.classList.add("invalide");

            //Fait apparaitre le message d'erreur
            document.getElementById(`${e.currentTarget.classList[0]}--message`)
                .innerHTML = this.objMessages[e.currentTarget.classList[0]].erreurs.motif;
            document.getElementById(`${e.currentTarget.classList[0]}--message`)
                .classList.add("messageInvalide");

        } else {
            //Si le champ est valide, change le state pour valide
            this.etatFormulaire.champs[e.currentTarget.classList[0]].estValide = true;

            //Si le champ contient la classe invalide, l'enleve
            if (e.currentTarget.classList.contains("invalide")) {
                e.currentTarget.classList.remove("invalide");
            }

            //Met la classe valide au champ
            e.currentTarget.classList.add("valide");

            //Fait disparaitre le message d'erreur
            document.getElementById(`${e.currentTarget.classList[0]}--message`)
                .innerHTML = "";
            document.getElementById(`${e.currentTarget.classList[0]}--message`)
                .classList.remove("messageInvalide");
        }
        this.verifierSection();
    };

    private validerBoutonsRadio = () => {
        this.verifierSection();
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

    private verifierSection = () => {
        console.log("Methode enclenchee");
        const {
            sexe_jesuis,
            sexe_jecherche,
            dateNaissance__jour,
            dateNaissance__mois,
            dateNaissance__annee,
            codePostal,
            pseudo,
            courriel,
            motDePasse,
            termesUtilisation,
        } = this.etatFormulaire.champs;

        if (sexe_jesuis.estValide && sexe_jecherche.estValide) {
            this.refBarreEtapes.gererActivationBouton(1, true);
            console.log("section1 valide")
        } else {
            this.refBarreEtapes.gererActivationBouton(1, false);
            console.log("section1 NON VALIDE");
        }

        if (dateNaissance__jour.estValide &&
            dateNaissance__mois.estValide &&
            dateNaissance__annee.estValide &&
            codePostal.estValide) {
            this.refBarreEtapes.gererActivationBouton(2, true);
            console.log("section2 valide")
        } else {
            this.refBarreEtapes.gererActivationBouton(2, false);
        }

        if (pseudo.estValide &&
            courriel.estValide &&
            motDePasse.estValide &&
            termesUtilisation.estValide) {
            this.refBarreEtapes.gererActivationBouton(3, true);
            console.log("section3 valide")
        } else {
            this.refBarreEtapes.gererActivationBouton(3, false);
        }
    };
}