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
    document.getElementById("mot").textContent = motsUniquement[randomIndex];
  });
};

function afficherPageJeu() {
  afficherNom();
  afficherErreur();
  document.getElementById("header").style.visibility = "visible";
  afficherMot();
  afficherDevineRep();
}
