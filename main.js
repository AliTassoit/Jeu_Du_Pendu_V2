function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth", // Ajoute une animation de défilement fluide
  });
}

function afficherNom() {
  var nom = document.getElementById("nom").value;
  var affichageNom = document.getElementById("affichageNom");
  affichageNom.textContent = "Bonjour, " + nom + " !";
}

var erreur = 0;

var nombreErreur = document.getElementById("nombreErreur");
nombreErreur.textContent = erreur;
erreur++;
