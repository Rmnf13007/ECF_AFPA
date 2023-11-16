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
  



function Alert(message) {
    
  const alertPlaceholder = document.getElementById('alertPlaceholder');
  const alert = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
  alertPlaceholder.innerHTML = alert;
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
      img: '' 
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

const film = films.find(f => f.title === filmTitle);
if (film) {
  
  document.getElementById('filmTitle').value = film.title;
  document.getElementById('filmYear').value = film.years;
  document.getElementById('filmAuthor').value = film.authors;
 
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



// Écouteur d'événements pour le menu déroulant de tri
document.getElementById('sortSelect').addEventListener('change', (event) => {

sortAndDisplayFilms(event.target.value);
});

document.getElementById('showDataBtn').addEventListener('click', afficherstorage);

// Écouteur d'événements pour le menu déroulant de tri
document.getElementById('sortSelect').addEventListener('change', (event) => {

sortAndDisplayFilms(event.target.value);
});




