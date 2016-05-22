"use strict";
/*global $ */

	//---------------------------------- Login ----------------------------------

/*http://stackoverflow.com/questions/11930253/how-to-create-a-login-page-when-username-and-password-is-equal-in-html als bron */

function check(form) {
					/*Checkt of de code hetzelfde is als wat je invult om verder te kunnen gaan*/
					if (form.userid.value == "manon" && form.pswrd.value == "secret") {
						window.open("#site"); /*site openen*/
						window.close("#login");
					} 
					else {
						alert("Er is of geen wachtwoord of username gegeven.") /*fout tonen*/
					}
}

	//---------------------------------- Databank ----------------------------------

var dairy, teller, tText, db, title, datum, tekst;

//Databank is gemaakt aan de hand van de les 8, de voorbeelden die we gekregen hebben.

function updateTables() {
	teller = 0;
	tText = "";
	for (teller = 0; teller < dairy.length; teller += 1) {
		tText += "<tr><td>" + dairy[teller].title + "<\/td><td>" + dairy[teller].datum + "<\/td><td>" + dairy[teller].tekst + "<\/td><\/tr>";
	}
	$("#dairy tbody").html(tText);
}

function updateTablesSQL() {
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM dairy order by datum desc', [], function (tx, results) {
			var len = results.rows.length,
				i;
			tText = "";
			for (teller = 0; teller < len; teller += 1) {
				tText += "<tr><td>" + results.rows.item(teller).title + "<\/td><td id='grote'>" + results.rows.item(teller).datum + "<\/td><td><p id='scroll'>" + results.rows.item(teller).tekst + "</p><\/td><\/tr>";
				//<a  href='#toonVerhaal' onclick='toonVerhaal("+teller+");'> 
			}
			$("#dairyTabelDB tbody").html(tText);

		}, null);
	});

}

$(document).ready(function () {
	//---------------------------------- Home ----------------------------------
	
	$("#header button").hover(function() {
		$(this).css("background-color", '#F7CDA7');
        }, function(){
		$(this).css("background-color", 'papayawhip')
	});
	
	//---------------------------------- Aanpassen ----------------------------------
	//----------- Lettertype -----------
	$("#Rome").click(function() {
				$("p").css("font-family", "Times New Roman");
				$("h1").css("font-family", "Times New Roman");
				$("button").css("font-family", "Times New Roman");
				$("th").css("font-family", "Times New Roman");
				$("label").css("font-family", "Times New Roman");
				$("td").css("font-family", "Times New Roman");
			});
	
	$("#Comic").click(function() {
				$("p").css("font-family", "Comic Sans MS");
				$("h1").css("font-family", "Comic Sans MS");
				$("button").css("font-family", "Comic Sans MS");
				$("th").css("font-family", "Comic Sans MS");
				$("label").css("font-family", "Comic Sans MS");
				$("td").css("font-family", "Comic Sans MS");
			});
	
	$("#Verdana").click(function() {
				$("p").css("font-family", "Verdana");
				$("h1").css("font-family", "Verdana");
				$("button").css("font-family", "Verdana");
				$("th").css("font-family", "Verdana");
				$("label").css("font-family", "Verdana");
				$("td").css("font-family", "Verdana");
			});
	
	$("#Fb").click(function() {
				$("p").css("font-family", "Californian FB");
				$("h1").css("font-family", "Californian FB");
				$("button").css("font-family", "Californian FB");
				$("th").css("font-family", "Californian FB");
				$("label").css("font-family", "Californian FB");
				$("td").css("font-family", "Californian FB");
			});
	
	$("#Ss").click(function() {
				$("p").css("font-family", "Segoe Script");
				$("h1").css("font-family", "Segoe Script");
				$("button").css("font-family", "Segoe Script");
				$("th").css("font-family", "Segoe Script");
				$("label").css("font-family", "Segoe Script");
				$("td").css("font-family", "Segoe Script");
			});
	//----------- Lettertype -----------
	$("#foto1").click(function() {
				$("#aanpassen").css("background-image", "url(Img/resize-img.jpg)");
				$("#site").css("background-image", "url(Img/resize-img.jpg)");
			});
	
	$("#foto2").click(function() {
				$("#aanpassen").css("background-image", "url(Img/home2.jpg)");
				$("#site").css("background-image", "url(Img/home2.jpg)");
			});
	
	$("#foto3").click(function() {
				$("#aanpassen").css("background-image", "url(Img/home3.jpg)");
				$("#site").css("background-image", "url(Img/home3.jpg)");
			});
	
	$("#foto4").click(function() {
				$("#aanpassen").css("background-image", "url(Img/home4.jpg)");
				$("#site").css("background-image", "url(Img/home4.jpg)");
			});
	$("#foto5").click(function() {
				$("#aanpassen").css("background-image", "url(Img/home5.jpg)");
				$("#site").css("background-image", "url(Img/home5.jpg)");
			});
	//---------------------------------- Form ----------------------------------
	$("input[required]").after(" * verplicht in te vullen");
	$("textarea[required]").after(" * verplicht in te vullen");
	
	
	//---------------------------------- Menu ----------------------------------
	$("#index").click(function () {
		$("#dagboek").slideUp("slow");
		$("#lijst").slideUp("slow");
		$("#home").slideDown("slow");
	});

	$("#new").click(function () {
		$("#home").slideUp("slow");
		$("#lijst").slideUp("slow");
		$("#dagboek").slideDown("slow");
	});

	$("#list").click(function () {
		$("#dagboek").slideUp("slow");
		$("#home").slideUp("slow");
		$("#lijst").slideDown("slow");
	});
	
	//---------------------------------- Databank ----------------------------------
	$("#filter").change(function() {
				var tekst = $(this).val();
				$("tbody tr").hide();
				$("tbody tr td:contains('" + tekst + "')").parent().show();
			});
	
	title = "Voorbeeld";
	datum = "2016-11-01";
	tekst = "Liefste Dagboek, ...";


	dairy = [{
		"title": title,
		"datum": datum,
		"tekst": tekst
				}];

	// schakel de transities uit
	$(document).bind('pageinit', function () {
		$.mobile.defaultPageTransition = 'none';
	});

	// open de databank
	db = openDatabase('mydb', '1.0', 'Test DB', 0.1 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS dairy (title, datum, tekst)');
		//where title= ? and datum= ? and tekst = ?
		tx.executeSql('select count(*) as aantal from dairy', [], function (tx, results) {
			// kijk na of het resultaat ok is.
			console.log("select werkt");
			if (results.rows.item(0).aantal === 0) {
				// er was nog geen combinatie met de title & datum in de db, dus voeg die nu toe :
				tx.executeSql('INSERT INTO dairy (title,datum,tekst) VALUES (?, ?, ?)', [title, datum, tekst], function (tx, results) {
					console.log("ok!");
				}, function (tx, error) {
					console.log("NOK!");
				});
				
			}

		}, function (tx, error) {
			console.log("NOK!");
		});
		updateTablesSQL();
	});

	//updateTables();
	updateTablesSQL();

	$("#voegToe").click(function () {
		title = $("#titleDairy").val();
		datum = $("#datumDairy").val();
		tekst = $("#tekstDairy").val();
		dairy.push({
			"title": title,
			"datum": datum,
			"tekst": tekst
		});

		db.transaction(function (tx) {
			tx.executeSql('INSERT INTO dairy (title,datum,tekst) VALUES (?, ?, ?)', [title, datum, tekst]);
		});
		//updateTables();
		updateTablesSQL();

	});
});