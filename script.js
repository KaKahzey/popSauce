let body = document.getElementsByTagName("body")[0]
let pageAccueil = document.getElementById("pageAccueil")
let pageJeu = document.getElementById("pageJeu")
let pageResultats = document.getElementById("pageResultats")
let zoneImageFilm = document.getElementById("imageFilm")
let reponse = document.getElementById("reponse")
let skip = document.getElementById("skip")
let spanResultat = document.getElementById("zoneResultat")
let zoneBouttonsChoixAffichage = document.getElementById("bouttonsChoixAffichage")
let bouttonsChoixAffichage = zoneBouttonsChoixAffichage.querySelectorAll("input")
let bouttonRelancer = document.getElementById("bouttonRelancer")
let champsScore = document.getElementById("champsScore")
let tableauScores = document.getElementById("tableauScores")
let bouttonAfficherScores = document.getElementById("bouttonAfficherScores")
let arriveeResultats = document.getElementById("arriveeResultats")
let points = 0
let timerDebut = 0
let timerFin = 0
let tempsFinal = 0
let resultatFinal = 0
let nomChampion = ""

let difficulteChoisie = null
let listeFilms = []
let filmActuel = ""
let compteurFilms = 0
let compteurFilmsImages = 0

let reinitialiser = () =>{
    points = 0
    timerDebut = 0
    difficulteChoisie = null
    compteurFilms = 0
    compteurFilmsImages = 0
    nomChampion = ""
    resultatFinal = 0
    pageAccueil.children[2].removeAttribute("class", "checked")
    pageAccueil.children[3].removeAttribute("class", "checked")
    pageAccueil.children[4].removeAttribute("class", "checked")
}
//juste pour changer la couleur des boutons indiquer la difficulté choisie
pageAccueil.children[2].addEventListener("click", () =>{
    pageAccueil.children[0].setAttribute("src", "images/dumb.jpg")
    pageAccueil.children[2].setAttribute("class", "checked")
    pageAccueil.children[3].removeAttribute("class", "checked")
    pageAccueil.children[4].removeAttribute("class", "checked")
})
pageAccueil.children[3].addEventListener("click", () =>{
    pageAccueil.children[0].setAttribute("src", "images/normal.jpg")
    pageAccueil.children[3].setAttribute("class", "checked")
    pageAccueil.children[2].removeAttribute("class", "checked")
    pageAccueil.children[4].removeAttribute("class", "checked")
})
pageAccueil.children[4].addEventListener("click", () =>{
    pageAccueil.children[0].setAttribute("src", "images/gigachad.jpg")
    pageAccueil.children[4].setAttribute("class", "checked")
    pageAccueil.children[2].removeAttribute("class", "checked")
    pageAccueil.children[3].removeAttribute("class", "checked")
})

pageAccueil.children[5].children[0].addEventListener("click", () =>{
    if(pageAccueil.children[2].className == "checked"){
        difficulteChoisie = "imagesAntoine"
    }
    else if(pageAccueil.children[3].className == "checked"){
        difficulteChoisie = "imagesNormal"
    }
    else if(pageAccueil.children[4].className == "checked"){
        difficulteChoisie = "imagesRobin"
    }
    if(difficulteChoisie){
        afficherJeu()
    }
    else{
        alert("il semblerait que vous ayez besoin de choisir la difficulté Antoine")
    }
  })
////////////////////////////////////////////////////////////////////////////////////


let afficherJeu = () =>{
    pageAccueil.setAttribute("hidden", "hidden")
    pageResultats.setAttribute("hidden", "hidden")
    pageJeu.removeAttribute("hidden")
    if(difficulteChoisie == "imagesAntoine"){
        listeFilms = Object.keys(imagesAntoine)
    }
    else if(difficulteChoisie == "imagesNormal"){
        listeFilms = Object.keys(imagesNormal)
    }
    else{
        listeFilms = Object.keys(imagesRobin)
    }
    afficherFilm()
    activerTimer()
    reponse.value = ""
    bouttonRelancer.setAttribute("hidden", "hidden")
    
}

let afficherFilm = () =>{
    if(imagesAntoine[listeFilms[compteurFilms]] || imagesNormal[listeFilms[compteurFilms]] || imagesRobin[listeFilms[compteurFilms]]){
        modifierBouttonsChoixAffichage()
        filmActuel = listeFilms[compteurFilms]
        if(difficulteChoisie == "imagesAntoine"){
            zoneImageFilm.setAttribute("src", imagesAntoine[listeFilms[compteurFilms]][compteurFilmsImages].src)
        }
        else if(difficulteChoisie == "imagesNormal"){
            zoneImageFilm.setAttribute("src", imagesNormal[listeFilms[compteurFilms]][compteurFilmsImages].src)
        }
        else{
            zoneImageFilm.setAttribute("src", imagesRobin[listeFilms[compteurFilms]][compteurFilmsImages].src)
            
        }
        compteurFilmsImages += 1
        bouttonsChoixAffichage.forEach((boutton) =>{
            boutton.checked = false
        })
    }
    else{
        afficherResultats()
    }
    
    
}
let modifierBouttonsChoixAffichage = () =>{
    bouttonsChoixAffichage.forEach((boutton, index) =>{
        boutton.addEventListener("click", () =>{
            if(difficulteChoisie == "imagesAntoine"){
                zoneImageFilm.setAttribute("src", imagesAntoine[listeFilms[compteurFilms]][index].src)
            }
            else if(difficulteChoisie == "imagesNormal"){
                zoneImageFilm.setAttribute("src", imagesNormal[listeFilms[compteurFilms]][index].src)
            }
            else{
                zoneImageFilm.setAttribute("src", imagesRobin[listeFilms[compteurFilms]][index].src)
                
            }
        })
    })
    if(compteurFilmsImages == 0){
        bouttonsChoixAffichage.forEach((boutton) =>{
            boutton.setAttribute("hidden", "hidden")
        })
    }
    console.log("bite")
    bouttonsChoixAffichage[compteurFilmsImages].removeAttribute("hidden")
}



reponse.addEventListener("keydown", (e) =>{
    if (e.key === "Enter") {
        let reponseUtilisateur = reponse.value.trim().toLowerCase()
        if (reponseUtilisateur === filmActuel.toLowerCase()) {
          compteurFilms += 1
          compteurFilmsImages = 0
          points += 10
        } 
        reponse.value = ""
        if(compteurFilmsImages == 4 && compteurFilms < 3){
            compteurFilms += 1
            compteurFilmsImages = 0
            modifierBouttonsChoixAffichage()
        }
        if(!(compteurFilms >= 3 && compteurFilmsImages >= 4)){
            afficherFilm()
        }
        else{
            afficherResultats()
        }
        
    }
})


skip.addEventListener("click", () =>{
    compteurFilms += 1
    compteurFilmsImages = 0
    reponse.value = ""
    if(!(compteurFilms >= 3 && compteurFilmsImages >= 4)){
        afficherFilm()
    }
    else{
        afficherResultats()
    }
})

let activerTimer = () =>{
    if(timerDebut == 0){
        timerDebut = Date.now()
    }
    else{
        timerFin = Date.now()
        tempsFinal = (timerFin - timerDebut) / 1000
    }
}


let afficherResultats = () =>{
    pageAccueil.setAttribute("hidden", "hidden")
    pageJeu.setAttribute("hidden", "hidden")
    pageResultats.removeAttribute("hidden")
    activerTimer()
    spanResultat.innerText = calculerPoints()
    bouttonAfficherScores.setAttribute("hidden", "hidden")
    tableauScores.setAttribute("hidden", "hidden")
    arriveeResultats.removeAttribute("hidden")
    ajouterScore()
    reinitialiser()

}

champsScore.addEventListener("keydown", (e) =>{
    if (e.key === "Enter") {
        if(champsScore.value){
            nomChampion = champsScore.value
            ajouterScore()
            champsScore.value = ""
            bouttonRelancer.removeAttribute("hidden")
            bouttonAfficherScores.removeAttribute("hidden")
            arriveeResultats.setAttribute("hidden", "hidden")
        }
        
    }
})

let ajouterScore = () =>{
    let users
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
      } else {
        users = [];
      }
    users.push({ nomChampion, difficulteChoisie, resultatFinal });
    localStorage.setItem("users", JSON.stringify(users)); 
    reinitialiser()
}


let afficherAccueil = () =>{
    pageResultats.setAttribute("hidden", "hidden")
    pageJeu.setAttribute("hidden", "hidden")
    pageAccueil.removeAttribute("hidden")
}

bouttonRelancer.addEventListener("click", () =>{
    afficherAccueil()
})


let calculerPoints = () =>{
    return resultatFinal = (points * (tempsFinal <= 100? 100 - tempsFinal: 1)).toFixed(0)
}


let afficherScores = () =>{
    let users = JSON.parse(localStorage.getItem("users"))
    let usersTries
    let difficulte
    users.forEach((u) =>{
        switch(u.difficulteChoisie){
            case "imagesAntoine":
                difficulte = "Antoine"
                break
            case "imagesNormal":
                difficulte = "Normal"
                break
            case "imagesRobin":
                difficulte = "Robin"
                break
        }
        tableauScores.innerHTML += "<tr><td>" + u.nomChampion + "</td><td>" + difficulte + "</td><td>" + u.resultatFinal + "</td></tr>"
        tableauScores.removeAttribute("hidden")
    })
    
}

bouttonAfficherScores.addEventListener("click", () =>{
    afficherScores()
})

let imagesAntoine = {
    alien: [
      { src: "images/jeu/alienAntoine/alien1.jpg" },
      { src: "images/jeu/alienAntoine/alien2.jpg" },
      { src: "images/jeu/alienAntoine/alien3.jpg" },
      { src: "images/jeu/alienAntoine/alien4.jpg" }
    ],
    titanic: [
      { src: "images/jeu/titanicAntoine/titanic1.png" },
      { src: "images/jeu/titanicAntoine/titanic2.png" },
      { src: "images/jeu/titanicAntoine/titanic3.png" },
      { src: "images/jeu/titanicAntoine/titanic4.png" }
    ],
    avatar: [
      { src: "images/jeu/avatarAntoine/avatar1.png" },
      { src: "images/jeu/avatarAntoine/avatar2.png" },
      { src: "images/jeu/avatarAntoine/avatar3.png" },
      { src: "images/jeu/avatarAntoine/avatar4.png" }
    ],
    "star wars": [
      { src: "images/jeu/starAntoine/star1.png" },
      { src: "images/jeu/starAntoine/star2.png" },
      { src: "images/jeu/starAntoine/star3.png" },
      { src: "images/jeu/starAntoine/star4.png" }
    ]
}
let imagesNormal = {
    "mission impossible": [
      { src: "images/jeu/missionNormal/mission1.png" },
      { src: "images/jeu/missionNormal/mission2.png" },
      { src: "images/jeu/missionNormal/mission3.png" },
      { src: "images/jeu/missionNormal/mission4.png" }
    ],
    "Indiana jones": [
      { src: "images/jeu/indianaNormal/indiana1.png" },
      { src: "images/jeu/indianaNormal/indiana2.png" },
      { src: "images/jeu/indianaNormal/indiana3.png" },
      { src: "images/jeu/indianaNormal/indiana4.png" }
    ],
    parrain: [
      { src: "images/jeu/parrainNormal/parrain1.png" },
      { src: "images/jeu/parrainNormal/parrain2.png" },
      { src: "images/jeu/parrainNormal/parrain3.png" },
      { src: "images/jeu/parrainNormal/parrain4.png" }
    ],
    "harry potter": [
      { src: "images/jeu/harryNormal/harry1.png" },
      { src: "images/jeu/harryNormal/harry2.png" },
      { src: "images/jeu/harryNormal/harry3.png" },
      { src: "images/jeu/harryNormal/harry4.png" }
    ]
}
  
let imagesRobin = {
    "jurassic park": [
      { src: "images/jeu/jurassicRobin/jurassic1.jpg" },
      { src: "images/jeu/jurassicRobin/jurassic2.png" },
      { src: "images/jeu/jurassicRobin/jurassic3.png" },
      { src: "images/jeu/jurassicRobin/jurassic4.png" }
    ],
    "independence day": [
      { src: "images/jeu/independenceRobin/independence1.png" },
      { src: "images/jeu/independenceRobin/independence2.png" },
      { src: "images/jeu/independenceRobin/independence3.png" },
      { src: "images/jeu/independenceRobin/independence4.png" }
    ],
    "john wick": [
      { src: "images/jeu/johnRobin/john1.png" },
      { src: "images/jeu/johnRobin/john2.png" },
      { src: "images/jeu/johnRobin/john3.png" },
      { src: "images/jeu/johnRobin/john4.png" }
    ],
    "die hard": [
      { src: "images/jeu/dieRobin/die1.png" },
      { src: "images/jeu/dieRobin/die2.png" },
      { src: "images/jeu/dieRobin/die3.png" },
      { src: "images/jeu/dieRobin/die4.png" }
    ]
}