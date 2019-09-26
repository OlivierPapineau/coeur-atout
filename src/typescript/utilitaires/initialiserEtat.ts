import {IEtatFormulaire} from "../typages/interfaces";

export const initialiserEtat = ():IEtatFormulaire => {
    return {
        champs: {
            sexe_jesuis: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            sexe_jecherche: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            dateNaissance__jour: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            dateNaissance__mois: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            dateNaissance__annee: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            codePostal: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            pseudo: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            courriel: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            motDePasse: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            basculeTypeMotDePasse: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
            termesUtilisation: {
                valeur: "",
                estRequis: false,
                estValide: false,
            },
        },
        erreurs: {} as {[champ: string]: string},
        messages: {} as {[champ: string]: string},
    }
};