let touchesDejaPresse = [];
let motMystere;
let motAffiche;

let enleverAccents = (chaine) => {
  return chaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

function recupererMotsUniquement() {
  return new Promise((resolve, reject) => {
    let apiUrl = "https://trouve-mot.fr/api/random/10";

    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (words) {
        let motsUniquement = $.map(words, (mot) => {
          return mot.name;
        });

        const randomIndex = Math.floor(Math.random() * motsUniquement.length);
        let motsSansAccent = motsUniquement.map(function (mot) {
          return enleverAccents(mot);
        });
        motMystere = motsSansAccent[randomIndex].toUpperCase();

        resolve(motsUniquement);
      },
      error: function () {
        reject("Erreur lors de la récupération des mots");
      },
    });
  });
}

let afficherNom = () => {
  const nom = document.getElementById("nom").value;
  const affichageNom = document.getElementById("affichageNom");
  affichageNom.textContent = "Bonjour, " + nom + " !";
};

let erreur = 0;

let afficherErreur = () => {
  document.getElementById("compteurErreur").style.visibility = "visible";
  const nombreErreur = document.getElementById("nombreErreur");
  nombreErreur.textContent = erreur;
};

let afficherClavier = () => {
  document.getElementById("clavier").style.visibility = "visible";
};

function gestionToucheClavier(event) {
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
    if (touchesDejaPresse.includes(touchePresse)) {
    } else {
      erreur++;
      afficherErreur();
      toucheCorrespondante.classList.add("faux");
      touchesDejaPresse.push(touchePresse);
      if (erreur == 8) {
        alert("Vous avez perdu, l'homme est pendu");
      }
    }
  }

  document.getElementById("mot").textContent = motAffiche.join(" ");
  if (!motAffiche.includes("_")) {
    setTimeout(() => {
      alert("Vous avez gagné !");
    }, 500);
  }
}

let reinitialiserClavier = () => {
  let lettresClavier = document.getElementsByClassName("touche");

  for (let i = 0; i < lettresClavier.length; i++) {
    lettresClavier[i].classList.remove("faux", "correct");
  }
};

let afficherMot = () => {
  recupererMotsUniquement()
    .then((motsUniquement) => {
      const randomIndex = Math.floor(Math.random() * motsUniquement.length);
      let motsSansAccent = motsUniquement.map(function (mot) {
        return enleverAccents(mot);
      });

      motMystere = motsSansAccent[randomIndex].toUpperCase();
      console.log(motMystere);

      motAffiche = Array(motMystere.length).fill("_");

      document.getElementById("mot").textContent = motsUniquement[randomIndex];

      document.getElementById("mot").textContent = motAffiche.join(" ");

      document.addEventListener("keydown", gestionToucheClavier);
    })
    .catch((error) => {
      alert("Merci de réessayer plus tard");
      console.error(error);
    });
};

let reinitialiserJeu = () => {
  erreur = 0;
  afficherNom();
  afficherErreur();
  document.getElementById("header").style.visibility = "visible";
  afficherMot();
  reinitialiserClavier();
  afficherClavier();
};

let afficherPageJeu = () => {
  afficherNom();
  afficherErreur();
  document.getElementById("header").style.visibility = "visible";
  afficherMot();
  afficherClavier();
  document.getElementById("recommencer").style.display = "block";
};
