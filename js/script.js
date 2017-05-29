console.log("Ce programme JS vient d'être chargé");
$(document).ready(function() {
    //On cache tous les formulaires
    console.log("Le document est pret");

    //Section client, lorsqu'on appuie sur une touche dans le formulaire
    $('#formClient .client').keyup(function(e) {
        console.log("touche appuyé dans le formulaire client");
        //On récupère la valeur que l'utilisateur à tapé dans la case
        var texte = $(this).val();
        //On test si celui-ci correspond bien à un nom/prénom ou à une date du type jj/mm/2017
        if ((/^[a-zA-Z]+[\-]*[a-zA-Z]*$/.test(texte) && texte.length < 20) || (/^[0-3][0-9]\/[0-1][0-9]\/2017$/.test(texte) && texte.length == 10)) {
            //Si le texte qui est dans la case correspond à une des conditions au dessus alors met en vert le champ texte
            $(this).addClass('correcte');
            $(this).removeClass('incorrecte');
        } else {
            //Sinon on met le champ en rouge
            $(this).addClass('incorrecte');
            $(this).removeClass('correcte');
        }
        $(this).removeClass('rien');
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
        //On vérifie maintenant que toutes la classe sont correcte donc si il y'a un input avec la classe incorrecte alors on sort
        if ($('#formClient .client').hasClass('incorrecte') || $('#formClient .client').hasClass('rien')) {
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
            var nom = $('<ul id="enreClient"><li id="nomP"></li><li id="prenomP"></li><li id="dateP"></li></ul><span id="nouvClient">Nouveau client?</span>');
            nom.find('#nomP').text("Nom du client : " + client.nom.toUpperCase());
            nom.find('#prenomP').text("Prénom du client : " + client.prenom.toUpperCase());
            nom.find('#dateP').text("Date de dépôt : " + client.date);
            //Et pour finir on ajoute le résultat dans la partie récapitulatif (droite)
            $('#client').append(nom);
            var total = $('<p>Total (TTC): <span id="totalCommande">0</span>€</p><hr class="hr">');
            $('#totalTTC').append(total);
        }
        $('#priseClient').show();
        $('#priseCommande').show();
    });

    //Section formulaire dynamique, appuie sur un des sous-article
    $('.boutonSousArticle').click(function(e) {
        if ($(this).parent().find('.plusMoins').first().is(":visible")) {
            $(this).parent().find('.plusMoins').first().hide();
        } else {
            $('.boutonSousArticle').parent().find('.plusMoinsAr').hide();
            $(this).parent().find('.plusMoins').first().show();
        }
    })

    //Section formulaire dynamique, appuie sur un des menus qui peut être développé 
    $('.boutonDev').click(function(e) {
        console.log("Bouton menu cliqué");
        //Si on veut ouvrir le cadre de service et qu'il n'est pas visible
        if ($(this).text() === "Services" && !($(this).parent().find('.plusMoins').first().is((":visible")))) {
            $('#merceries').find('.plusMoins').hide();
            $(this).parent().find('.plusMoins').first().show();
            return;
            //Si on veut ouvrir le cadre de mercerie et qu'il n'est pas visible
        } else if ($(this).text() === "Merceries" && !($(this).parent().find('.plusMoins').first().is((":visible")))) {
            $('#services').find('.plusMoins').hide();
            $(this).parent().find('.plusMoins').first().show();
            return;
            //Si on veut fermer le cadre
        } else if ($(this).parent().find('.plusMoins').first().is((":visible"))) {
            $(this).parent().find('.plusMoins').first().hide();
            return;
        }
        //Sinon si c'est c'est cadre normal
        else if ($(this).parent().find($('.plusMoins')).first().is(":visible")) {
            $(this).parent().find($('.plusMoins')).first().hide();
        } else {
            $('.boutonDetail').hide();
            $(this).parent().find($('.plusMoins')).first().show();
        }
    });

    //Section des récapitulatifs des commandes, lorsqu'on clique sur le bouton supprimer
    $('#recapCommande').on('click', '.croixTD', function(e) {
        console.log("Appuie sur le bouton supprimer");
        //On demande à l'utilisateur de confirmer son choix de suppression
        if (confirm("Etes-vous sûr de vouloir supprimer la commande?") == true) {
            //On récupère le sous-total de l'article 
            var sousTotalSuppr = parseInt($(this).parent().find('.prixTotalArticle').text());
            //Et on le déduis de la valeur total de la commande
            var nouvTotal = parseInt($('#totalCommande').text()) - sousTotalSuppr;
            //On supprime le contenu
            $(this).parent().remove();
            //On affecte le nouveau Total
            $('#totalCommande').text(nouvTotal);
            $('#boutonEnreCom').hide();
        }
    });

    //Section des récapitulatifs, lorsqu'une touche est relaché dans le input de la valeur de la quantité
    $('#recapCommande').on('keyup', '.recapArticle .valeurQuantite', function(e) {
        console.log("modification du champ de quantité");
        //On récupère la nouvelle valeur de la quantité
        var nouvQuantite = $(this).val();
        //On contrôle si c'est bien un chiffre/nombre compris entre 1 et 50 inclus
        if ((/^[1-9]+$/.test(nouvQuantite)) && nouvQuantite <= 50) {
            //On récupère l'ancien total
            var ancienTotal = parseInt($('#totalCommande').text());
            //On récupère aussi l'ancien total de l'article
            var ancienArticleTotal = parseInt($(this).parent().find('.prixTotalArticle').text());
            //On récupère aussi le prix unitaire de l'article
            var prixUnit = $(this).parent().find('.prixUnite').text();
            //On soustrait au total le sous-total de l'article
            ancienTotal = ancienTotal - ancienArticleTotal;
            //On écrase la valeur du sous-total de l'article par le nouveau sous-total
            $(this).parent().find('.prixTotalArticle').text(prixUnit * nouvQuantite);
            //Et on écrase l'ancienne valeur du Total par le nouveau
            $('#totalCommande').text(ancienTotal + (prixUnit * nouvQuantite));
        }
    });

    //Section récapitulatif, modification de la quantité
    $('body').on('click', '.quantite .changeQuantite', function(e) {
        console.log("Appuie sur le bouton moins ou plus");
        //On récupère l'actuelle valeur de la quantité
        var valeur = $(this).parent().parent().find('.valeurQuantite').val();
        //On récupère aussi la valeur du prix de l'article à l'unité
        var prixTotal = $(this).parent().parent().find('.prixTotalArticle').text() / valeur;
        //On récupère la valeur du total de la commande
        var total = parseInt($("#totalCommande").text());
        //Si l'utilisateur à cliqué sur le bouton moins
        if ($(this).hasClass('imageMoins')) {
            //On vérifie que la valeur de la quantité est strictement supérieur à 1
            if (valeur > 1) {
                console.log("Valeur différente de 1 donc on décrémente.");
                //Si c'est la cas alors on décrémente valeur
                valeur--;
                //On soustrait du total la valeur à l'unité de l'article
                total = parseInt(total) - parseInt(prixTotal);
                //Le nouveau sous-total est lui aussi soustrait par la valeur à l'unité de l'article
                prixTotal = prixTotal * valeur;
            } else {
                //Sinon on alerte l'utilisateur que la quantité ne peut pas être nulle
                alert("La quantité ne peut pas être nulle");
                return;
            }
            //Dans le cas ou l'utilisateur à cliqué sur le bouton plus
        } else {
            //On vérifie que la valeur est strictement inférieur à 50
            if (valeur < 50) {
                //Si c'est le cas alors on incrémente la valeur
                valeur++;
                //On remet le nouveau total
                total = parseInt(total) + parseInt(prixTotal);
                //On remet le nouveau sous-total
                prixTotal = prixTotal * valeur;
            } else {
                //Sinon on alerte l'utilisateur que la quantité ne peut pas être supérieur à 50
                alert("La quantité ne peut pas être supérieur à 50");
                return;
            }
        }
        //Et pour finir on écrase les anciennes valeur de la quantité, du sous-total et du total par les nouvelles
        $(this).parent().parent().find('.valeurQuantite').val(valeur);
        $(this).parent().parent().find('.prixTotalArticle').text(prixTotal);
        $("#totalCommande").text(total);
    });

    //Section Service, une touche est relaché dans une des cases d'un formulaire
    $('.mesure').keyup(function(e) {
        console.log("Bouton relaché dans mesure");
        //On récupère la valeur qui se trouve dans la case
        var texte = $(this).val();
        //On vérifie si c'est bien un nombre non-nul et qui ne dépassent pas 5 caractères
        //Sa peut être un nombre entier ou décimal
        if ((/^[0-9]+$/.test(texte) || /^[0-9]+.[0-9]+$/.test(texte)) && texte.length < 5 && texte != 0) {
            //On met en vert le champ de texte et on met la classe correcte
            $(this).addClass('correcte');
            $(this).removeClass('incorrecte');
            $(this).removeClass('rien');
        } else {
            //Sinon si c'est incorrecte alors on met en rouge le champ texte
            $(this).addClass('incorrecte');
            $(this).removeClass('correcte');
            $(this).removeClass('rien');
        }
    });

    //Section mercerie, si on enregistre une commande
    $('#merceries .boutonEnre').click(function(e) {
        console.log("Bouton enregistré cliqué");
        //On vérifie que la quantité est bonne
        if ($(this).parent().find('.mesure').hasClass('incorrecte') || $(this).parent().find('.mesure').hasClass('rien')) {
            alert("Erreur! La quantité que vous avez rentré est incorrecte.");
            return;
        }
        //On demande à l'utilisateur de confirmer l'enregistrement de la commande
        if (confirm("Confirmer l'enregistrement de la commande?") == false)
            return;
        //On récupère toutes les valeurs utiles pour l'enregistrement de la commande
        var nomArticle = $(this).parent().parent().find('.boutonDev').text();
        var quantite = $(this).parent().find('.valeurQuantite').val();
        var prixUnit = $(this).parent().find('.prixUnitaire').text();
        var sousTotal = parseInt(prixUnit) * parseInt(quantite);
        var total = parseInt($('#totalCommande').text());
        //On créer la liste de la commande
        var article = $('<ul class="recapArticle"><li class="croixTD">Supprimer</li><li class="typeOffre"></li><li class="intitule"></li><li class="quantite"><span>Quantité :</span><span class="moins"><img class="imageMoins changeQuantite" src="./photos/moins.png"></span><input class="valeurQuantite" type="text" value=""><span class="plus"><img class="imagePlus changeQuantite" src="./photos/plus.png"></span><p>Prix unitaire TTC (en €) : <span class="prixUnite"></span></p><p class="prix">Total de l\'article TTC (en €) : <span class="prixTotalArticle"></span></p><hr class="hr"></li></ul>');
        //On insère les différentes valeurs à l'intérieur de celle-ci
        article.find('.typeOffre').text("Mercerie");
        article.find('.intitule').text(nomArticle);
        article.find('.valeurQuantite').val(quantite);
        article.find('.prixUnite').text(prixUnit);
        article.find('.prixTotalArticle').text(sousTotal);
        //On met à jour le total de la commande
        $('#totalCommande').text(sousTotal + total);
        //On ajoute la liste dans les récapitulatifs de commande
        $('#recapCommande').append(article);
        $('#boutonEnreCom').show();
    });

    //Section Services, un des bouton d'enregistrement est cliqué
    $('#services .boutonEnre').click(function(e) {
        console.log("Bouton enregistré cliqué");
        //On regarde si tous les messages d'erreurs sont visibles ou non
        if ($(this).parent().find('.mesure').hasClass('incorrecte') || $(this).parent().find('.mesure').hasClass('rien')) {
            //Si il y a au moins un message d'erreur qui est visible alors on informe l'utilisateur
            alert("Erreur! Les mesures que vous avez rentré sont soit incorrecte, soit incomplète.");
            return;
        }
        if ($(this).parent().find('.valeurQuantite').val() <= 0) {
            alert("Erreur! La quantité que vous avez rentré est incorrecte.");
            return;
        }
        //On fait confirmer l'utilisateur pour l'enregistrement d'une commande
        if (confirm("Confirmer l'enregistrement de la commande?") == false)
            return;
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
        //On récupère la valeur de la quantité de l'article
        var quantite = $(this).parent().find('.valeurQuantite').val();
        //On récupère le prix à l'unité de l'article
        var prix = parseInt($(this).parent().find('.prixUnitaire').text());
        //On va créer des balises tableaux afin de mettre toutes les informations à l'intérieur
        var choix = $('<ul class="recapArticle"><li class="croixTD">Supprimer</li><li class="typeOffre"></li><li class="intitule"></li><li class="lesMesures"></li><li class="quantite"><span>Quantité :</span><span class="moins"><img class="imageMoins changeQuantite" src="./photos/moins.png"></span><input class="valeurQuantite" type="text" value=""><span class="plus"><img class="imagePlus changeQuantite" src="./photos/plus.png"></span><p>Prix unitaire TTC (en €) : <span class="prixUnite"></span></p><p class="prix">Total de l\'article TTC (en €) : <span class="prixTotalArticle"></span></p><hr class="hr"></li></ul>');
        //On insère les différente valeurs récupérer auparavant
        choix.find('.typeOffre').text("Service");
        choix.find('.intitule').text(intitule);
        choix.find('.valeurQuantite').val(quantite);
        choix.find('.prixUnite').text(prix);
        prix = prix * quantite;
        choix.find('.prixTotalArticle').text(prix);
        var total = parseInt($('#totalCommande').text());
        $('#totalCommande').text(total + prix);
        i = 0;
        //Pour chaque valeur qui se trouve dans le tableau d'information récupérer auparavant on va effectué cette fonction
        for (var i = 0; i < commande.length; i += 2) {
            //On créer des balises tableaux
            var liste = $('<ul class="mesures"><li><span class="mesu"></span><span class="valeurMesure"></span></li><span class="modifMesure">Modifier mesure</span></ul>');
            //On va ensuite insérer la valeur qui se trouve dans le tableau à i position dans cette balise
            liste.find('.mesu').text(commande[i] + " : ");
            liste.find('.valeurMesure').text(commande[i + 1]);
            //On rajoute chaque tableau créer dans le tableau qui plus en haut
            choix.find('.lesMesures').append(liste);
        };
        //Dès qu'on a fini de tout rentrer alors on insère le tout dans la partie récapitulatif
        $('#recapCommande').append(choix);
        $('#boutonEnreCom').show();
    });

    //Section des récapitulatifs des commandes, lorsque l'utilisateur veut modifier une mesure
    $('#recapCommande').on('click', '.modifMesure', function(e) {
        console.log("Appuie sur la touche modifier mesure");
        var ancienneVal = $(this).parent().find('valeurMesure').text();
        //prompt permet d'afficher une fenêtre avec un champ de type texte pour la nouvelle valeur
        var modif = prompt("Nouvelle mesure : ", ancienneVal);
        //Si l'utilisateur clique sur cancel alors on return
        if (modif === null)
            return;
        if (modif == "" || !(/^[1-9]+$/.test(modif)) || modif < 1) {
            alert("Erreur! Valeur incorrecte!");
            return;
        } else
            $(this).parent().find('.valeurMesure').text(modif);
    });

    //Section récapitulatif du client, si l'utilisateur veut un nouveau client
    $('#recap').on('click', '#nouvClient', function(e) {
        //On demande à l'utilisateur si il veut saisir un nouveau client
        if (confirm("Est-vous sur de vouloir saisir un nouvelle client?") == true)
            location.reload();
    });


    $('#boutonEnreCom').click(function(e) {
        if ($('#totalCommande').text() === '0') {
            alert("Erreur! Vous n'avez pas saisie d'article");
            return;
        }
        if (confirm("Etes-vous sûr de vouloir terminer la commande?") == true) {
            alert("Bravo! La commande a été sauvegardé avec succès!");
            if (confirm("Saisir une nouvelle commande?") == true)
                location.reload();
            else
                return;
        } else
            return;
    });

    console.log("La mise en place est finie. En attente d'événements...");
});

// //Section saisie d'un client, lorsque la souris passe dans la zone 
    // $('#formClient').mouseover(function(e) {
    //     //On récupère les informations du client
    //     var client = {
    //         nom: $('#nom').val(),
    //         prenom: $('#prenom').val(),
    //         date: $('#date').val()
    //     };
    //     //Et on regarde si ils sont correcte
    //     if (/^[a-zA-Z]+[\-]*[a-zA-Z]*$/.test(client.nom) && client.nom.length < 20) {
    //         $('#nom').addClass('correcte');
    //         $('#nom').removeClass('rien');
    //     }
    //     if (/^[a-zA-Z]+[\-]*[a-zA-Z]*$/.test(client.prenom) && client.nom.length < 20) {
    //         $('#prenom').addClass('correcte');
    //         $('#prenom').removeClass('rien');
    //     }
    //     if (/^[0-3][0-9]\/[0-1][0-9]\/2017$/.test(client.date) && client.date.length == 10) {
    //         $('#date').addClass('correcte');
    //         $('#date').removeClass('rien');
    //     }
    //     //Cette fonction permet de palier au refresh f5
    // });