// let partidos= data2.matches
// console.log(partidos)

// for (let i = 0; i < partidos.length; i++) {
//     console.log (partidos[i].awayTeam)
//     // console.log (partidos[i].homeTeam)
//     // console.log (partidos[i].score.fullTime.homeTeam+"-"+partidos[i].score.fullTime.awayTeam) 
//     // console.log (partidos[i].matchday)
//     // console.log(partidos[i].utcDate)
// }

// let partidos = data.matches

quitarAlerta1()
quitarAlerta2()
quitarAlerta3()
quitarAlerta4()

function getFetch(url) {
    // const url = "https://api.football-data.org/v2/competitions/2014/matches"
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
        let button = document.getElementById("buscar")
        button.addEventListener("click", () => {
            crearfiltro(partidos);
        })
        let buttonReset = document.getElementById("reset")
        buttonReset.addEventListener("click", () => {
            // console.log("funciona")
            quitarAlerta1();
            quitarAlerta2();
            quitarAlerta3();
            quitarAlerta4();
            resetFiltros();
            crearTabla(partidos);

        })
        quitarAlerta1();
        quitarAlerta2();
        quitarAlerta3();
        quitarAlerta4();
        quitarSpinner();
        crearTabla(partidos);

    // }).catch(error => {
    //     console.log(error)
    //    alert("Ha ocurrido un error")
    // 
});
}

getFetch("https://api.football-data.org/v2/competitions/2014/matches")


let premierLeague = document.getElementById("buscar1");

premierLeague.addEventListener("click",()=> {
    const url2="https://api.football-data.org/v2/competitions/2021/matches"
getFetch(url2)   
})

let LigaFrancesa = document.getElementById("buscar2");

LigaFrancesa.addEventListener("click",()=> {
    const url3="https://api.football-data.org/v2/competitions/2015/matches"
getFetch(url3)   
})




function quitarSpinner() {
    let spinner = document.getElementById("spin")
    spinner.style.display = "none"
    spinner.style.visibility = "hidden"
}

function alerta1() {
    let alerta1 = document.getElementById("alerta1")
    alerta1.style.display = "block"
}

function quitarAlerta1() {
    let alerta1 = document.getElementById("alerta1")
    alerta1.style.display = "none"
}

function alerta2() {
    let alerta2 = document.getElementById("alerta2")
    alerta2.style.display = "block"
}

function quitarAlerta2() {
    let alerta2 = document.getElementById("alerta2")
    alerta2.style.display = "none"
}

function alerta3() {
    let alerta3 = document.getElementById("alerta3")
    alerta3.style.display = "block"
}

function quitarAlerta3() {
    let alerta3 = document.getElementById("alerta3")
    alerta3.style.display = "none"
}

function alerta4() {
    let alerta4 = document.getElementById("alerta4")
    alerta4.style.display = "block"
}

function quitarAlerta4() {
    let alerta4 = document.getElementById("alerta4")
    alerta4.style.display = "none"
}

function crearTabla(matches) {
    let cuerpo_Tabla = document.getElementById("cuerpoTabla")
    cuerpo_Tabla.innerText = ""
    console.log(cuerpo_Tabla)

    for (let i = 0; i < matches.length; i++) {
        const tr = document.createElement("tr")

        let eqLocal = document.createElement("p")
        eqLocal.innerHTML = matches[i].homeTeam.name

        let imgEqLocal = document.createElement("img");
        imgEqLocal.setAttribute("src", "https://crests.football-data.org/" + matches[i].homeTeam.id + ".svg")
        imgEqLocal.classList.add("logos")

        let eqVisitante = document.createElement("p")
        eqVisitante.innerHTML = matches[i].awayTeam.name

        let imgEqVisitante = document.createElement("img");
        imgEqVisitante.setAttribute("src", "https://crests.football-data.org/" + matches[i].awayTeam.id + ".svg")
        imgEqVisitante.classList.add("logos")

        let puntaje = document.createElement("p")
        puntaje.innerHTML = matches[i].score.fullTime.homeTeam + "-" + matches[i].score.fullTime.awayTeam

        let day = document.createElement("p")
        day.innerHTML = matches[i].matchday

        let utc = new Date(matches[i].utcDate)

        let datoscog = [eqLocal, imgEqLocal, eqVisitante, imgEqVisitante, puntaje, day, utc.toLocaleString()]
        for (let m = 0; m < datoscog.length; m++) {
            const td = document.createElement("td")
            td.append(datoscog[m])
            tr.appendChild(td)
        }
        cuerpo_Tabla.appendChild(tr)
    }

}


// let button = document.getElementById("buscar")
// button.addEventListener("click", () => {
//     crearfiltro(partidos);
// })

function resetFiltros() {
    document.getElementById("nuevaTab").value = ""
    let radioBoton = document.querySelectorAll("input[type=radio]")
    for (i in radioBoton) {
        radioBoton[i].checked = false
    }
}

function crearfiltro(parti) {
    let inputEntrada = document.getElementById("nuevaTab").value
    let radioBoton = document.querySelector("input[type=radio]:checked")

    if (inputEntrada == "") {
        return alerta1()
    }
    if (!isNaN(inputEntrada)) {
        return alerta3()
    }

    let nombreEqInput = parti.filter(p => {
        if (p.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase()) || p.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase())) {
            return true
        } else {
            return false
        } 
    })
    if (nombreEqInput.length === 0) {
        return alerta2()
    }

   

    crearTabla(nombreEqInput)
    // console.log (nombreEqInput)

    if (radioBoton === null) {
        return crearTabla(nombreEqInput)
    }

    let resultFilter = nombreEqInput.filter(partidos => {
        if (radioBoton.value === "Ganados") {
            if ((partidos.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase()) && partidos.score.winner == "HOME_TEAM") ||
                (partidos.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase()) && partidos.score.winner == "AWAY_TEAM")) {
                return true;
            }
        }

        if (partidos.score.winner === "DRAW" && radioBoton.value === "Empatados") {
            return true;
        }

        if (radioBoton.value === "Perdidos") {
            if ((partidos.homeTeam.name.toLowerCase().includes(inputEntrada.toLowerCase()) && partidos.score.winner == "AWAY_TEAM") ||
                (partidos.awayTeam.name.toLowerCase().includes(inputEntrada.toLowerCase()) && partidos.score.winner == "HOME_TEAM")) {
                return true;
            }
        }

       

    })
    // console.log(resultFilter)
    crearTabla(resultFilter)
}