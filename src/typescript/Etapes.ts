
export class Etapes {
    //Elements de gestion
    private arrSections: HTMLElement[] = Array.apply(null, document.querySelectorAll(".section_formulaire"));
    private arrEtapes: HTMLElement[] = Array.apply(null, document.querySelectorAll(".formulaire__etapes__bulle"));

    //Elements boutons
    private btnSuivant1 = document.getElementById("btnSuivantSection1");
    private btnPrecedent2 = document.getElementById("btnPrecedentSection2");
    private btnSuivant2 = document.getElementById("btnSuivantSection2");
    private btnPrecedent3 = document.getElementById("btnPrecedentSection3");

    //Element soumission
    private boutonSoumettre: HTMLElement = document.querySelector("[type=submit]");


    public constructor() {
        this.initialiserClasses();
        this.initialiserEcouteurs();
    }

    private initialiserClasses = () => {
        //Ajout des classes de visibilite
        this.arrSections[1].classList.add("visuallyhidden");
        this.arrSections[2].classList.add("visuallyhidden");

        //Desactivation du bouton soumettre
        this.boutonSoumettre.setAttribute("disabled", "disabled");
        //Ajouter la classe desactive sur les boutons de controle
    };

    private initialiserEcouteurs = () => {
        //Section 1
        this.btnSuivant1.addEventListener("click", () => {
            this.gererZone(1);
            console.log("boutonSuivant1");
        });

        //Section 2
        this.btnSuivant2.addEventListener("click", () => {
            this.gererZone(2, true);
        });
        this.btnPrecedent2.addEventListener("click", () => {
           this.gererZone(2);
        });

        //Section3
        this.btnPrecedent3.addEventListener("click", () => {
            this.gererZone(3);
        });
    };

    private gererZone = (sectionBouton: number, estTermine: boolean = false) => {
        switch(sectionBouton) {
            case 1:
                this.arrSections[0].classList.add("visuallyhidden");
                this.arrSections[1].classList.remove("visuallyhidden");

                this.arrEtapes[0].classList.remove("bulle-active");
                this.arrEtapes[1].classList.add("bulle-active");
                break;
            case 2:
                if (estTermine) {
                    this.arrSections[1].classList.add("visuallyhidden");
                    this.arrSections[2].classList.remove("visuallyhidden");

                    this.arrEtapes[1].classList.remove("bulle-active");
                    this.arrEtapes[2].classList.add("bulle-active");
                } else {
                    this.arrSections[0].classList.remove("visuallyhidden");
                    this.arrSections[1].classList.add("visuallyhidden");

                    this.arrEtapes[1].classList.remove("bulle-active");
                    this.arrEtapes[0].classList.add("bulle-active");
                }
                break;
            case 3:
                if (estTermine) {
                    this.arrSections[2].classList.add("visuallyhidden");
                    this.arrSections[3].classList.remove("visuallyhidden");

                    this.arrEtapes[2].classList.remove("bulle-active");
                    this.arrEtapes[3].classList.add("bulle-active");
                } else {
                    this.arrSections[1].classList.remove("visuallyhidden");
                    this.arrSections[2].classList.add("visuallyhidden");

                    this.arrEtapes[2].classList.remove("bulle-active");
                    this.arrEtapes[1].classList.add("bulle-active");
                }
                break;
            default:
                break;
        }
    };

    public gererActivationBouton = (numeroBouton: number, active: boolean) => {
        let refBouton: HTMLElement = null;

        switch (numeroBouton) {
            case 1:
                refBouton = this.btnSuivant1;
                break;
            case 2:
                refBouton = this.btnSuivant2;
                break;
            case 3:
                refBouton = this.boutonSoumettre;
                break;
        }

        if (refBouton !== null)  {
            if (active) {
                refBouton.removeAttribute("disabled");
                refBouton.classList.remove("desactive");
            } else {
                refBouton.setAttribute("disabled", "disabled");
                refBouton.classList.add("desactive");
            }
        }
    };
}