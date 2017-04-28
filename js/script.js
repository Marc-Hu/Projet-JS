console.log("Ce programme JS vient d'être chargé");
$(document).ready(function() {
    $('#ourlet').hide();
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
        if ($('#formClient span').is(":visible"))
            alert("Erreur! Certains champs ne sont pas complétés ou incorrect.");
        else {
            var client = {
                nom: $('#nom').val(),
                prenom: $('#prenom').val(),
                date: $('#date').val()
            };
            var nom = $('<tr><td class="nomP"></td></tr><tr><td class="prenomP"></td></tr><tr><td class="dateP"></td></tr>');
            nom.find('.nomP').text("Nom du client : " + client.nom.toUpperCase());
            nom.find('.prenomP').text("Prénom du client : " + client.prenom.toUpperCase());
            nom.find('.dateP').text("Date de dépôt : " + client.date);
            $('#recap').append(nom);
        }
    });

    $('#boutonOurlet').click(function(e) {
        console.log("Bouton ourlet cliqué");
        if ($('#boutonOurlet').text().localeCompare("+ Ourlet") === 0) {
            console.log("Clique bouton plus");
            $('#ourlet').show();
            $('#boutonOurlet').text($('#boutonOurlet').text().replace('+ Ourlet', '- Ourlet'));
        } else {
            console.log("Clique bouton moins");
            $('#ourlet').hide();
            $('#boutonOurlet').text($('#boutonOurlet').text().replace('- Ourlet', '+ Ourlet'));
        }
    });

    console.log("La mise en place est finie. En attente d'événements...");
});