/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global ids, nombres, guardianes, nicks, i, id, nick */
apikey = "a61931b6a6e1482396c1ea8ba3f58328";
player = "by_doser";
var i, j;
var param = [];
param[0] = "2018-03-27";
param[1] = "2018-04-02";
var text = "";

var b = [];
b = searchPlayer();


for (i = 0; i < b.length; i++){
    
    b[i].caracter = caracter(b[i].id);
    
}

var c = [];

for (i = 0; i < b.length; i++){
    /*b[i].raid = 0;
    b[i].asaltos = 0;*/
    for (j = 0; j < 3; j++){
        //c[j] = {};
        if (typeof b[i].caracter[j] !== "undefined"){
        b[i].caracter[j].actividades = activity(b[i].id, b[i].caracter[j].caracterID);
        //b[i].raid += c[j].raid;
        //b[i].asaltos += c[j].asaltos;
    }
    }
}

//var d = {};
/*for (i = 60; i < 61; i++){
    for (j = 0; j < 1; j++){
    
    d = elementos(b[i].id, b[i].caracter[j]);
    console.log(d);
}}*/




window.onload = function() {
      var txt = b;
      
      //txt.value = window.onload + '';
	   document.getElementById('link').onclick = function(code) {
        this.href = 'data:text/plain;charset=utf-8,'
          + encodeURIComponent(JSON.stringify(b));
      };
    };

console.log(b);
function searchPlayer(){
		platform = 2;
                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://www.bungie.net/Platform/GroupV2/624280/Members/",
                    "method": "GET",
                    "headers": {
                        "X-API-KEY": apikey
    
                    }
                };
                var a = [];
                $.ajax(settings).done(function (response){
                    cant = response.Response.totalResults;
                    for (var i = 0; i < cant; i++){
                        
                        a[i] = {};//{response.Response.results[i].destinyUserInfo.membershipId};
                        a[i].id = response.Response.results[i].destinyUserInfo.membershipId;
                        a[i].nick = response.Response.results[i].destinyUserInfo.displayName;
                        
                   }
                });
                return a;    
}

function caracter(id){
    var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://www.bungie.net/Platform/Destiny2/2/Profile/" + id + "/?components=100",
                    "method": "GET",
                    "headers": {
                        "X-API-KEY": apikey
    
                    }
                };
                
                var c = [];
                
                var j;
                $.ajax(settings).done(function (response){
                    var pers = response.Response.profile.data.characterIds.length;
                    for (j = 0; j < pers; j++){
                      c[j] = {};
                      c[j].caracterID = response.Response.profile.data.characterIds[j];
                      
                    } 
                    
                     
                });
                return c;
}

function activity(id, caracter, ini, fin, i){
    var settings = {
                    "async": false,
                    "crossDomain": true,
                    //"url": "https://www.bungie.net/Platform/Destiny2/2/Account/" + id +"/Character/" + caracter + "/Stats/Activities/?count=250",
                    "url": "https://www.bungie.net/Platform/Destiny2/2/Account/" + id +"/Character/" + caracter + "/Stats/Activities/?count=250&&mode=7",
                    "method": "GET",
                    "headers": {
                        "X-API-KEY": apikey
    
                    }
                };
                
                
                var a = {};
                a.raid = 0;
                a.asaltos = 0;
                var j;
                var dias = 0;
                var act = [];
                
                $.ajax(settings).done(function (response){
                    dias = 0;
                    if (typeof response.Response.activities !== "undefined"){
                        dias = response.Response.activities.length;
                    }
                    for (j = 0; j < dias; j++){
                        
                        var cantM = response.Response.activities[j].activityDetails.modes.length;
                        act[j] = {};
                        act[j].fecha = response.Response.activities[j].period;
                        act[j].modos = response.Response.activities[j].activityDetails.modes;
                        act[j].completada = response.Response.activities[j].values.completed.basic.value;
                        act[j].kills = response.Response.activities[j].values.kills.basic.value;
                        
                        
                        for (var i = 0; i < cantM; i++){
                            
                            if (response.Response.activities[j].activityDetails.modes[i] === 5){
                                act[j].deaths = response.Response.activities[j].values.deaths.basic.value;
                                act[j].asistecias = response.Response.activities[j].values.assists.basic.value;
                                act[j].victoria = response.Response.activities[j].values.standing.basic.value;
                                
                            }
                            if (response.Response.activities[j].activityDetails.modes[i] === 4){
                                
                                act[j].duracionSeg = response.Response.activities[j].values.activityDurationSeconds.basic.value;
                            }
                            if (response.Response.activities[j].activityDetails.modes[i] === 46 || response.Response.activities[j].activityDetails.modes[i] === 47){
                                act[j].duracionSeg = response.Response.activities[j].values.activityDurationSeconds.basic.value;
                                act[j].puntuacionInd = response.Response.activities[j].values.score.basic.value;
                                act[j].puntuacionTeam = response.Response.activities[j].values.teamScore.basic.value;
                                act[j].finalizada = response.Response.activities[j].values.completionReason.basic.value;
                                
                            }
                            
                                
                                
                            
                            
                        }
                        
                        
                        
                        
                        
                        
                        
                        
                    }
                    
                    /*if (typeof response.Response.raid.daily !== "undefined"){
                        dias = response.Response.raid.daily.length;
                        for (j = 0; j < dias; j++){
                            a.raid += response.Response.raid.daily[j].values.activitiesCleared.basic.value;                            
                        }
                    }
                    if (typeof response.Response.allStrikes.daily !== "undefined"){
                        dias = response.Response.allStrikes.daily.length;
                        for (j = 0; j < dias; j++){
                            a.asaltos += response.Response.allStrikes.daily[j].values.activitiesCleared.basic.value;  
                            
                        }
                    }*/
                    
                });
               
                return act;
}

/*function elementos(id, caracter){
    var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://www.bungie.net/Platform/Destiny2/2/Account/" + id +"/Character/" + caracter + "/Stats/Activities/", 
                    "method": "GET",
                    "headers": {
                        "X-API-KEY": apikey
    
                    }
                };
                var act = {};
                $.ajax(settings).done(function (response){
                    
                   act = response;
                   console.log(act); 
                    
                });
 
}*/


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
 * standing = 0 victoria, = 1 derrota.
 * 41: TrialsCountdown, 6 = victoria
 * 42: TrialsSupervivencia, 4 = victoria
 * 43: IronControl
 * 44: IronEnfrentamiento
 * 45: IronSupreacia
 * 46: OcasoPuntuable
 * 47: OcasoHeroicoPuntuable
 * 48: Disputa
 * 49: TodoDobles
 * 50: Dobles
  */
