"use strict";

// Récupère l'élément HTML avec l'ID "shortenButton" (le bouton)
const button = document.getElementById("shortenButton");

// Récupère l'élément HTML avec l'ID "urlInput" (le champ de texte pour l'URL)
const url = document.getElementById("urlInput");

// Récupère l'élément HTML avec l'ID "result" (la div où afficher le résultat)
const resultDiv = document.getElementById("result");

// Ajoute un gestionnaire d'événements au clic sur le bouton "Réduire"
button.addEventListener("click", () => {

  // Récupère la valeur entrée dans le champ de texte pour l'URL
  const longUrl = urlInput.value;

  // Effectue une requête POST vers le serveur pour raccourcir l'URL
  fetch("/shorten", {
    method: "POST", // Utilise la méthode HTTP POST
    headers: {
      "Content-Type": "application/json", // Définit l'en-tête de la requête comme JSON
    },
    body: JSON.stringify({ longUrl }), // Envoie les données JSON contenant l'URL longue
  })
    .then((response) => response.json()) // Traite la réponse JSON du serveur
    .then((data) => {
      // Affiche l'URL réduite dans la page
      const shortUrl = data.shortUrl;
      resultDiv.innerHTML = `URL réduite : <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    })
    .catch((error) => {
      // En cas d'erreur lors de la réduction de l'URL, affiche un message d'erreur dans la console
      console.error("Erreur lors de la réduction de l'URL :", error);
    });
});
