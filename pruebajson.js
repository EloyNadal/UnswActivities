/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var guardianesPve = [];
guardianesPve = activity();
console.log(guardianesPve);

var guardianesPvp = [];
guardianesPvp = activityPvp();
console.log(guardianesPvp);

var indices = "";
var tabla = "";
var totales = {};


function mostrarRaid() {


    var x = document.getElementById("fecha");
    let date = new Date(x.value);
    var diaF = new Date();
    var diaI = new Date(diaInicial(date));
    diaI.setHours(diaI.getHours() + 15);
    date.setDate(date.getDate() + 7);
    diaF = date;
    diaF.setHours(diaF.getHours() + 15);

    console.log(diaI);
    console.log(diaF);

    if (diaI.getMonth() >= 0) {
        document.getElementById('cabezera').src = "./img/destiny/Leviatan.jpg";


        var text = "Actividad del <mark>" + diaI.getDate() + "/" + (diaI.getMonth() + 1) +
                "/" + diaI.getFullYear() + "</mark> al <mark>" + diaF.getDate() + "/" + (diaF.getMonth() + 1) + "/" + diaF.getFullYear() + "</mark>";

        document.getElementById("dia").innerHTML = text;
        //(date.toLocaleDateString('es-MX'));

        totales.raid = 0;
        totales.kills = 0;
        totales.tiempo = 0;


        for (var z = 0; z < guardianesPve.length; z++) {
            guardianesPve[z].raid = 0;
            guardianesPve[z].kills = 0;
            guardianesPve[z].tiempo = 0;

            for (var y = 0; y < guardianesPve[z].caracter.length; y++) {
                actividades = guardianesPve[z].caracter[y].actividades.length;
                for (i = 0; i < actividades; i++) {

                    if (new Date(guardianesPve[z].caracter[y].actividades[i].fecha) >= diaI &&
                            new Date(guardianesPve[z].caracter[y].actividades[i].fecha) <= diaF) {

                        var cantM = guardianesPve[z].caracter[y].actividades[i].modos.length;
                        for (var j = 0; j < cantM; j++) {

                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 4) {
                                guardianesPve[z].raid += guardianesPve[z].caracter[y].actividades[i].completada;
                                guardianesPve[z].kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                totales.raid += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                totales.tiempo += guardianesPve[z].caracter[y].actividades[i].duracionSeg;
                                if ((guardianesPve[z].tiempo > guardianesPve[z].caracter[y].actividades[i].duracionSeg || guardianesPve[z].tiempo === 0) && guardianesPve[z].caracter[y].actividades[i].completada === 1) {
                                    guardianesPve[z].tiempo = guardianesPve[z].caracter[y].actividades[i].duracionSeg;
                                }
                            }
                        }

                    }
                }

            }
        }

        var aux = [];
        var control = 1;
        var i = 0;

        while (control === 1) {
            control = 0;
            for (var j = 0; j < (guardianesPve.length - i - 1); j++) {
                if (guardianesPve[j].raid < guardianesPve[j + 1].raid) {
                    aux = guardianesPve[j];
                    guardianesPve[j] = guardianesPve[j + 1];
                    guardianesPve[j + 1] = aux;
                    control = 1;

                }
            }
            i++;

        }

        var horasA = [];
        var minutosA = [];
        var segundosA = [];
        var horasT = Math.floor(totales.tiempo / 3600);
        ;
        var minutosT = Math.floor((totales.tiempo % 3600) / 60);
        var segundosT = totales.tiempo % 60;
        minutosT = minutosT < 10 ? '0' + minutosT : minutosT;
        segundosT = segundosT < 10 ? '0' + segundosT : segundosT;

        tabla = "<table cellspacing = '1' id='mi-tabla' class='tablesorter border'>\n\
                <thead><tr><th>Pos</th><th>Nick</th><th>Raids</th><th>Kills</th><th>Mejor Tiempo</th></tr></thead><tbody>";
        for (var i = 0; i < guardianesPve.length; i++) {
            var pos = i + 1;
            if (guardianesPve[i].tiempo !== 0) {

                horasA[i] = Math.floor(guardianesPve[i].tiempo / 3600);
                minutosA[i] = Math.floor((guardianesPve[i].tiempo % 3600) / 60);
                segundosA[i] = guardianesPve[i].tiempo % 60;
                minutosA[i] = minutosA[i] < 10 ? '0' + minutosA[i] : minutosA[i];
                segundosA[i] = segundosA[i] < 10 ? '0' + segundosA[i] : segundosA[i];

                tabla += "<tr><td> #" + pos + "</td><td>" + guardianesPve[i].nick + "</td><td>" +
                        guardianesPve[i].raid + "</td><td>" + guardianesPve[i].kills + "</td><td>" +
                        horasA[i] + ":" + minutosA[i] + ":" + segundosA[i] + "</td></tr>";
            }

        }
        tabla += "</tbody><tfoot><tr><td>Total</td><td> </td><td>" +
                totales.raid + "</td><td>" + totales.kills + "</td><td>" +
                "</td></tr>";
        tabla += "</tfoot></table>";



        document.getElementById("demo").innerHTML = tabla;
        $(document).ready(function () {
            $("table").tablesorter({
                cancelSelection: false,
                headers: {
                    0: {sorter: false}
                }
            });
        });

    } else {
        console.log("introducir valores...");
        var text = "Introducir antes margen de fechas valido";


        document.getElementById("dia").innerHTML = text;
    }
}
;

function mostrarOcaso() {
    var x = document.getElementById("fecha");
    let date = new Date(x.value);
    var diaF = new Date();
    var diaI = new Date(diaInicial(date));
    diaI.setHours(diaI.getHours() + 15);
    date.setDate(date.getDate() + 7);
    diaF = date;
    diaF.setHours(diaF.getHours() + 15);

    console.log(diaI);
    console.log(diaF);

    if (diaI.getMonth() >= 0) {
        document.getElementById('cabezera').src = "./img/destiny/ocaso2.jpg";
        var text = "Actividad del <mark>" + diaI.getDate() + "/" + (diaI.getMonth() + 1) +
                "/" + diaI.getFullYear() + "</mark> al <mark>" + diaF.getDate() + "/" + (diaF.getMonth() + 1) + "/" + diaF.getFullYear() + "</mark>";
        document.getElementById("dia").innerHTML = text;
        //(date.toLocaleDateString('es-MX'));

        var totales = {};
        totales.ocasos = 0;
        totales.heroicos = 0;

        for (var z = 0; z < guardianesPve.length; z++) {
            guardianesPve[z].scoreI = 0;
            guardianesPve[z].ocasos = 0;
            guardianesPve[z].ocasoH = 0;
            guardianesPve[z].scoreT = 0;
            guardianesPve[z].tiempo = 0;
            for (var y = 0; y < guardianesPve[z].caracter.length; y++) {
                actividades = guardianesPve[z].caracter[y].actividades.length;
                for (i = 0; i < actividades; i++) {

                    if (new Date(guardianesPve[z].caracter[y].actividades[i].fecha) >= diaI &&
                            new Date(guardianesPve[z].caracter[y].actividades[i].fecha) <= diaF) {

                        var cantM = guardianesPve[z].caracter[y].actividades[i].modos.length;
                        for (var j = 0; j < cantM; j++) {

                            if ((guardianesPve[z].caracter[y].actividades[i].modos[j] === 46 || guardianesPve[z].caracter[y].actividades[i].modos[j] === 47)
                                    && guardianesPve[z].caracter[y].actividades[i].finalizada === 0) {
                                if (guardianesPve[z].scoreI < guardianesPve[z].caracter[y].actividades[i].puntuacionInd) {
                                    guardianesPve[z].scoreI = guardianesPve[z].caracter[y].actividades[i].puntuacionInd;
                                }
                                if (guardianesPve[z].scoreT <= guardianesPve[z].caracter[y].actividades[i].puntuacionTeam) {
                                    guardianesPve[z].scoreT = guardianesPve[z].caracter[y].actividades[i].puntuacionTeam;
                                    guardianesPve[z].tiempo = guardianesPve[z].caracter[y].actividades[i].duracionSeg;

                                }

                            }
                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 46 && guardianesPve[z].caracter[y].actividades[i].finalizada === 0) {
                                guardianesPve[z].ocasos += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.ocasos += guardianesPve[z].caracter[y].actividades[i].completada;
                            }
                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 47 && guardianesPve[z].caracter[y].actividades[i].finalizada === 0) {
                                guardianesPve[z].ocasoH += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.heroicos += guardianesPve[z].caracter[y].actividades[i].completada;
                            }
                        }
                    }
                }
            }
        }

        var aux = [];
        var control = 1;
        var i = 0;

        while (control === 1) {
            control = 0;
            for (var j = 0; j < (guardianesPve.length - i - 1); j++) {
                if (guardianesPve[j].scoreT < guardianesPve[j + 1].scoreT) {
                    aux = guardianesPve[j];
                    guardianesPve[j] = guardianesPve[j + 1];
                    guardianesPve[j + 1] = aux;
                    control = 1;
                    

                }
                if ((guardianesPve[j].scoreT === guardianesPve[j + 1].scoreT) && (guardianesPve[j].scoreI < guardianesPve[j + 1].scoreI)) {
                    aux = guardianesPve[j];
                    guardianesPve[j] = guardianesPve[j + 1];
                    guardianesPve[j + 1] = aux;
                    control = 1;

                }
                
            }
            i++;

        }




        var horasA = [];
        var minutosA = [];
        var segundosA = [];

        tabla = "<table cellspacing = '1' id='mi-tabla' class='tablesorter'>\n\
                <thead><tr><th>Pos</th><th>Nick</th><th>Ocaso</th><th>OcasoH</th><th>PuntTeam</th><th>TiempoPMax</th></tr></thead><tbody>";

        for (var i = 0; i < guardianesPve.length; i++) {

            var pos = i + 1;
            if (guardianesPve[i].scoreI !== 0) {

                horasA[i] = Math.floor(guardianesPve[i].tiempo / 3600);
                minutosA[i] = Math.floor((guardianesPve[i].tiempo % 3600) / 60);
                segundosA[i] = guardianesPve[i].tiempo % 60;
                minutosA[i] = minutosA[i] < 10 ? '0' + minutosA[i] : minutosA[i];
                segundosA[i] = segundosA[i] < 10 ? '0' + segundosA[i] : segundosA[i];

                tabla += "<tr><td> #" + pos + "</td><td>" + guardianesPve[i].nick + "</td><td>" +
                        guardianesPve[i].ocasos + "</td><td>" + guardianesPve[i].ocasoH + "</td><td>" +
                        guardianesPve[i].scoreT + "</td><td>" +
                        horasA[i] + ":" + minutosA[i] + ":" + segundosA[i] + "</td></tr>";
            }

        }
        tabla += "</tbody><tfoot><tr><td>Total</td><td> </td><td>" +
                totales.ocasos + "</td><td>" + totales.heroicos + "</td><td></td><td></td></tr>";
        tabla += "</tfoot></table>";



        document.getElementById("demo").innerHTML = tabla;
        $(document).ready(function () {
            $("table").tablesorter({
                cancelSelection: false,
                headers: {
                    0: {sorter: false}
                }
            });
        });
    } else {
        
        var text = "Introducir antes margen de fechas valido";


        document.getElementById("dia").innerHTML = text;
    }

}
;

function mostrarNueve() {
    var x = document.getElementById("fecha");
    let date = new Date(x.value);
    var diaF = new Date();
    var diaI = new Date(diaInicial(date));
    diaI.setHours(diaI.getHours() + 15);
    date.setDate(date.getDate() + 7);
    diaF = date;
    diaF.setHours(diaF.getHours() + 15);

    console.log(diaI);
    console.log(diaF);
    if (diaI.getMonth() >= 0) {
        document.getElementById('cabezera').src = "./img/destiny/nine.jpg";
        var text = "Actividad del <mark>" + diaI.getDate() + "/" + (diaI.getMonth() + 1) +
                "/" + diaI.getFullYear() + "</mark> al <mark>" + diaF.getDate() + "/" + (diaF.getMonth() + 1) + "/" + diaF.getFullYear() + "</mark>";
        document.getElementById("dia").innerHTML = text;
        //(date.toLocaleDateString('es-MX'));

        var totales = {};
        totales.partidas = 0;
        totales.victorias = 0;
        totales.espiras = 0;

        for (var z = 0; z < guardianesPvp.length; z++) {
            guardianesPvp[z].killRatio = 0;
            guardianesPvp[z].kills = 0;
            guardianesPvp[z].deaths = 0;
            guardianesPvp[z].partidas = 0;
            guardianesPvp[z].victorias = 0;
            guardianesPvp[z].espiras = 0;
            guardianesPvp[z].asist = 0;
            guardianesPvp[z].killAsist = 0;



            for (var y = 0; y < guardianesPvp[z].caracter.length; y++) {
                var contE = 1;
                actividades = guardianesPvp[z].caracter[y].actividades.length;
                for (i = 0; i < actividades; i++) {

                    if (new Date(guardianesPvp[z].caracter[y].actividades[i].fecha) >= diaI &&
                            new Date(guardianesPvp[z].caracter[y].actividades[i].fecha) <= diaF) {

                        var cantM = guardianesPvp[z].caracter[y].actividades[i].modos.length;
                        for (var j = 0; j < cantM; j++) {

                            if (guardianesPvp[z].caracter[y].actividades[i].modos[j] === 39) {

                                guardianesPvp[z].kills += guardianesPvp[z].caracter[y].actividades[i].kills;
                                guardianesPvp[z].deaths += guardianesPvp[z].caracter[y].actividades[i].deaths;
                                guardianesPvp[z].partidas += guardianesPvp[z].caracter[y].actividades[i].completada;
                                guardianesPvp[z].asist += guardianesPvp[z].caracter[y].actividades[i].asistecias;
                                totales.partidas += guardianesPvp[z].caracter[y].actividades[i].completada;

                                if (guardianesPvp[z].caracter[y].actividades[i].victoria === 0) {
                                    guardianesPvp[z].victorias += 1;
                                    totales.victorias += 1;
                                }

                                if (guardianesPvp[z].caracter[y].actividades[i].victoria === 0 &&
                                        guardianesPvp[z].caracter[y].actividades[i + 1].victoria === 0 && guardianesPvp[z].caracter[y].actividades[i + 1].modos[j] === 39) {
                                    contE += 1;
                                    
                                }else {
                                    contE = 1;
                                }
                                
                                if (contE === 7) {
                                        guardianesPvp[z].espiras += 1;
                                        contE = 1;
                                        totales.espiras += 1;
                                    }
                            }
                        }
                    }
                }
            }
            if (guardianesPvp[z].partidas !== 0) {
                guardianesPvp[z].killRatio = guardianesPvp[z].kills / guardianesPvp[z].deaths;
                guardianesPvp[z].killAsist = (guardianesPvp[z].asist + guardianesPvp[z].kills) / guardianesPvp[z].deaths;

            }
        }

        var aux = [];
        var control = 1;
        var i = 0;

        while (control === 1) {
            control = 0;
            for (var j = 0; j < (guardianesPvp.length - i - 1); j++) {
                
                if (guardianesPvp[j].victorias < guardianesPvp[j + 1].victorias) {
                    aux = guardianesPvp[j];
                    guardianesPvp[j] = guardianesPvp[j + 1];
                    guardianesPvp[j + 1] = aux;
                    control = 1;
                }
                if ((guardianesPvp[j].victorias === guardianesPvp[j + 1].victorias) && (guardianesPvp[j].partidas < guardianesPvp[j + 1].partidas)) {
                    aux = guardianesPvp[j];
                    guardianesPvp[j] = guardianesPvp[j + 1];
                    guardianesPvp[j + 1] = aux;
                    control = 1;
                }
            }
            i++;

        }

        tabla = "<table cellspacing = '1' id='mi-tabla' class='tablesorter'>\n\
                <thead><tr><th>Pos</th><th>Nick</th><th>Espiras</th><th>Partidas</th><th>Victorias</th><th>KD</th><th>KaD</th></tr></thead><tbody>";
        for (var i = 0; i < guardianesPvp.length; i++) {
            var pos = (i + 1);
            if (guardianesPvp[i].partidas !== 0) {
                var killRatio = guardianesPvp[i].killRatio.toFixed(2);
                var asistRatio = guardianesPvp[i].killAsist.toFixed(2);

                tabla += "<tr><td> #" + pos + "</td><td>" + guardianesPvp[i].nick + "</td><td>" +
                        guardianesPvp[i].espiras + "</td><td>" + guardianesPvp[i].partidas + "</td><td>" +
                        guardianesPvp[i].victorias + "</td><td>" +
                        killRatio + "</td><td>" +
                        asistRatio + "</td></tr>";
            }

        }
        tabla += "</tbody><tfoot><tr><td>Total</td><td> </td><td>" +
                totales.espiras + "</td><td>" + totales.partidas + "</td><td>" + totales.victorias + "</td><td></td><td></td></tr>";
        tabla += "</tfoot></table>";



        document.getElementById("demo").innerHTML = tabla;
        $(document).ready(function () {
            $("table").tablesorter({
                cancelSelection: false,
                headers: {
                    0: {sorter: false}
                }
            });
        });
    } else {
        console.log("introducir valores...");
        var text = "Introducir antes margen de fechas valido";


        document.getElementById("dia").innerHTML = text;
    }

}
;

function mostrarAsaltos() {
    var x = document.getElementById("fecha");
    let date = new Date(x.value);
    var diaF = new Date();
    var diaI = new Date(diaInicial(date));
    diaI.setHours(diaI.getHours() + 15);
    date.setDate(date.getDate() + 7);
    diaF = date;
    diaF.setHours(diaF.getHours() + 15);

    console.log(diaI);
    console.log(diaF);

    if (diaI.getMonth() >= 0) {
        document.getElementById('cabezera').src = "./img/destiny/ocaso_elPyramdion.jpg";
        var text = "Actividad del <mark>" + diaI.getDate() + "/" + (diaI.getMonth() + 1) +
                "/" + diaI.getFullYear() + "</mark> al <mark>" + diaF.getDate() + "/" + (diaF.getMonth() + 1) + "/" + diaF.getFullYear() + "</mark>";
        document.getElementById("dia").innerHTML = text;
        //(date.toLocaleDateString('es-MX'));

        totales.asaltos = 0;
        totales.ocasos = 0;
        totales.heroicos = 0;
        totales.kills = 0;


        for (var z = 0; z < guardianesPve.length; z++) {
            guardianesPve[z].asaltos = 0;
            guardianesPve[z].ocasos = 0;
            guardianesPve[z].heroicos = 0;
            guardianesPve[z].kills = 0;

            for (var y = 0; y < guardianesPve[z].caracter.length; y++) {
                actividades = guardianesPve[z].caracter[y].actividades.length;
                for (i = 0; i < actividades; i++) {

                    if (new Date(guardianesPve[z].caracter[y].actividades[i].fecha) >= diaI &&
                            new Date(guardianesPve[z].caracter[y].actividades[i].fecha) <= diaF) {

                        var cantM = guardianesPve[z].caracter[y].actividades[i].modos.length;
                        for (var j = 0; j < cantM; j++) {

                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 3) {
                                guardianesPve[z].asaltos += guardianesPve[z].caracter[y].actividades[i].completada;
                                guardianesPve[z].kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                totales.asaltos += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.kills += guardianesPve[z].caracter[y].actividades[i].kills;
                            }
                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 16 || guardianesPve[z].caracter[y].actividades[i].modos[j] === 46) {
                                guardianesPve[z].ocasos += guardianesPve[z].caracter[y].actividades[i].completada;
                                guardianesPve[z].kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                totales.ocasos += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                if (guardianesPve[z].nick === "Aerion1001"){
                                    console.log(guardianesPve[z].caracter[y].actividades[i]);
                                }
                            }
                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 17) {
                                guardianesPve[z].heroicos += guardianesPve[z].caracter[y].actividades[i].completada;
                                guardianesPve[z].kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                totales.heroicos += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.kills += guardianesPve[z].caracter[y].actividades[i].kills;
                            }
                            if (guardianesPve[z].caracter[y].actividades[i].modos[j] === 47 && guardianesPve[z].caracter[y].actividades[i].finalizada === 0) {
                                guardianesPve[z].heroicos += guardianesPve[z].caracter[y].actividades[i].completada;
                                guardianesPve[z].kills += guardianesPve[z].caracter[y].actividades[i].kills;
                                totales.heroicos += guardianesPve[z].caracter[y].actividades[i].completada;
                                totales.kills += guardianesPve[z].caracter[y].actividades[i].kills;
                            }
                        }
                    }
                }
            }
        }

        var aux = [];
        var control = 1;
        var i = 0;

        while (control === 1) {
            control = 0;
            for (var j = 0; j < (guardianesPve.length - i - 1); j++) {
                if (guardianesPve[j].kills < guardianesPve[j + 1].kills) {
                    aux = guardianesPve[j];
                    guardianesPve[j] = guardianesPve[j + 1];
                    guardianesPve[j + 1] = aux;
                    control = 1;

                }
            }
            i++;

        }

        tabla = "<table cellspacing = '1' id='mi-tabla' class='tablesorter'>\n\
                <thead><tr><th>Pos</th><th>Nick</th><th>Asaltos</th><th>Ocasos</th><th>Ocasos H.</th><th>Kills</th></tr></thead><tbody>";
        for (var i = 0; i < guardianesPve.length; i++) {
            var pos = i + 1;
            if (guardianesPve[i].kills !== 0) {

                tabla += "<tr><td> #" + pos + "</td><td>" + guardianesPve[i].nick + "</td><td>" +
                        guardianesPve[i].asaltos + "</td><td>" + guardianesPve[i].ocasos + "</td><td>" +
                        guardianesPve[i].heroicos + "</td><td>" +
                        guardianesPve[i].kills + "</td></tr>";
            }

        }
        tabla += "</tbody><tfoot><tr><td>Total</td><td> </td><td>" +
                totales.asaltos + "</td><td>" + totales.ocasos + "</td><td>" + totales.heroicos +
                "</td><td>" + totales.kills + "</td></tr>";
        tabla += "</tfoot></table>";



        document.getElementById("demo").innerHTML = tabla;
        $(document).ready(function () {
            $("table").tablesorter({
                cancelSelection: false,
                headers: {
                    0: {sorter: false}
                }
            });
        });
    } else {
        console.log("introducir valores...");
        var text = "Introducir antes margen de fechas valido";


        document.getElementById("dia").innerHTML = text;
    }
}
;

function mostrarPvp() {
    var x = document.getElementById("fecha");
    let date = new Date(x.value);
    var diaF = new Date();
    var diaI = new Date(diaInicial(date));
    diaI.setHours(diaI.getHours() + 15);
    date.setDate(date.getDate() + 7);
    diaF = date;
    diaF.setHours(diaF.getHours() + 15);

    console.log(diaI);
    console.log(diaF);
    if (diaI.getMonth() >= 0) {
        document.getElementById('cabezera').src = "./img/destiny/pvp.jpg";
        var text = "Actividad del <mark>" + diaI.getDate() + "/" + (diaI.getMonth() + 1) +
                "/" + diaI.getFullYear() + "</mark> al <mark>" + diaF.getDate() + "/" + (diaF.getMonth() + 1) + "/" + diaF.getFullYear() + "</mark>";
        document.getElementById("dia").innerHTML = text;
        //(date.toLocaleDateString('es-MX'));

        var totales = {};
        totales.partidas = 0;
        totales.victorias = 0;
        totales.espiras = 0;

        for (var z = 0; z < guardianesPvp.length; z++) {
            guardianesPvp[z].killRatio = 0;
            guardianesPvp[z].kills = 0;
            guardianesPvp[z].deaths = 0;
            guardianesPvp[z].partidas = 0;
            guardianesPvp[z].victorias = 0;
            guardianesPvp[z].asist = 0;
            guardianesPvp[z].killAsist = 0;



            for (var y = 0; y < guardianesPvp[z].caracter.length; y++) {
                var contE = 1;
                actividades = guardianesPvp[z].caracter[y].actividades.length;
                for (i = 0; i < actividades; i++) {

                    if (new Date(guardianesPvp[z].caracter[y].actividades[i].fecha) >= diaI &&
                            new Date(guardianesPvp[z].caracter[y].actividades[i].fecha) <= diaF) {

                        var cantM = guardianesPvp[z].caracter[y].actividades[i].modos.length;
                        for (var j = 0; j < cantM; j++) {

                            if (guardianesPvp[z].caracter[y].actividades[i].modos[j] === 5) {


                                guardianesPvp[z].kills += guardianesPvp[z].caracter[y].actividades[i].kills;
                                guardianesPvp[z].deaths += guardianesPvp[z].caracter[y].actividades[i].deaths;
                                guardianesPvp[z].partidas += guardianesPvp[z].caracter[y].actividades[i].completada;
                                guardianesPvp[z].asist += guardianesPvp[z].caracter[y].actividades[i].asistecias;
                                totales.partidas += guardianesPvp[z].caracter[y].actividades[i].completada;

                                if (guardianesPvp[z].caracter[y].actividades[i].victoria === 0) {
                                    guardianesPvp[z].victorias += 1;
                                    totales.victorias += 1;
                                }
                            }
                        }
                    }
                }
            }
            if (guardianesPvp[z].partidas !== 0) {
                guardianesPvp[z].killRatio = guardianesPvp[z].kills / guardianesPvp[z].deaths;
                guardianesPvp[z].killAsist = (guardianesPvp[z].asist + guardianesPvp[z].kills) / guardianesPvp[z].deaths;

            }
        }

        var aux = [];
        var control = 1;
        var i = 0;

        while (control === 1) {
            control = 0;
            for (var j = 0; j < (guardianesPvp.length - i - 1); j++) {
                
                if (guardianesPvp[j].victorias < guardianesPvp[j + 1].victorias) {
                    aux = guardianesPvp[j];
                    guardianesPvp[j] = guardianesPvp[j + 1];
                    guardianesPvp[j + 1] = aux;
                    control = 1;
                }
                if ((guardianesPvp[j].victorias === guardianesPvp[j + 1].victorias) && (guardianesPvp[j].partidas < guardianesPvp[j + 1].partidas)) {
                    aux = guardianesPvp[j];
                    guardianesPvp[j] = guardianesPvp[j + 1];
                    guardianesPvp[j + 1] = aux;
                    control = 1;
                }
            }
            i++;

        }

        tabla = "<table cellspacing = '1' id='mi-tabla' class='tablesorter'>\n\
                <thead><tr><th>Pos</th><th>Nick</th><th>Partidas</th><th>Victorias</th><th>KD</th><th>KaD</th></tr></thead><tbody>";
        for (var i = 0; i < guardianesPvp.length; i++) {
            var pos = (i + 1);
            if (guardianesPvp[i].partidas !== 0) {
                var killRatio = guardianesPvp[i].killRatio.toFixed(2);
                var asistRatio = guardianesPvp[i].killAsist.toFixed(2);

                tabla += "<tr><td> #" + pos + "</td><td>" + guardianesPvp[i].nick + "</td><td>" +
                        guardianesPvp[i].partidas + "</td><td>" +
                        guardianesPvp[i].victorias + "</td><td>" +
                        killRatio + "</td><td>" +
                        asistRatio + "</td></tr>";
            }

        }
        tabla += "</tbody><tfoot><tr><td>Total</td><td> </td><td>" +
                totales.partidas + "</td><td>" + totales.victorias + "</td><td></td><td></td></tr>";
        tabla += "</tfoot></table>";



        document.getElementById("demo").innerHTML = tabla;
        $(document).ready(function () {
            $("table").tablesorter({
                cancelSelection: false,
                headers: {
                    0: {sorter: false}
                }
            });
        });
    } else {
        console.log("introducir valores...");
        var text = "Introducir antes margen de fechas valido";


        document.getElementById("dia").innerHTML = text;
    }
}
;



function activity() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "./json/actividadesPve.json"
                //"method": "GET",
                /*"headers": {
                 "X-API-KEY": apikey
                 }*/
    };
    var a;
    $.ajax(settings).done(function (response) {
        a = response;

    });
    return a;
}

function activityPvp() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "./json/actividadesPvp.json"
                //"method": "GET",
                /*"headers": {
                 "X-API-KEY": apikey
                 }*/
    };
    var a;
    $.ajax(settings).done(function (response) {
        a = response;

    });
    return a;
}

function diaInicial(diaF) {

    var nomDia = diaF.getDay();

    switch (nomDia) {

        case 0:
            diaF.setDate(diaF.getDate() - 5);
            return diaF;
        case 1:
            diaF.setDate(diaF.getDate() - 6);
            return diaF;
        case 2:
            return diaF;
        case 3:
            diaF.setDate(diaF.getDate() - 1);
            return diaF;
        case 4:
            diaF.setDate(diaF.getDate() - 2);
            return diaF;
        case 5:
            diaF.setDate(diaF.getDate() - 3);
            return diaF;
        case 6:
            diaF.setDate(diaF.getDate() - 4);
            return diaF;
        default:
            return diaF;
    }
}

/*Modos de juego:
 * 2 : Historia
 * 3 : Asalto
 * 4: Raid
 * 5 : Todo PVP
 * 6: Patrulla
 * 7: Todo PVE
 * 10: Control
 * 12: Enfrentamiento
 * 15: Dobles Escarlata
 * 16: Ocaso
 * 17: Ocaso Heroico
 * 18: Todos los Asaltos
 * 19: IronBanner
 * 25: AllMayhem ¿?
 * 31: Supremacia
 * 37: Supervivencia
 * 38: Countdown
 * 39: TrialsOfTheNine
 * 40: Social
 * 41: TrialsCountdown
 * 42: TrialsSupervivencia
 * 43: IronControl
 * 44: IronEnfrentamiento
 * 45: IronSupreacia
 * 46: OcasoPuntuable
 * 47: OcasoHeroicoPuntuable
 * 48: Disputa
 * 49: TodoDobles
 * 50: Dobles
 */
 