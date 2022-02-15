// let clasif = data.standings[0].table

// for (let i = 0; i < clasif.length; i++) {
// console.log(clasif[i].team.name)
// console.log(clasif[i].team.crestUrl)
// console.log(clasif[i].playedGames)
// console.log(clasif[i].won)
// console.log(clasif[i].draw)
// console.log(clasif[i].lost)
// console.log(clasif[i].points)
// console.log(clasif[i].goalsFor)
// console.log(clasif[i].goalsAgainst)
// console.log(clasif[i].goalDifference)
// console.log(clasif[i].position)
// }


function getFetch() {
    const url = "https://api.football-data.org/v2/competitions/2014/standings"
    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "f0194fbd32d449c8a2078a80459a21a3"
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
                     
        };
    }).then(data => {
      
        let clasif = data.standings[0].table
        console.log(clasif)
        quitarSpinner();
        posic(clasif);
        
    })
   
}

getFetch()

function quitarSpinner() {
   let spinner= document.getElementById("spin")
   spinner.style.display= "none"
   spinner.style.visibility ="hidden"
}




// let clasif = data.standings[0].table

function posic(equipos) {
    let ordenligas = document.getElementById("liga")

    for (let i = 0; i < equipos.length; i++) {
        const tr = document.createElement("tr")

        let pos = document.createElement("p")
        pos.innerHTML = equipos[i].position

        club = document.createElement("p")
        club.innerHTML = equipos[i].team.name

        const image = document.createElement("img")
        image.src = equipos[i].team.crestUrl
        image.classList.add("logos")

        let Pjugados = document.createElement("p")
        Pjugados.innerHTML = equipos[i].playedGames

        let won = document.createElement("p")
        won.innerHTML = equipos[i].won

        let draw = document.createElement("p")
        draw.innerHTML = equipos[i].draw

        let lost = document.createElement("p")
        lost.innerHTML = equipos[i].lost

        let puntos = document.createElement("p")
        puntos.innerHTML = equipos[i].points

        let GF = document.createElement("p")
        GF.innerHTML = equipos[i].goalsFor

        let Gc = document.createElement("p")
        Gc.innerHTML = equipos[i].goalsAgainst

        let DG = document.createElement("p")
        DG.innerHTML = equipos[i].goalDifference

        let todos = [pos, club, image, Pjugados, won, draw, lost, puntos, GF, Gc, DG]
        for (let m = 0; m < todos.length; m++) {
            const td = document.createElement("td")
            td.append(todos[m])
            tr.appendChild(td)
        }

        ordenligas.appendChild(tr)
    }

}

// posic(clasif)