console.log("Ce programme JS vient d'être chargé");
$(document).ready(function() {
    console.log("Le document est pret");
    $('#formClient input').keyup(function(e) {
        console.log("touche appuyé");
        var texte = $(this).val();
        console.log(texte);
        if ((/^[A-Z][a-zA-Z]+$/.test(texte) && texte.length < 20) || (/^[0-9]+\/[0-9]+\/2017$/.test(texte) && texte.length == 10))
            $(this).parent().find(".incoText").hide();
        else
            $(this).parent().find(".incoText").show();
    });

    $('#boutonOK').mousedown(function(e) {
        console.log("Bouton OK cliqué");
        if ($('#formClient span').is(":visible"))
            alert("Erreur! Certains champs ne sont pas complétés ou incorrect.");
        else {
            console.log("test");
            var client = {
                nom: $('#nom').val(),
                prenom: $('#prenom').val(),
                date: $('#date').val()
            };
            var nom = $('<tr><td class="nomP"></td></tr><tr><td class="prenomP"></td></tr><tr><td class="dateP"></td></tr>');
            console.log($('#nom').val());
            nom.find('.nomP').text("Nom du client : " + client.nom);
            nom.find('.prenomP').text("Prénom du client : " + client.prenom);
            nom.find('.dateP').text("Date de dépôt : " + client.date);
            $('#recap').append(nom);
        }
    });


    console.log("La mise en place est finie. En attente d'événements...");
});