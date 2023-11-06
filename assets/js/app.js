
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
  function showBootstrapAlert(message) {
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
  
  function showBootstrapErrorAlert(message) {
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
  tableBody.innerHTML = ''; // Clear the table
  films.forEach(film => {
    const row = `<tr>
      <td>${film.title}</td>
      <td>${film.years}</td>
      <td>${film.authors}</td>
      <td><img src="${film.img}" class="img-fluid" alt="Image de ${film.title}"></td>
      <td><button onclick="deleteFilm('${film.title}')" class="btn btn-danger">Supprimer</button></td>
  
    </tr>`;
    tableBody.innerHTML += row;
  });
  }
  function toggleAddFilmForm() {
  //basculer le formulaire d'ajout de film
  const form = document.getElementById('addFilmForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
  function saveFilm() {
  const title = document.getElementById('Title').value;
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
    showBootstrapAlert("Film ajouté avec succès"); // Afficher le message de succès
  } else {
    const errorMessage = "Erreur dans le formulaire: " + errors.join(", ");
    showBootstrapErrorAlert(errorMessage); // Afficher le message d'erreur
  }
  }
  // function fillFormWithData(Title) {
  // // Fonction pour remplir le formulaire avec les données d'un film

  // const film = films.find(f => f.title === Title);
  // if (film) {
  //   // Remplir le formulaire avec les données du film
  //   document.getElementById('Title').value = film.title;
  //   document.getElementById('filmYear').value = film.years;
  //   document.getElementById('filmAuthor').value = film.authors;
  //   // Afficher le formulaire si ce n'est pas déjà fait
  //   document.getElementById('addFilmForm').style.display = 'block';
  // }
  // }
    

  
  function initVideotheque() {
  displayFilms();
  document.getElementById('addFilmBtn').addEventListener('click', toggleAddFilmForm);
  }
  

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
  
  function deleteFilm(Title) {
  if (confirm('Confirmez- la suppression de ce film ?')) {
    const filmIndex = films.findIndex(f => f.title === Title);
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
  
  
  
  