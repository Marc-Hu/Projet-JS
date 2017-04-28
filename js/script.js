console.log("Ce programme JS vient d'être chargé");
$(document).ready(function() {
    $('.plusMoins').hide();
    console.log("Le document est pret");

    $('#formClient input').keyup(function(e) {
        console.log("touche appuyé");
        var texte = $(this).val();
        console.log(texte);
        if ((/^[a-zA-Z]+$/.test(texte) && texte.length < 20) || (/^[0-3][0-9]\/[0-1][0-9]\/2017$/.test(texte) && texte.length == 10))
            $(this).parent().find(".incoText").hide();
        else
            $(this).parent().find(".incoText").show();
    });

    $('#boutonOK').mousedown(function(e) {
        console.log("Bouton OK cliqué");
        var nom = $('#nomP').val();
        console.log(nom);
        if (nom != null) {
            alert("Erreur! Vous avez déjà saisie un client!");
            return;
        }
        if ($('#formClient span').is(":visible"))
            alert("Erreur! Certains champs ne sont pas complétés ou incorrect.");
        else {
            var client = {
                nom: $('#nom').val(),
                prenom: $('#prenom').val(),
                date: $('#date').val()
            };
            var nom = $('<tr><td id="nomP"></td></tr><tr><td id="prenomP"></td></tr><tr><td id="dateP"></td></tr>');
            nom.find('#nomP').text("Nom du client : " + client.nom.toUpperCase());
            nom.find('#prenomP').text("Prénom du client : " + client.prenom.toUpperCase());
            nom.find('#dateP').text("Date de dépôt : " + client.date);
            $('#client').append(nom);
        }
    });

    $('.boutonDev').click(function(e) {
        console.log("Bouton menu cliqué");
        var nom = $('#nomP').val();
        if (nom == null) {
            alert("Erreur! Vous n'avez pas encore saisie de client.");
            return;
        }
        if ($(this).text().charAt(0) == '+') {
            console.log("Clique bouton plus");
            $(this).parent().find($('.plusMoins')).first().show();
            $(this).text($(this).text().replace('+', '-'));
        } else {
            console.log("Clique bouton moins");
            $(this).parent().find($('.plusMoins')).first().hide();
            $(this).text($(this).text().replace('-', '+'));
        }

    });

    $('.mesure').keyup(function(e) {
        console.log("Bouton relaché dans mesure");
        var texte = $(this).val();
        if ((/^[0-9]+$/.test(texte) || /^[0-9]+.[0-9]+$/.test(texte)) && texte.length < 5 && texte != 0)
            $(this).parent().find($('.incoText')).hide();
        else
            $(this).parent().find($('.incoText')).show();
    });

    $('.boutonEnre').click(function(e) {
        console.log("Bouton enregistré cliqué");
        $(this).parent().find($('.mesure')).each(function() {
            console.log($(this).val());
            if ($(this).val() == "") {
                alert("Erreur! Vous n'avez saisie aucune mesure. Ou toutes les mesures ne sont pas entrés.");
                return;
            }
        });
        if ($(this).parent().find($('.incoText')).is(":visible")) {
            alert("Erreur! Les mesures que vous avez rentré sont soit incorrecte, soit incomplète.");
            return;
        }
        var commande = [];
        var i = 0;
        $(this).parent().find($('.mesure')).each(function() {
            commande[i] = $(this).val();
            i++;
        });
        console.log(commande);
        var intitule = $(this).parent().parent().find($('.boutonDev')).text()
        var choix = $('<tr><td class="type"></td></tr><tr><td class="intitule"></td></tr><tr><td class="lesMesures"></td></tr>');
        choix.find('.type').text("Service");
        choix.find('.intitule').text(intitule);
        console.log(choix.html());
        i = 0;
        commande.forEach(function() {
            var liste = $('<tr><td class="mesu"></td></tr>');
            console.log(commande[i]);
            liste.find('.mesu').text(commande[i] + " cm");
            console.log(liste.html());
            choix.find('.lesMesures').append(liste);
            i++;
        });
        console.log(choix.html());
        $('#recapCommande').append(choix);
    });

    console.log("La mise en place est finie. En attente d'événements...");
});