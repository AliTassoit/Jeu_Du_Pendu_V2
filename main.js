function recupererMotsUniquement(callback) {
  let apiUrl = "https://trouve-mot.fr/api/random/10";

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (words) {
      let motsUniquement = $.map(words, (mot) => {
        return mot.name;
      });

      callback(motsUniquement);
    },
    error: () => {
      alert("Merci de réessayer plus tard");
    },
  });
}

function enleverAccents(chaine) {
  return chaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth", // Ajoute une animation de défilement fluide
  });
}

function afficherNom() {
  const nom = document.getElementById("nom").value;
  const affichageNom = document.getElementById("affichageNom");
  affichageNom.textContent = "Bonjour, " + nom + " !";
}

let erreur = 0;

function afficherErreur() {
  document.getElementById("compteurErreur").style.visibility = "visible";
  const nombreErreur = document.getElementById("nombreErreur");
  nombreErreur.textContent = erreur;
}

let afficherDevineRep = () => {
  document.getElementById("devineReponse").style.visibility = "visible";
};

let afficherMot = () => {
  recupererMotsUniquement((motsUniquement) => {
    const randomIndex = Math.floor(Math.random() * motsUniquement.length);
    let motsSansAccent = motsUniquement.map(function (mot) {
      return enleverAccents(mot);
    });
    document.getElementById("mot").textContent = motsUniquement[randomIndex];
    let motMystere = motsSansAccent[randomIndex];
    motMystere = motMystere.toUpperCase();

    console.log(motMystere);
    let motAffiche = Array(motMystere.length).fill("_");
    document.getElementById("mot").textContent = motAffiche.join(" ");
    document.addEventListener("keydown", (event) => {
      let touchePresse = event.key.toUpperCase();
      let toucheCorrespondante = document.getElementById(touchePresse);
      let lettrePresente = motMystere.includes(touchePresse);
      if (lettrePresente) {
        for (let i = 0; i < motMystere.length; i++) {
          if (motMystere[i] === touchePresse) {
            motAffiche[i] = touchePresse;
          }
        }
        toucheCorrespondante.classList.add("correct");
      } else {
        erreur++;
        afficherErreur();
        toucheCorrespondante.classList.add("faux");
      }
      document.getElementById("mot").textContent = motAffiche.join(" ");
    });
  });
};

function afficherPageJeu() {
  afficherNom();
  afficherErreur();
  document.getElementById("header").style.visibility = "visible";
  afficherMot();
  afficherDevineRep();
}
