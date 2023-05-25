// AFFICHAGE DES WORKS DANS LA GALLERY
// AFFICHAGE DES WORKS DANS LA GALLERY
// AFFICHAGE DES WORKS DANS LA GALLERY

// J'effectue une requête fetch vers l'API correspondant aux works
fetch('http://localhost:5678/api/works')

  // La réponse est convertie en JSON - Revoir cours
  .then(response => response.json())

  // Une fois les données disponibles, on fait appelle à une fonction
  .then(data => {
    // Je sélectionne l'élément de galerie HTML existant sur la page par sa class
    const gallery = document.querySelector('.gallery')

    // Vérifier si la galerie existe avant de commencer à y ajouter des éléments
    if (gallery) {

      // Pour chaque Work récupéré depuis l'API backend, créez un élément de travail HTML
      data.forEach(work => {

        // Créez un élément <div> pour chaque Work
        const workElement = document.createElement('div')
        workElement.classList.add('work')

        // Créez un élément <img> pour l'image du Work
        const imageElement = document.createElement('img')
        imageElement.src = work.imageUrl

        // Créez un élément <p> pour le texte/titre du Work
        const titleElement = document.createElement('p')
        titleElement.textContent = work.title

        // Ajout des éléments créés dans la <div> pour chaque Work
        workElement.appendChild(imageElement)
        workElement.appendChild(titleElement)

        // Ajout de la <div> pour le Work dans la galerie
        gallery.appendChild(workElement)
      })
    }
  })

  // Si une erreur survient à n'importe quel moment de la requête, la fonction Erreur est appelée
  .catch(error => console.error(error))



















// FILTRE DES WORKS PAR CATEGORIE
// FILTRE DES WORKS PAR CATEGORIE
// FILTRE DES WORKS PAR CATEGORIE

// Récupération de la liste des catégories depuis l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json()) // Conversion de la réponse en format JSON
  .then(categories => {
    // Sélection de la div avec la classe "filter"
    const filter = document.querySelector('.filter');

    // Création d'un bouton "Tous" et ajout à la div avec la classe "filter"
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous'; // Définition du texte du bouton comme "Tous"
    allButton.classList.add('active'); // Ajout de la classe "active" au bouton
    filter.appendChild(allButton); // Ajout du bouton à la div

    // Ajout d'un écouteur d'événements pour filtrer les Works par catégorie
    allButton.addEventListener('click', (event) => {
      event.preventDefault();
      // Suppression de la classe "active" de tous les boutons
      const buttons = document.querySelectorAll('.filter button');
      buttons.forEach(button => button.classList.remove('active'));

      // Ajout de la classe "active" au bouton "Tous"
      allButton.classList.add('active');

      // Affiche toutes les Works
      filterWorksByCategory(0);
    });


    // Création d'un bouton pour chaque catégorie et ajout à la div class = "filter"
    categories.forEach(category => {
      const categoryButton = document.createElement('button');
      categoryButton.textContent = category.name;
      filter.appendChild(categoryButton);

      // Ajout écouteur d'événements pour filtrer les Works par catégorie
      categoryButton.addEventListener('click', () => {
        // Suppression de la classe "active" de tous les boutons
        const buttons = document.querySelectorAll('.filter button');
        buttons.forEach(button => button.classList.remove('active'));

        // Ajoute la classe "active" au bouton sélectionné
        categoryButton.classList.add('active');

        // Filtre les Works par catégorie
        filterWorksByCategory(category.id);
      });
    });
  })
  .catch(error => console.error(error));

function filterWorksByCategory(categoryId) {
  // Récupère la liste des Works depuis l'API
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
      // Si categoryId est égal à 0, affichage de tout les Works
      if (categoryId === 0) {
        displayWorks(works);
      } else {
        // Filtre les Works par catégorie
        const filteredWorks = works.filter(work => work.categoryId === categoryId);
        // Affiche les Works filtrés
        displayWorks(filteredWorks);
      }
    })
    .catch(error => console.error(error));
}



function displayWorks(works) {
  const gallery = document.querySelector('.gallery');
  // Efface les Works actuels de la galerie
  gallery.innerHTML = '';
  // Parcours les Works filtrés et les ajoute à la galerie
  works.forEach(work => {
    const workElement = document.createElement('div');
    workElement.classList.add('work');
    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    const titleElement = document.createElement('p');
    titleElement.textContent = work.title;
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
    gallery.appendChild(workElement);
  });
}
















// LOGIN / LOGOUT 
// LOGIN / LOGOUT 
// LOGIN / LOGOUT

const token = localStorage.getItem('token');
const loginLink = document.querySelector('.login-button');
const logoutLink = document.querySelector('.logout-button');
const editionModeDiv = document.querySelector('.edition-mode.active');
const filterbis = document.querySelector('.filter');
const buttonmodale = document.querySelectorAll('.modify');

if (token) {
  loginLink.textContent = 'logout';
  editionModeDiv.classList.remove('hidden');
  filterbis.classList.add('disabled');
  buttonmodale.forEach(button => button.classList.remove('disabled'));
} else {
  loginLink.textContent = 'login';
  editionModeDiv.classList.add('hidden');
  filterbis.classList.remove('disabled');
  buttonmodale.forEach(button => button.classList.add('disabled'));
}

logoutLink.addEventListener('click', () => {
  if (token) {
    localStorage.removeItem('token');
    loginLink.textContent = 'login';
    editionModeDiv.classList.add('hidden');
    filterbis.classList.remove('disabled');
    buttonmodale.forEach(button => button.classList.add('disabled'));
  }
});



















// OUVERTURE ET FERMETURE DE LA MODALE
// OUVERTURE ET FERMETURE DE LA MODALE
// OUVERTURE ET FERMETURE DE LA MODALE

// Récupération Bouton et Modale
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function () {
  // Code à exécuter lorsque le bouton est cliqué
  const modal = document.getElementById('myModal');
  modal.style.display = 'block'; // Affiche la modale
});

document.addEventListener('DOMContentLoaded', function () {
  // Quand l'utilisateur clique sur <span> (x), cela ferme la modale 1
  const closeButton1 = document.querySelector('#myModal .close');
  const modal1 = document.getElementById('myModal');

  closeButton1.addEventListener('click', function () {
    modal1.style.display = "none";
  });

  // Quand l'utilisateur clique sur <span> (x), cela ferme la modale 2
  const closeButton2 = document.querySelector('#myModal2 .close');
  const modal2 = document.getElementById('myModal2');

  closeButton2.addEventListener('click', function () {
    modal2.style.display = "none";
  });

  // Quand l'utilisateur clique en dehors des modales, cela les ferme
  window.addEventListener('click', function (event) {
    if (event.target == modal1) {
      modal1.style.display = "none";
    }
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
  });
});

















// AFFICHAGE DES WORKS DANS LA MODALE
// AFFICHAGE DES WORKS DANS LA MODALE
// AFFICHAGE DES WORKS DANS LA MODALE

const modalPhotos = document.querySelector(".modal-photos");


fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Vide la galerie avant d'ajouter les nouvelles images
    modalPhotos.innerHTML = "";

    data.forEach((work, index) => {
      const container = document.createElement("div");
      container.classList.add("photo-container");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      container.appendChild(img);

      const editSpan = document.createElement("button");
      editSpan.textContent = "éditer";
      editSpan.classList.add("edit-button");
      container.appendChild(editSpan);

      // Ouvrir la deuxième modale en cliquant sur un bouton "Editer"
      editSpan.onclick = function () {
        modal.style.display = "none";
        modal2.style.display = "block";
      }

      if (index === 0) {
        const iconButton1 = document.createElement("button");
        iconButton1.classList.add("icon-edit");
        iconButton1.dataset.id = work.id;
        container.appendChild(iconButton1);

        const iconButton2 = document.createElement("button"); // Remplacez div par button
        iconButton2.classList.add("second-icon"); // Ajouter une classe pour la deuxième icône
        container.appendChild(iconButton2);
      } else {
        const iconButton1 = document.createElement("button");
        iconButton1.classList.add("icon-edit");
        iconButton1.dataset.id = work.id;
        container.appendChild(iconButton1);
      }

      modalPhotos.appendChild(container);
    });

    // Récupérer tous les boutons avec la classe "icon-edit"
    const editButtons = document.querySelectorAll('.icon-edit');

    // Parcourir tous les boutons avec la classe "icon-edit" et ajouter l'événement de clic
    editButtons.forEach(editButton => {
      editButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Récupérer l'ID du projet (image) à supprimer
        const id = editButton.dataset.id;

        // Envoyer la requête DELETE à l'API pour supprimer le projet (image)
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Utiliser le token d'accès de l'utilisateur connecté
            'Accept': '*/*'
          }
        })
          .then(response => {
            if (response.ok) {
              console.log('Projet supprimé avec succès');
               event.preventDefault();
              alert('Projet supprimé avec succès');

              // Effectuer d'autres opérations après la suppression du projet (image)
              // Par exemple, mettre à jour la liste des projets affichés sur la page

            } else {
              console.error('Erreur lors de la suppression du projet');
            }
          })
          .catch(error => {
            console.error('Erreur de requête:', error);
          });
      });
    });
  });
























// OUVERTURE MODALE 2 ET RETOUR MODALE 1
// OUVERTURE MODALE 2 ET RETOUR MODALE 1
// OUVERTURE MODALE 2 ET RETOUR MODALE 1

// Récupérer la modale et le bouton "Ajouter une photo"
const modal = document.getElementById("myModal");
const btn = document.querySelector(".modal-add-button");

// Récupérer la deuxième modale et le bouton "Retour"
const modal2 = document.getElementById("myModal2");
const btnBack = document.querySelector(".before");

// Ouvrir la deuxième modale en cliquant sur le bouton "Ajouter une photo"
btn.onclick = function () {
  modal.style.display = "none";
  modal2.style.display = "block";
}

// Fermer la deuxième modale en cliquant sur le bouton "Retour"
btnBack.onclick = function () {
  modal2.style.display = "none";
  modal.style.display = "block";
}


















// AJOUT DE LA PHOTO SELECTIONNEE DANS LA DIV
// AJOUT DE LA PHOTO SELECTIONNEE DANS LA DIV
// AJOUT DE LA PHOTO SELECTIONNEE DANS LA DIV

const addPhotoButton = document.getElementById('addPhotoButton');
const imagePreview = document.getElementById('imagePreview');
let selectedFile; // Déclarer la variable selectedFile en dehors de la portée de la fonction

addPhotoButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0]; // Assigner la valeur à la variable selectedFile
    console.log('Fichier sélectionné :', selectedFile);
    // Vous pouvez effectuer des opérations supplémentaires avec le fichier sélectionné ici

    // Créer un objet FileReader pour lire l'image sélectionnée
    const reader = new FileReader();
    reader.onload = (e) => {
      // Créer un élément <img> avec l'image sélectionnée
      const imageElement = document.createElement('img');
      imageElement.src = e.target.result;
      imageElement.style.maxHeight = '100%'; // Conserver la hauteur maximale de la div
      imageElement.style.display = 'block'; // Afficher l'image en tant que bloc
      imageElement.style.margin = '0 auto'; // Centrer l'image

      // Supprimer les éléments à l'intérieur de la div modal-add-box
      const modalAddBox = document.querySelector('.modal-add-box');
      while (modalAddBox.firstChild) {
        modalAddBox.firstChild.remove();
      }

      // Ajouter l'image sélectionnée à la div modal-add-box
      modalAddBox.appendChild(imageElement);
    };

    // Lire le contenu de l'image sélectionnée en tant que Data URL
    reader.readAsDataURL(selectedFile);
  });
  fileInput.click();
});




















// RECUPERATION DES CATEGORIES POUR MENU DEROULANT
// RECUPERATION DES CATEGORIES POUR MENU DEROULANT
// RECUPERATION DES CATEGORIES POUR MENU DEROULANT

window.addEventListener('DOMContentLoaded', (event) => {
  // Récupérer le menu déroulant des catégories
  const categorySelect = document.querySelector('.modal-category-select');

  // Faire une requête pour récupérer les catégories de l'API
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      // Pour chaque catégorie, créer une option et l'ajouter au menu déroulant
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erreur de requête:', error);
    });
});
























// ENVOI FICHIER ET VERIFICATION CHAMPS REQUIS
// ENVOI FICHIER ET VERIFICATION CHAMPS REQUIS
// ENVOI FICHIER ET VERIFICATION CHAMPS REQUIS

// Récupérer le bouton "Valider"
// Récupérer le formulaire "add-photo-form"
const form = document.getElementById('add-photo-form');

// Récupérer les éléments du DOM
const titleInput = document.querySelector('.modal-title-input');
const categorySelect = document.querySelector('.modal-category-select');
const fileInput = document.getElementById('file-input');


// Gérer l'événement de soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Récupérer les valeurs des champs
  const title = titleInput.value;
  const category = categorySelect.value;
  const selectedFile = fileInput.files[0];

  // Vérifier si tous les champs sont remplis
  if (!title || !category || !selectedFile) {
    console.error('Veuillez remplir tous les champs et sélectionner un fichier');
    return false;
  }

  // Créer l'objet FormData pour envoyer les données
  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('title', title);
  formData.append('category', category);

  // Envoyer la requête POST avec les données du formulaire
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`, // Utiliser le token d'accès de l'utilisateur connecté
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Réponse de l\'API :', data);

      // Vérifier si le fichier est correctement téléchargé
      if (data.imageURL) {
        console.log('Fichier téléchargé :', data.imageURL);

        // Mettre à jour l'attribut src de l'image avec l'URL de l'image téléchargée
        const previewImage = document.createElement('img');
        previewImage.src = data.imageURL;
        previewImage.style.maxHeight = '300px';

        // Remplacer l'aperçu de l'image dans la div imagePreview
        imagePreview.innerHTML = ''; // Supprimer le contenu précédent de la div
        imagePreview.appendChild(previewImage);

        // Effectuer la requête GET pour récupérer la galerie complète
        fetch('http://localhost:5678/api/works')
          .then(response => response.json())
          .then(data => {
            // Mettre à jour la galerie avec le nouveau projet
            const gallery = document.querySelector('.gallery');

            // Créer un élément <div> pour le nouveau projet
            const workElement = document.createElement('div');
            workElement.classList.add('work');

            // Créer un élément <img> pour l'image du nouveau projet
            const imageElement = document.createElement('img');
            imageElement.src = data[data.length - 1].imageUrl; // Utiliser l'URL de la dernière image ajoutée

            // Créer un élément <p> pour le titre du nouveau projet
            const titleElement = document.createElement('p');
            titleElement.textContent = data[data.length - 1].title; // Utiliser le titre de la dernière image ajoutée

            // Ajouter les éléments créés dans la <div> pour le nouveau projet
            workElement.appendChild(imageElement);
            workElement.appendChild(titleElement);

            // Ajouter la <div> pour le nouveau projet à la galerie
            gallery.appendChild(workElement);
            alert('Image ajoutée');
            // Ajouter la <div> pour le nouveau projet à la galerie
            gallery.appendChild(workElement);
            alert('Image ajoutée');

            // Effectuer d'autres opérations supplémentaires après l'envoi du projet
          })
          .catch(error => {
            console.error('Erreur de requête:', error);
          });
      } else {
        console.log('Erreur lors du téléchargement du fichier.');
      }
    })
    .catch(error => {
      console.error('Erreur de requête:', error);
    });

  return false;
});
