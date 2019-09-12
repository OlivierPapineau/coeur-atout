export interface IEtatFormulaire {
    champs: {
        sexe_jesuis: IChamp;
        sexe_jecherche: IChamp;
        dateNaissance__jour: IChamp;
        dateNaissance__mois: IChamp;
        dateNaissance__annee: IChamp;
        codePostal: IChamp;
        pseudo: IChamp;
        courriel: IChamp;
        motDePasse: IChamp;
        basculeTypeMotDePasse: IChamp;
        termesUtilisation: IChamp;
    };
    erreurs: { [champ: string]: string };
    messages: { [champ: string]: string };
}

export interface IChamp {
    "valeur": string;
    "estRequis": boolean;
    "estValide": boolean;
}