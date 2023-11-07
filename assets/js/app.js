const films = [
  {
      title: "Deadpool",
      years: 2016,
      authors: "Tim Miller",
      poster:"https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" 
    
  },
  {
      title: "Spiderman",
      years: 2002,
      authors: "Sam Raimi"
      ,
      poster:"https://fr.web.img3.acsta.net/c_310_420/medias/nmedia/00/00/00/33/spiderman.jpg" 
  },
  {
      title: "Scream",
      years: 1996,
      authors: "Wes Craven"
      ,
      poster:"https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SX300.jpg" 
  },
  {
      title: "A: chapter 1",
      years: 2019,
      authors: "Andy Muschietti"
      ,
      poster:"https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjEwOS00NzI5LTlkNDAtZmEwZDFmYmM2MjU2XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg" 
  }
];
  

// Fonctions d'alerte
function Alert(message) {
    
  const alertPlaceholder = document.getElementById('alertPlaceholder');
  const alert = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

  alertPlaceholder.innerHTML = alert;

  setTimeout(() => {
    alertPlaceholder.innerHTML = '';
  }, 3000); // Message will disappear after 3 seconds

}

function ErrorAlert(message) {
const alertPlaceholder = document.getElementById('alertPlaceholder');
const alert = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

alertPlaceholder.innerHTML = alert;

setTimeout(() => {
  alertPlaceholder.innerHTML = '';
}, 5000); // Message will disappear after 5 seconds
}

function maj(string) {
// première lettre en majuscule
return string.charAt(0).toUpperCase() + string.slice(1);
}



function displayFilms() {
  // Fonction pour afficher les films
  const tableBody = document.getElementById('filmsTableBody');

  // Nettoyer le contenu de la table sans effacer le contenu de la table elle-même
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  films.forEach(film => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.years}</td>
      <td>${film.authors}</td>
      <td><img src="${film.img}" class="img-fluid" alt="Image de ${film.title}"></td>
      <td><button data-title="${film.title}" class="btn btn-danger">Supprimer</button></td>
    `;

    // Ajouter un gestionnaire d'événements au bouton de suppression
    const deleteButton = row.querySelector('button');
    deleteButton.addEventListener('click', function() {
      const titleToDelete = this.getAttribute('data-title');
      deleteFilm(titleToDelete);
    });

    tableBody.appendChild(row);
  });
}

function toggleAddFilmForm() {
//basculer le formulaire d'ajout de film
const form = document.getElementById('addFilmForm');
form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
function saveFilm() {
const title = document.getElementById('filmTitle').value;
const year = parseInt(document.getElementById('filmYear').value, 10);
const author = document.getElementById('filmAuthor').value;
const errors = [];

if (title.length < 2) errors.push("Le titre doit avoir au moins 2 caractères");
if (year < 1900 || year > new Date().getFullYear() || !/^\d{4}$/.test(year)) errors.push("L'année doit être un nombre à 4 chiffres compris entre 1900 et l'année en cours");
if (author.length < 5) errors.push("L'auteur doit avoir au moins 5 caractères");

if (errors.length === 0) {
  // Ajouter le nouveau film au tableau avec la première lettre en majuscule
  const newFilm = {
    title: maj(title),
    years: year,
    authors: maj(author),
    img: '' //ajouter la logique pour gérer les images
  };
      // Générer un identifiant unique pour le film
      const filmId = 'film_' + Date.now();

  films.push(newFilm);
  
  // Sauvegarder dans le localStorage
  localStorage.setItem('films', JSON.stringify(films));
  
  // Sauvegarder le film dans le localStorage avec cet identifiant
  localStorage.setItem(filmId, JSON.stringify(newFilm));
  displayFilms(); // Mettre à jour l'affichage
  toggleAddFilmForm(); // Cacher le formulaire
  Alert("Film ajouté avec succès"); // Afficher le message de succès
} else {
  const errorMessage = "Erreur dans le formulaire: " + errors.join(", ");
  ErrorAlert(errorMessage); // Afficher le message d'erreur
}
}
function fillFormWithData(filmTitle) {
// Fonction pour remplir le formulaire avec les données d'un film
// Trouver le film par titre
const film = films.find(f => f.title === filmTitle);
if (film) {
  // Remplir le formulaire avec les données du film
  document.getElementById('filmTitle').value = film.title;
  document.getElementById('filmYear').value = film.years;
  document.getElementById('filmAuthor').value = film.authors;
  // Afficher le formulaire si ce n'est pas déjà fait
  document.getElementById('addFilmForm').style.display = 'block';
}
}
  
// // function init videotheque
// displayFilms();
// document.getElementById('addFilmBtn').addEventListener('click', toggleAddFilmForm);

function initVideotheque() {
displayFilms();
document.getElementById('addFilmBtn').addEventListener('click', toggleAddFilmForm);
}

// Appeler la fonction initVideotheque lors du chargement de la page
initVideotheque();  

function sortAndDisplayFilms(sortBy) {

  if (sortBy === 'title') {
    films.sort((a, b) => a.title.localeCompare(b.title));
  } 

  else if (sortBy === 'year') {
    films.sort((a, b) => b.years - a.years);
  }

displayFilms();

}

function deleteFilm(filmTitle) {
if (confirm('Confirmez-vous la suppression de ce film ?')) {
  const filmIndex = films.findIndex(f => f.title === filmTitle);
  if (filmIndex > -1) {
    films.splice(filmIndex, 1);
    displayFilms();
  }
}
}

// function displayFilms() {
//     const tableBody = document.getElementById('filmsTableBody');
//     tableBody.innerHTML = '';
//     films.forEach(film => {
//       const row = `<tr>
//         <td>${film.title}</td>
//         <td>${film.years}</td>
//         <td>${film.authors}</td>
//         <td><img src="${film.img}" class="img-fluid" alt="Image de ${film.title}"></td>
//         <td><button onclick="deleteFilm('${film.title}')" class="btn btn-danger">Supprimer</button></td>
//       </tr>`;
//       tableBody.innerHTML += row;
//     });
// }



// Écouteur d'événements pour le menu déroulant de tri
document.getElementById('sortSelect').addEventListener('change', (event) => {

sortAndDisplayFilms(event.target.value);
});

document.getElementById('showDataBtn').addEventListener('click', afficherstorage);

// Écouteur d'événements pour le menu déroulant de tri
document.getElementById('sortSelect').addEventListener('change', (event) => {

sortAndDisplayFilms(event.target.value);
});






//////////////page recherche de film



// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const title = document.getElementById('title').value;
//     const apiKey = 'b24be3c2'; // Remplacez par votre clé API réelle

//     fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.Response === "True") {
//                 displayResults(data); // Affichez les résultats en utilisant la fonction ci-dessus
//             } else {
//                 console.error('Film introuvable:', data.Error);
//             }
//         })
//         .catch(error => {
//             console.error('Erreur lors de la requête à l\'API OMDb:', error);
//         });
// });


// function displayResults(data) {
//     // Sélectionnez l'élément du DOM où vous souhaitez afficher les résultats
//     const resultsContainer = document.getElementById('resultsContainer');
   

//     // Créez la carte Bootstrap
//     const card = document.createElement('div');
//     card.className = 'card';


//     // Créez le corps de la carte
//     const cardBody = document.createElement('div');
//     cardBody.className = 'card-body';

//     // Titre du film
//     const titleElement = document.createElement('h5');
//     titleElement.className = 'card-title';
//     titleElement.textContent = data.Title;
//     cardBody.appendChild(titleElement);

//     // Année de sortie
//     const yearElement = document.createElement('p');
//     yearElement.className = 'card-text';
//     yearElement.textContent = `Année de sortie : ${data.Year}`;
//     cardBody.appendChild(yearElement);

//     // Réalisateur
//     const directorElement = document.createElement('p');
//     directorElement.className = 'card-text';
//     directorElement.textContent = `Réalisateur : ${data.Director}`;
//     cardBody.appendChild(directorElement);

//     // Acteurs
//     const actorsElement = document.createElement('p');
//     actorsElement.className = 'card-text';
//     actorsElement.textContent = `Acteurs : ${data.Actors}`;
//     cardBody.appendChild(actorsElement);

//     // Synopsis
//     const plotElement = document.createElement('p');
//     plotElement.className = 'card-text';
//     plotElement.textContent = `Synopsis : ${data.Plot}`;
//     cardBody.appendChild(plotElement);

//     // Ajoutez le corps de la carte à la carte
//     card.appendChild(cardBody);

//     // Ajoutez la carte complète au conteneur de résultats
//     resultsContainer.appendChild(card);
//         // Créez l'image de la carte si un poster est disponible
//         if (data.Poster && data.Poster !== 'N/A') {
//         const img = document.createElement('img');
//         img.className = 'card-img-top';
//         img.src = data.Poster;
//         img.alt = `Affiche du film : ${data.Title}`;
//         card.appendChild(img);
//     }

// }

// function displayResultsBottom(data) {
//     // Sélectionnez l'élément du DOM où vous souhaitez afficher les résultats
//     const resultsContainer = document.getElementById('resultsContainer');
//     resultsContainer.innerHTML = ''; // Effacer les résultats précédents

//     // Créez la carte Bootstrap
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.style.position = 'relative'; // Ajoutez le positionnement relatif à la carte

//     // Créez le corps de la carte
//     const cardBody = document.createElement('div');
//     cardBody.className = 'card-body';
//     cardBody.style.paddingBottom = '180px'; // Ajustez en fonction de la hauteur de votre image

//     // Ajoutez ici le contenu du corps de la carte (titre, année, réalisateur, etc.)

//     // Ajoutez le corps de la carte à la carte
//     card.appendChild(cardBody);

//     // Créez l'image de la carte si un poster est disponible
//     if (data.Poster && data.Poster !== 'N/A') {
//         const img = document.createElement('img');
//         img.className = 'card-img-bottom';
//         img.src = data.Poster;
//         img.alt = `Affiche du film : ${data.Title}`;
//         img.style.position = 'absolute';
//         img.style.bottom = '0';
//         img.style.left = '0';
//         img.style.width = '100%';
//         img.style.height = '180px'; // Hauteur de votre image
//         img.style.objectFit = 'cover';
//         card.appendChild(img); // Ajoutez l'image après le cardBody
//     }

//     // Ajoutez la carte complète au conteneur de résultats
//     resultsContainer.appendChild(card);
// }