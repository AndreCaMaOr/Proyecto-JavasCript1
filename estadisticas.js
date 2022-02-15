// let partidos = data2.matches

function getFetch() {
    const url = "https://api.football-data.org/v2/competitions/2014/matches"
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
        let partidos = data.matches
        // console.log(partidos)
       
        quitarSpinner();
        estadisticas(partidos)
        estadisticas2(partidos)
        
    });

}

getFetch()

function quitarSpinner() {
    let spinner= document.getElementById("spin")
    spinner.style.display= "none"
    spinner.style.visibility ="hidden"
 }

function estadisticas(partido) {
    let estadisticasPartido = []
    for (let i = 0; i < partido.length; i++) {
        let estadoPartido = partido[i].status
        if (estadoPartido !== "FINISHED") {
            continue
        }

        let equipolocal = partido[i].homeTeam.name
        let equipoVisitante = partido[i].awayTeam.name

        let idLocal = partido[i].homeTeam.id
        let idVisitante = partido[i].awayTeam.id

        let golesLocal = partido[i].score.fullTime.homeTeam
        let golesVisitante = partido[i].score.fullTime.awayTeam

        let equipoLocalEncontrado;
        estadisticasPartido.forEach(x => {
            if (x.id === idLocal) {
                equipoLocalEncontrado = x
            }
        })
        if (equipoLocalEncontrado == undefined) {
            estadisticasPartido.push({
                id: idLocal,
                name: equipolocal,
                goals: golesLocal,
                matches: 1

            })
        } else {
            equipoLocalEncontrado.matches++
            equipoLocalEncontrado.goals += golesLocal
        }

        let equipoVisitanteEncontrado;
        estadisticasPartido.forEach(x => {
            if (x.id === idVisitante) {
                equipoVisitanteEncontrado = x
            }
        })
        if (equipoVisitanteEncontrado == undefined) {
            estadisticasPartido.push({
                id: idVisitante,
                name: equipoVisitante,
                goals: golesVisitante,
                matches: 1

            })
        } else {
            equipoVisitanteEncontrado.matches++
            equipoVisitanteEncontrado.goals += golesVisitante
        }


    }
    for (let j = 0; j < estadisticasPartido.length; j++) {
        let promGoles = estadisticasPartido[j].goals / estadisticasPartido[j].matches
        estadisticasPartido[j].avg = promGoles
    }
    estadisticasPartido.sort((a, b) => b.avg - a.avg)
    let mejores = estadisticasPartido.slice(0, 5) //hacer tabla con esto
    console.log(mejores);

    crearTabla(mejores)

}

// estadisticas(partidos)

function crearTabla(masGoles) {
    let cuerpoTabla3 = document.getElementById("tablaMejores")
    for (let p = 0; p < masGoles.length; p++) {
        const tr = document.createElement("tr")

        let idEquipo = masGoles[p].id
        let logoE = document.createElement("img")
        logoE.setAttribute("src", "https://crests.football-data.org/" + idEquipo + ".svg")
        logoE.classList.add("logos")


        let partidos = [
            logoE,
            masGoles[p].name,
            masGoles[p].goals,
            masGoles[p].matches,
            masGoles[p].avg.toFixed(2),
        ]

        for (let q = 0; q < partidos.length; q++) {
            const td = document.createElement("td")
            td.append(partidos[q])
            tr.appendChild(td)


        }

        cuerpoTabla3.appendChild(tr)
    }



}

// para la tabla 2
function estadisticas2(partido) {
    let estadisticasPartido2 = []
    for (let i = 0; i < partido.length; i++) {
        let estadoPartido = partido[i].status
        if (estadoPartido !== "FINISHED") {
            continue
        }

        let equipoVisitante = partido[i].awayTeam.name
        let idVisitante = partido[i].awayTeam.id
        let golesLocal = partido[i].score.fullTime.homeTeam


        let equipoVisitanteEncontrado;
        estadisticasPartido2.forEach(x => {
            if (x.id === idVisitante) {
                equipoVisitanteEncontrado = x
            }
        })
        if (equipoVisitanteEncontrado == undefined) {
            estadisticasPartido2.push({
                id: idVisitante,
                name: equipoVisitante,
                goals: golesLocal,
                matches: 1

            })
        } else {
            equipoVisitanteEncontrado.matches++
            equipoVisitanteEncontrado.goals += golesLocal
        }


    }


    estadisticasPartido2.sort((a, b) => a.goals - b.goals)
    let tablaMenosG2 = estadisticasPartido2.slice(0, 5)
    console.log(tablaMenosG2);

    crearTabla2(tablaMenosG2)
}

// estadisticas2(partidos)

function crearTabla2(menosGoles) {
    let cuerpoTabla4 = document.getElementById("tablaMenosG2")
    for (let w = 0; w < menosGoles.length; w++) {
        const tr = document.createElement("tr")

        let idEquipo = menosGoles[w].id
        let logoE = document.createElement("img")
        logoE.setAttribute("src", "https://crests.football-data.org/" + idEquipo + ".svg")
        logoE.classList.add("logos")


        let partidos = [
            logoE,
            menosGoles[w].name,
            menosGoles[w].goals,
            menosGoles[w].matches,

        ]

        for (let e = 0; e < partidos.length; e++) {
            const td = document.createElement("td")
            td.append(partidos[e])
            tr.appendChild(td)


        }

        cuerpoTabla4.appendChild(tr)
    }



}