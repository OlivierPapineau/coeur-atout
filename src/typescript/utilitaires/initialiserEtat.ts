import {IEtatFormulaire} from "../typages/interfaces";

export const initialiserEtat = ():IEtatFormulaire => {
    return {
        champs: {
            sexe_jesuis: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            sexe_jecherche: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            dateNaissance__jour: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            dateNaissance__mois: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            dateNaissance__annee: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            codePostal: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            pseudo: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            courriel: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            motDePasse: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            basculeTypeMotDePasse: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
            termesUtilisation: {
                valeur: "",
                estRequis: true,
                estValide: true,
            },
        },
        erreurs: {} as {[champ: string]: string},
        messages: {} as {[champ: string]: string},
    }
};