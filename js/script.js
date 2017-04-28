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
            $('#recap').append(nom);
        }
    });

    $('.boutonDev').click(function(e) {
        console.log("Bouton ourlet cliqué");
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

    console.log("La mise en place est finie. En attente d'événements...");
});