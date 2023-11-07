const searchForm = document.getElementById('searchForm');
const titleInput = document.getElementById('title');
const apiKey = 'b24be3c2';

async function fetchrequete(title, apiKey) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Response === "True") {
            displayResults(data); // Affichez les résultats en utilisant la fonction ci-dessus
        } else {
            console.error('Film introuvable:', data.Error);
        }
    } catch (error) {
        console.error('Erreur lors de la requête à l\'API OMDb:', error);
    }
}

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = titleInput.value;
    fetchrequete(title, apiKey);
});


 function displayResults(data) {
     // Sélectionnez l'élément du DOM afficher les résultats
     const resultsContainer = document.getElementById('resultsContainer');
     // Créez la carte Bootstrap
     const card = document.createElement('div');
     card.className = 'col-sm';
     card.className = 'card'
     // Créez le corps de la carte
     const cardBody = document.createElement('div');
     cardBody.className = 'card-body'
     // Titre du film
     const titleElement = document.createElement('h5');
     titleElement.className = 'card-title';
     titleElement.textContent = data.Title;
     cardBody.appendChild(titleElement)
     // Année de sortie
     const yearElement = document.createElement('p');
     yearElement.className = 'card-text';
     yearElement.textContent = `Année de sortie : ${data.Year}`;
     cardBody.appendChild(yearElement)
     // Réalisateur
     const directorElement = document.createElement('p');
     directorElement.className = 'card-text';
     directorElement.textContent = `Réalisateur : ${data.Director}`;
     cardBody.appendChild(directorElement)
     // Acteurs
     const actorsElement = document.createElement('p');
     actorsElement.className = 'card-text';
     actorsElement.textContent = `Acteurs : ${data.Actors}`;
     cardBody.appendChild(actorsElement)
     // Synopsis
     const plotElement = document.createElement('p');
     plotElement.className = 'card-text';
     plotElement.textContent = `Synopsis : ${data.Plot}`;
     cardBody.appendChild(plotElement)
     // Ajoutez le corps de la carte à la carte
     card.appendChild(cardBody)
     // Ajoutez la carte complète au conteneur de résultats
     resultsContainer.appendChild(card);
         // Créez l'image de la carte si un poster est disponible
         if (data.Poster && data.Poster !== 'N/A') {
         const img = document.createElement('img');
         img.className = 'card-img-top';
         img.src = data.Poster;
         img.alt = `Affiche du film : ${data.Title}`;
         card.appendChild(img);
         }
 }