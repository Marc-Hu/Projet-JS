console.log("Ce programme JS vient d'être chargé");
$(document).ready(function() {
    //On cache tous les formulaires
    $('.plusMoins').hide();
    console.log("Le document est pret");

    //Section client, lorsqu'on appuie sur une touche dans le formulaire
    $('#formClient input').keyup(function(e) {
        console.log("touche appuyé");
        //On récupère la valeur que l'utilisateur à tapé dans la case
        var texte = $(this).val();
        //On test si celui-ci correspond bien à un nom/prénom ou à une date du type jj/mm/2017
        if ((/^[a-zA-Z]+$/.test(texte) && texte.length < 20) || (/^[0-3][0-9]\/[0-1][0-9]\/2017$/.test(texte) && texte.length == 10)) {
            //Si le texte qui est dans la case correspond à une des conditions au dessus alors on cache l'erreur
            $(this).parent().find(".incoText").hide();
        } else {
            //Sinon on laisse le texte d'erreur
            $(this).parent().find(".incoText").show();
        }
    });

    //Section client, lorsqu'on appuie sur le bouton enregistrer afin d'enregistrer un nouveau client
    $('#boutonOK').mousedown(function(e) {
        console.log("Bouton OK cliqué");
        //On récupère le nom du client dans la partie récapitulatif(droite) et non la partie nouveau client (droite)
        var nom = $('#nomP').val();
        //On test le nom pour savoir si on a oui ou non déjà un client en cours de traitement
        if (nom != null) {
            //Si il y a déjà un client alors on alerte l'utilisateur et on fait un return
            alert("Erreur! Vous avez déjà saisie un client!");
            return;
        }
        //Si on a passé l'étape au-dessus alors on sait qu'on a pas de client en cours
        //On vérifie maintenant que les erreurs pour les 3 cases ne sont pas visible
        if ($('#formClient span').is(":visible")) {
            //Si il y a eu moins une erreur qui est 'visible' alors on alerte l'utilisateur
            alert("Erreur! Certains champs ne sont pas complétés ou incorrect.");
            return;
        } else {
            //Sinon on peut maintenant enregistrer le client dans la partie récapitulatif (droite)
            //On commence par créer le client et récupérer son nom, prénom et sa date de dépôt des vêtements
            var client = {
                nom: $('#nom').val(),
                prenom: $('#prenom').val(),
                date: $('#date').val()
            };
            //On va insérer toutes ces informations dans des tableaux
            var nom = $('<tr><td id="nomP"></td></tr><tr><td id="prenomP"></td></tr><tr><td id="dateP"></td></tr>');
            nom.find('#nomP').text("Nom du client : " + client.nom.toUpperCase());
            nom.find('#prenomP').text("Prénom du client : " + client.prenom.toUpperCase());
            nom.find('#dateP').text("Date de dépôt : " + client.date);
            //Et pour finir on ajoute le résultat dans la partie récapitulatif (droite)
            $('#client').append(nom);
        }
    });

    //Section formulaire dynamique, appuie sur un des menus qui peut être développé 
    $('.boutonDev').click(function(e) {
        console.log("Bouton menu cliqué");
        //Avant tout on vérifie qu'on ai bien enregistré un client avant d'arriver là
        //On récupère le nom du client dans la partie récapitulatif
        var nom = $('#nomP').val();
        //Si le nom est 'null' c'est à dire si il n'y a pas de nom dans la partie récapitulatif
        if (nom == null) {
            //Alors on informe l'utilisateur qu'il n'a pas encore saisie de client et qu'il faut en saisir un avant tout
            alert("Erreur! Vous n'avez pas encore saisie de client. Veuillez saisir un client avant de pouvoir ajouter des commandes");
            return;
        }
        //On regarde si le premier caractère du 'bouton' est un +
        if ($(this).text().charAt(0) == '+') {
            //Si c'est le cas, alors on affiche son contenu
            console.log("Clique bouton plus");
            $(this).parent().find($('.plusMoins')).first().show();
            //Et on remplace le + par un -
            $(this).text($(this).text().replace('+', '-'));
        } else {
            //Sinon dans le cas contraire c'est-à-dire si le premier caractère est un -
            console.log("Clique bouton moins");
            //On cache son contenu
            $(this).parent().find($('.plusMoins')).first().hide();
            //Et on remplace le - par un +
            $(this).text($(this).text().replace('-', '+'));
        }
    });

    $('#recapCommande').on('click', '.croixTD', function(e) {
        console.log("Appuie sur le bouton supprimer");
        $(this).parent().remove();
    });

    //Section récapitulatif, modification de la quantité
    $('#recapCommande').on('click', '.quantite span', function(e) {
        console.log("Appuie sur le bouton moins ou plus");
        var valeur = $(this).parent().find('.valeurQuantite').text();
        if ($(this).text().charAt(0) == '-') {
            if (valeur != 1) {
                console.log("Valeur différente de 1 donc on décrémente.");
                valeur--;
                $(this).parent().find('.valeurQuantite').text(valeur);
            } else
                alert("La quantité ne peut pas être nulle");
        } else {
            if (valeur < 50) {
                valeur++;
                $(this).parent().find('.valeurQuantite').text(valeur);
            } else
                alert("La quantité ne peut pas être supérieur à 50");
        }
    });

    //Section Service, un bouton est relaché dans une des cases d'un formulaire
    $('.mesure').keyup(function(e) {
        console.log("Bouton relaché dans mesure");
        //On récupère la valeur qui se trouve dans la case
        var texte = $(this).val();
        //On vérifie si c'est bien un nombre non-nul et qui ne dépassent pas 5 caractères
        //Sa peut être un nombre entier ou décimal
        if ((/^[0-9]+$/.test(texte) || /^[0-9]+.[0-9]+$/.test(texte)) && texte.length < 5 && texte != 0) {
            //On cache le message d'erreur si le texte entré correspond aux critères
            $(this).parent().find($('.incoText')).hide();
        } else {
            //Sinon si c'est incorrecte alors on affiche le message d'erreur
            $(this).parent().find($('.incoText')).show();
        }
    });

    //Section Services, un des bouton d'enregistrement est cliqué
    $('.boutonEnre').click(function(e) {
        console.log("Bouton enregistré cliqué");
        //On regarde si tous les messages d'erreurs sont visibles ou non
        if ($(this).parent().find($('.incoText')).is(":visible")) {
            //Si il y a au moins un message d'erreur qui est visible alors on informe l'utilisateur
            alert("Erreur! Les mesures que vous avez rentré sont soit incorrecte, soit incomplète.");
            return;
        }
        //On créer un tableau pour récupérer toutes les informations que l'utilisateur à tapé
        var commande = [];
        var i = 0;
        $(this).parent().find($('.mesure')).each(function() {
            //On récupère le nom du placeholder
            commande[i] = $(this).attr('placeholder');
            i++;
            //Ensuite on récupère la valeur tapé
            commande[i] = $(this).val();
            i++;
        });
        //On récupère l'intitulé de la commande (exemple : un ourlet, une customisation pour pantalon etc...)
        var intitule = $(this).parent().parent().find($('.boutonDev')).text();
        //On va créer des balises tableaux afin de mettre toutes les informations à l'intérieur
        var choix = $('<ul><li class="croixTD"><img class="croixSuppr" src="photos/croix.png"></li><li class="type"></li><li class="intitule"></li><li class="lesMesures"></li><li class="quantite"><span class="moins">-</span><span class="valeurQuantite">1</span><span class="plus">+</span></li></ul>');
        //La première information (type) sera forcément services et non mercerie 
        choix.find('.type').text("Service");
        //On insère ensuite l'intitulé récupérer auparavant
        choix.find('.intitule').text(intitule);
        i = 0;
        //Pour chaque valeur qui se trouve dans le tableau d'information récupérer auparavant on va effectué cette fonction
        for (var i = 0; i < commande.length; i += 2) {
            //On créer des balises tableaux
            var liste = $('<ul><li class="mesu"></li></ul>');
            //On va ensuite insérer la valeur qui se trouve dans le tableau à i position dans cette balise
            liste.find('.mesu').text(commande[i] + " : " + commande[i + 1]);
            //On rajoute chaque tableau créer dans le tableau qui plus en haut
            choix.find('.lesMesures').append(liste);
        };
        //Dès qu'on a fini de tout rentrer alors on insère le tout dans la partie récapitulatif
        $('#recapCommande').append(choix);
    });



    console.log("La mise en place est finie. En attente d'événements...");
});