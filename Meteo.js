// test pour voir comment effacer un paragraphe en jouant sur le css avec JS

var paraph = document.getElementById("test");
paraph.style.display="none";

// Fonction de page d'initialisation

function emptyDetailPage() {
    const pageInit = document.getElementById('detailMeteo');
    while (pageInit.firstChild) {
        pageInit.removeChild(pageInit.firstChild);
    }    
}

// *****************************************************************************
//  Fonction transfo date 
// *****************************************************************************

function transDate(dateFournie){

    //date fournie par Rasburry 

    const dateTransfoYY = dateFournie.substring(0,4);
    const dateTransfoMM = dateFournie.substring(5,7);
    const dateTransfoDD = dateFournie.substring(8,10);
    
    const dateTransfo = dateTransfoDD + "/" + dateTransfoMM + "/" + dateTransfoYY   ;
 
     return dateTransfo;

    }


// *****************************************************************************
//  Fonction transfo date /heure
// *****************************************************************************

function transDateHeure(dateFournie){

    //date fournie par Rasburry 
    const HeureTransfoHH  = dateFournie.substring(11,13);
    const HeureTransfoMM = dateFournie.substring(14,16);
    const HeureTransfoSS = dateFournie.substring(17,19);

    const dateTransfoHeure = transDate(dateFournie) + " " + HeureTransfoHH + ":" + HeureTransfoMM + ":" + HeureTransfoSS ;
 
     return dateTransfoHeure;

    }

   
// *****************************************************************************
// Fonction d'Affichage de dernières mesures (humidité, temp, Pression)
// *****************************************************************************

function createLastMeteo(mesuresByDate,indexNbr){
   
    const sectionCell = document.createElement('section');
    sectionCell.className = indexNbr;
    
    document.getElementById('detailMeteo').appendChild(sectionCell);

    //Entete liste
    const newList = document.createElement('ul');
    newList.className = "listMesures";
    
      
    // List row creation
   
        // Alim entete List avec Titre de la liste
    const mesuresListHeader = {
        enonce: "Dernière mesure du ",
        dateMeteo: transDate(mesuresByDate.measureDate)
    }

    const enteteListCell = document.createElement('li');
    enteteListCell.className = 'titreMesure';
    enteteListCell.innerText = mesuresListHeader.enonce + mesuresListHeader.dateMeteo;
    newList.appendChild(enteteListCell);

        // Alim liste fille avec données fournies
    
    for (let mesuresLastAttributes in mesuresByDate) {
        const mesuresCell = document.createElement('li');
        mesuresCell.innerText = mesuresLastAttributes + " : " + mesuresByDate[mesuresLastAttributes];
        if (!(mesuresByDate[mesuresLastAttributes] == mesuresByDate.measureDate)
            && !(mesuresByDate[mesuresLastAttributes] == mesuresByDate.id)) {
            newList.appendChild(mesuresCell);
        }     
    }
    //document.getElementById('detailMeteo').appendChild(newList);
    sectionCell.appendChild(newList);
}

// Appel du Rasburry pour les dernières mesures :

document.getElementById('lastMesures').addEventListener('click', function(event) {
    
    event.preventDefault();

    emptyDetailPage();

    const request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `https://distorted-louse-3971.dataplicity.io/last-measure`, true);
    
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const mesuresByDate = JSON.parse(this.response);
            console.log(mesuresByDate.humidity);
            console.log(mesuresByDate.id);
            console.log(mesuresByDate.measureDate);
            console.log(mesuresByDate.pressure);
            console.log(mesuresByDate.temperature);

            // Chargement de la données récupérée  de Rasberry
            createLastMeteo(mesuresByDate,'lastMesure');
        } else {
            console.log('Erreur WTF LastMeteo!!!...')
        }
    }
    
    // Send request
    request.send();
});


// *****************************************************************************
// Fonction d'Affichage des Top mesures (humidité, température, Pression)
// *****************************************************************************


// Appel du Rasburry pour les top mesures humidité, température, pression :

document.getElementById('topMesures').addEventListener('click', function(event) {
    
    event.preventDefault();

    emptyDetailPage();

    const request1 = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint => top humidity
    request1.open('GET', `https://distorted-louse-3971.dataplicity.io/top-measure/humidity`, true);
    
    request1.onload = function () {
        if (request1.status >= 200 && request1.status < 400) {
            const mesuresTopHumidity = JSON.parse(this.response);
            console.log(mesuresTopHumidity.humidity);
            // Chargement de la données récupérée  de Rasberry
            createLastMeteo(mesuresTopHumidity,'topHumidity');
        } else {
            console.log('Erreur WTF TopHumidityMeteo!!!...')
        }
    }  
    // Send request
    request1.send();

    const request2 = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint => top pressure
    request2.open('GET', `https://distorted-louse-3971.dataplicity.io/top-measure/pressure`, true);
    
    request2.onload = function () {
        if (request2.status >= 200 && request2.status < 400) {
            const mesuresToppressure = JSON.parse(this.response);
            console.log(mesuresToppressure.pressure);
            // Chargement de la données récupérée  de Rasberry
            createLastMeteo(mesuresToppressure,'topPressure');
        } else {
            console.log('Erreur WTF ToppressureMeteo!!!...')
        }
    }
    
    // Send request
    request2.send();

    const request3 = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint => top temperature
    request3.open('GET', `https://distorted-louse-3971.dataplicity.io/top-measure/temperature`, true);
    
    request3.onload = function () {
        if (request3.status >= 200 && request3.status < 400) {
            const mesuresToptemperature = JSON.parse(this.response);
            console.log(mesuresToptemperature.temperature);
            // Chargement de la données récupérée  de Rasberry
            createLastMeteo(mesuresToptemperature,'topTemperature');
        } else {
            console.log('Erreur WTF ToptemperatureMeteo!!!...')
        }
    }
    
    // Send request
    request3.send();

});

// *********************************************************************************
// Fonction d'Affichage de toutes les mesures (date, humidité, temp, Pression)
// *********************************************************************************

// Table entete :
function createTableEntete() {

    // Table squeletum creation
    //Entete table
    const newTable = document.createElement('table');
    newTable.id = 'tableMeteoList'

    // creation de la theadinit de la table
    const newtHead = document.createElement('thead');
    newTable.appendChild(newtHead);

    // Table header row creation
    const newRowHead = document.createElement('tr');
    newRowHead.id = 'headMeteoList';
    newTable.appendChild(newRowHead);

    const mesuresHeader = {
        humidity: "Date",
        id: "Temperature",
        measureDate:"Humidité",
        pressure:"Pression"
    }

    for (let mesuresHeaderAttributes in mesuresHeader) {
        const mesuresCell = document.createElement('th');
        mesuresCell.innerText = mesuresHeader[mesuresHeaderAttributes];
        newRowHead.appendChild(mesuresCell)
    }

    // creation de la tbody de la table
    const newtbody = document.createElement('tbody');
    newTable.appendChild(newtbody);

    document.getElementById('detailMeteo').appendChild(newTable);
    return  newTable;
}

// Table rows :

function createTableMeteo(mesuresByDate, newTable) {

    // Table other rows creation
    const newRow = document.createElement('tr');

    for (let mesuresByDateAttributes in mesuresByDate) {
        const mesuresCell = document.createElement('td');
        const tableDate = transDateHeure(mesuresByDate.measureDate);
        mesuresCell.innerText = mesuresByDate[mesuresByDateAttributes];
        
        if (mesuresCell.innerText == mesuresByDate.measureDate) {
            mesuresCell.innerText = tableDate ;
        }
        
        if (!(mesuresCell.innerText == mesuresByDate.id)) {
            newRow.appendChild(mesuresCell);       
        }
    }
    //document.getElementById('detailMeteo').appendChild(newRow);
    document.getElementById('tableMeteoList').appendChild(newRow);

}
// ************************************************************************************
//  Fonction de prise des données et chargement de la table créée
// ************************************************************************************
document.getElementById('mesureTab').addEventListener('click', function(event) {
    
    event.preventDefault();

    emptyDetailPage();

    const request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `https://distorted-louse-3971.dataplicity.io/measure/date?startDate=2019-11-07&endDate=2019-11-08`, true);
    
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const mesuresByDate = JSON.parse(this.response);

            if (mesuresByDate != " ") {
                // Creation de l'entete de la table
                const newTable = createTableEntete();
                // Chargement de toutes les données de table Meteo
                for (let dayMesures in mesuresByDate) {
                    meteoDayMesure = mesuresByDate[dayMesures];
                    createTableMeteo(meteoDayMesure, newTable);
                }  
                const messageVide = "Aucune donnée Méteo" ;
                const paraphVide = document.createElement('p');
                paraphVide.innerText = messageVide;
                document.getElementById('detailMeteo').appendChild(paraphVide);
            }
        } else {
            console.log('Erreur WTF!!!...')
        }
    }
    
    // Send request
    request.send();
})
// meteoMesuresList in local storage
// var mesuresByDateList = [];

// if (localStorage.getItem('mesuresByDateList') != null) {
//     mesuresByDateList = JSON.parse(localStorage.getItem('mesuresByDateList'));
// }

// console.log(mesuresByDateList);
// for (mesuresByDate of mesuresByDateList) {
//     console.log(mesuresByDate);
//     createTableMeteo(mesuresByDate);
// 