// AFFICHAGE DES WORKS DANS LA GALLERY
// AFFICHAGE DES WORKS DANS LA GALLERY
// AFFICHAGE DES WORKS DANS LA GALLERY

// J'effectue une requête fetch vers l'API correspondant aux works
fetch('http://localhost:5678/api/works')

  // La réponse est convertie en données JSON
  .then(response => response.json())

  // Une fois les données disponibles, on fait appelle à une fonction
  .then(data => {
    // Je sélectionne l'élément de galerie HTML existant sur la page par sa class
    const gallery = document.querySelector('.gallery')

    // Vérifier si la galerie existe avant de commencer à y ajouter des éléments
    if (gallery) {

      // Pour chaque Work récupéré depuis l'API backend, créez un élément de travail HTML
      data.forEach(work => {

        // Création d'un élément <div> pour chaque Work
        const workElement = document.createElement('div')
        workElement.classList.add('work')
        workElement.setAttribute("data-id", work.id)

        // Création d'un élément <img> pour l'image du Work
        const imageElement = document.createElement('img')
        imageElement.src = work.imageUrl

        // Création d'un élément <p> pour le texte/titre du Work
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
    // Sélection de la div avec la class "filter"
    const filter = document.querySelector('.filter');

    // Création d'un bouton "Tous" et ajout à la div avec la class "filter"
    const allButton = document.createElement('button');
    // Définition du texte du bouton "Tous"
    allButton.textContent = 'Tous'; 
    // Ajout de la class "active" au bouton
    allButton.classList.add('active'); 
    // Ajout du bouton à la div
    filter.appendChild(allButton); 

    // Evénements au clic pour filtrer les Works par catégorie
    allButton.addEventListener('click', (event) => {
      event.preventDefault();
      // Suppression de la class "active" de tous les boutons
      const buttons = document.querySelectorAll('.filter button');
      buttons.forEach(button => button.classList.remove('active'));

      // Ajout de la class "active" au bouton "Tous"
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
        // Suppression de la class "active" de tous les boutons
        const buttons = document.querySelectorAll('.filter button');
        buttons.forEach(button => button.classList.remove('active'));

        // Ajoute la class "active" au bouton sélectionné
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




// Fonction pour afficher les Works filtrés
function displayWorks(works) {
  const gallery = document.querySelector('.gallery');
  // Sélectionne l'élément avec la class 'gallery' dans le document HTML
  
  gallery.innerHTML = '';
  // Efface le contenu de l'élément 'gallery' pour ne pas avoir deux fois chaque Work
  
  works.forEach(work => {
    // Parcours chaque élément du tableau 'works' (les Works filtrés)
    
    const workElement = document.createElement('div');
    // Crée un nouvel élément 'div' pour représenter chaque Work
    workElement.classList.add('work');
    // Ajoute la class 'work' à l'élément 'div'
    
    const imageElement = document.createElement('img');
    // Crée un nouvel élément 'img' pour afficher l'image du Work
    imageElement.src = work.imageUrl;
    // Définit l'attribut 'src' de l'élément 'img' avec l'URL de l'image du Work (voir API)
    
    const titleElement = document.createElement('p');
    // Crée un nouvel élément 'p' pour afficher le titre du Work
    titleElement.textContent = work.title;
    // Définit le contenu du texte de l'élément 'p' avec le titre du Work (voir API)
    
    workElement.appendChild(imageElement);
    // Ajoute l'élément 'img' en tant qu'enfant de l'élément 'div' représentant le Work
    workElement.appendChild(titleElement);
    // Ajoute l'élément 'p' en tant qu'enfant de l'élément 'div' représentant le Work
    
    gallery.appendChild(workElement);
    // Ajoute l'élément 'div' représentant le Work en tant qu'enfant de l'élément 'gallery'
  });
}
















// LOGIN / LOGOUT 
// LOGIN / LOGOUT 
// LOGIN / LOGOUT

// Récupèration du token
const token = localStorage.getItem('token');

// Sélection de l'élément avec la class 'login-button'
const loginLink = document.querySelector('.login-button');

// Sélection de l'élément avec la class 'logout-button'
const logoutLink = document.querySelector('.logout-button');

// Sélection de l'élément avec la class 'edition-mode' qui a la class 'active'
const editionModeDiv = document.querySelector('.edition-mode.active');

// Sélection de l'élément avec la class 'filter'
const filterbis = document.querySelector('.filter');

// Sélection de tous les éléments avec la class 'modify'
const buttonmodale = document.querySelectorAll('.modify');

// Vérifier si l'utilisateur possède un token présent
if (token) {
  // Si un token est présent, mise à jour du texte du lien de connexion avec 'logout'
  loginLink.textContent = 'logout';

  // Suppression de la class 'hidden' de l'élément 'editionModeDiv'
  editionModeDiv.classList.remove('hidden');

  // Ajoute la class 'disabled' à l'élément 'filterbis'
  filterbis.classList.add('disabled');

  // Supprime la class 'disabled' de tous les éléments 'buttonmodale'
  buttonmodale.forEach(button => button.classList.remove('disabled'));
} else {
  // Si aucun token n'est présent, met à jour le texte du lien de connexion avec 'login'
  loginLink.textContent = 'login';

  // Ajoute la class 'hidden' à l'élément 'editionModeDiv'
  editionModeDiv.classList.add('hidden');

  // Supprime la class 'disabled' de l'élément 'filterbis'
  filterbis.classList.remove('disabled');

  // Ajoute la class 'disabled' à tous les éléments 'buttonmodale'
  buttonmodale.forEach(button => button.classList.add('disabled'));
}

// Ajoute un écouteur d'événements 'click' au lien de déconnexion
logoutLink.addEventListener('click', () => {
  // Vérifie si un token est présent
  if (token) {
    // Supprime le token du stockage local
    localStorage.removeItem('token');

    // Met à jour le texte du lien de connexion avec 'login'
    loginLink.textContent = 'login';

    // Ajoute la class 'hidden' à l'élément 'editionModeDiv'
    editionModeDiv.classList.add('hidden');

    // Supprime la class 'disabled' de l'élément 'filterbis'
    filterbis.classList.remove('disabled');

    // Ajoute la class 'disabled' à tous les éléments 'buttonmodale'
    buttonmodale.forEach(button => button.classList.add('disabled'));
  }
});

















// OUVERTURE ET FERMETURE DE LA MODALE
// OUVERTURE ET FERMETURE DE LA MODALE
// OUVERTURE ET FERMETURE DE LA MODALE

// Récupération Bouton et Modale

// Récupération du bouton pour ouvrir la Modale1
const myButton = document.getElementById('myButton');

 // Evénement au clic sur le boutton Modifier
myButton.addEventListener('click', function () {

  // Récupération de la Modale1
  const modal = document.getElementById('myModal');
  // Affiche la modale avec display block
  modal.style.display = 'block'; 
});

document.addEventListener('DOMContentLoaded', function () {
  // Quand l'utilisateur clique sur <span> (x), cela ferme la Modale 1
  const closeButton1 = document.querySelector('#myModal .close');
  const modal1 = document.getElementById('myModal');

  closeButton1.addEventListener('click', function () {
    modal1.style.display = "none";
  });

  // Quand l'utilisateur clique sur <span> (x), cela ferme la Modale 2
  const closeButton2 = document.querySelector('#myModal2 .close');
  const modal2 = document.getElementById('myModal2');

  closeButton2.addEventListener('click', function () {
    modal2.style.display = "none";
  });

  // Quand l'utilisateur clique en dehors des modales, cela ferme la modale ouverte (les deux)
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


function buildProjectModal() {
  fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Vider la galerie avant d'ajouter les nouvelles images
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

      // Ouvrir la Modale 2 en cliquant sur un bouton "Editer" 
      // Partie du code à développer par la suite pour modifier le Titre, la Catégorie et Image d'un Work
      editSpan.onclick = function () {
        modal.style.display = "none";
        modal2.style.display = "block";
      }

      if (index === 0) {
        const iconButton1 = document.createElement("button");
        iconButton1.classList.add("icon-edit");
        iconButton1.dataset.id = work.id;
        container.appendChild(iconButton1);

        const iconButton2 = document.createElement("button"); 
        iconButton2.classList.add("second-icon"); 
        container.appendChild(iconButton2);
      } else {
        const iconButton1 = document.createElement("button");
        iconButton1.classList.add("icon-edit");
        iconButton1.dataset.id = work.id;
        container.appendChild(iconButton1);
      }

      modalPhotos.appendChild(container);
    });

    // Récupérer tous les boutons avec la class "icon-edit"
    const editButtons = document.querySelectorAll('.icon-edit');

    // Parcourir tous les boutons avec la class "icon-edit" et ajouter l'événement de clic
    editButtons.forEach(editButton => {
      editButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Récupérer l'ID du work (image) à supprimer
        const id = editButton.dataset.id;

        // Envoyer la requête DELETE à l'API pour supprimer le work (image)
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers: {
            // Utiliser le token d'accès de l'utilisateur connecté
            'Authorization': `Bearer ${token}`, 
            'Accept': '*/*'
          }
        })
          .then(response => {
            if (response.ok) {
              console.log('Projet supprimé avec succès');
              

              // Revoir cette partie du code, l'erreur de réfraichissement doit être ici

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

}

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Vider la galerie avant d'ajouter les nouvelles images
    modalPhotos.innerHTML = "";

    data.forEach((work, index) => {
      const container = document.createElement("div");
      container.classList.add("photo-container");
      container.setAttribute("data-id", work.id);

      const img = document.createElement("img");
      img.src = work.imageUrl;
      container.appendChild(img);

      const editSpan = document.createElement("button");
      editSpan.textContent = "éditer";
      editSpan.classList.add("edit-button");
      container.appendChild(editSpan);

      // Ouvrir la Modale 2 en cliquant sur un bouton "Editer" 
      // Partie du code à développer par la suite pour modifier le Titre, la Catégorie et Image d'un Work
      editSpan.onclick = function () {
        modal.style.display = "none";
        modal2.style.display = "block";
      }

      if (index === 0) {
        const iconButton1 = document.createElement("button");
        iconButton1.classList.add("icon-edit");
        iconButton1.dataset.id = work.id;
        container.appendChild(iconButton1);

        const iconButton2 = document.createElement("button"); 
        iconButton2.classList.add("second-icon"); 
        container.appendChild(iconButton2);
      } else {
        const iconButton1 = document.createElement("button");
        iconButton1.classList.add("icon-edit");
        iconButton1.dataset.id = work.id;
        container.appendChild(iconButton1);
      }

      modalPhotos.appendChild(container);
    });

    // Récupérer tous les boutons avec la class "icon-edit"
    const editButtons = document.querySelectorAll('.icon-edit');

    // Parcourir tous les boutons avec la class "icon-edit" et ajouter l'événement de clic
    editButtons.forEach(editButton => {
      editButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Récupérer l'ID du work (image) à supprimer
        const id = editButton.dataset.id;

        // Envoyer la requête DELETE à l'API pour supprimer le work (image)
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers: {
            // Utiliser le token d'accès de l'utilisateur connecté
            'Authorization': `Bearer ${token}`, 
            'Accept': '*/*'
          }
        })
          .then(response => {
            if (response.ok) {
              console.log('Projet supprimé avec succès');
              document.querySelectorAll(`[data-id="${id}"]`).forEach(element => element.remove());

              // Revoir cette partie du code, l'erreur de réfraichissement doit être ici

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

// Récupération de la Modale 1 et du bouton "Ajouter une photo"
const modal = document.getElementById("myModal");
const btn = document.querySelector(".modal-add-button");

// Récupération de la Modale 2 et du bouton "avec la flèche retour &#8592 avec la class before"
const modal2 = document.getElementById("myModal2");
const btnBack = document.querySelector(".before");

// Ouverture de la Modale 2 en cliquant sur le bouton "Ajouter une photo"
btn.onclick = function () {
  modal.style.display = "none";
  modal2.style.display = "block";
}

// Fermeture de la Modale 2 en cliquant sur le bouton "Retour"
btnBack.onclick = function () {
  modal2.style.display = "none";
  modal.style.display = "block";
}


















// AJOUT DE LA PHOTO SELECTIONNEE DANS LA DIV
// AJOUT DE LA PHOTO SELECTIONNEE DANS LA DIV
// AJOUT DE LA PHOTO SELECTIONNEE DANS LA DIV

const addPhotoButton = document.getElementById('addPhotoButton');
const imagePreview = document.getElementById('imagePreview');
let selectedFile; 

addPhotoButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0]; 
    console.log('Fichier sélectionné :', selectedFile);

    // Création d'un objet FileReader pour lire l'image sélectionnée
    const reader = new FileReader();
    reader.onload = (e) => {
      // Création d'un élément <img> avec l'image sélectionnée
      const imageElement = document.createElement('img');
      imageElement.src = e.target.result;
      imageElement.style.maxHeight = '100%'; // Conserve la hauteur maximale de la div
      imageElement.style.display = 'block'; // Affiche l'image en tant que bloc
      imageElement.style.margin = '0 auto'; // Centre l'image

      // Suppression des éléments à l'intérieur de la div modal-add-box
      const modalAddBox = document.querySelector('.modal-add-box');
      while (modalAddBox.firstChild) {
        modalAddBox.firstChild.remove();
      }

      // Ajout de l'image sélectionnée à la div modal-add-box
      modalAddBox.appendChild(imageElement);
    };

    // Lecture du contenu de l'image sélectionnée en tant que Data URL
    reader.readAsDataURL(selectedFile);
  });
  fileInput.click();
});




















// RECUPERATION DES CATEGORIES POUR MENU DEROULANT
// RECUPERATION DES CATEGORIES POUR MENU DEROULANT
// RECUPERATION DES CATEGORIES POUR MENU DEROULANT

window.addEventListener('DOMContentLoaded', (event) => {
  // Récupération de menu déroulant des catégories
  const categorySelect = document.querySelector('.modal-category-select');

  // Requête pour récupérer les catégories de l'API
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      // Pour chaque catégorie, création d'une option et ajout au menu déroulant
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

// Récupéation du bouton "Valider"
const form = document.getElementById('add-photo-form');

// Récupération des éléments du DOM
const titleInput = document.querySelector('.modal-title-input');
const categorySelect = document.querySelector('.modal-category-select');
const fileInput = document.getElementById('file-input'); 


// Evénement au clic sur le bouton "Valider"
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Récupération des valeurs des champs
  const title = titleInput.value;
  const category = categorySelect.value;


  // Vérification, Si tous les champs sont remplis
  if (!title || !category || !selectedFile) {
    alert('Veuillez remplir tous les champs et sélectionner un fichier');
    console.error('Veuillez remplir tous les champs et sélectionner un fichier');
    // A revoir pour afficher alerte correctement
    alert('Veuillez remplir tous les champs et sélectionner un fichier');
    return false;
    
  }

  // Création de l'objet FormData pour envoyer les données
  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('title', title);
  formData.append('category', category);

  // Envois de la requête POST avec les données du formulaire
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      // Utiliser le token d'accès de l'utilisateur en ligne / connecté
      'Authorization': `Bearer ${token}`, 
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Réponse de l\'API :', data);

      // Vérifier si le fichier est correctement téléchargé en affichant dans la console les data
      if (data.imageUrl) {
        console.log('Fichier téléchargé :', data.imageUrl);

        // Mise à jour de l'attribut src de l'image avec l'URL de l'image téléchargée
        const previewImage = document.createElement('img');
        previewImage.src = data.imageUrl;
        previewImage.style.maxHeight = '300px';

        // Remplacer l'aperçu de l'image dans la div imagePreview
        // Supprimer le contenu précédent de la div
        imagePreview.innerHTML = ''; 
        imagePreview.appendChild(previewImage);

        // Requête GET pour récupérer la galerie complète
        fetch('http://localhost:5678/api/works')
          .then(response => response.json())
          .then(data => {
            // Mise à jour de la galerie avec le nouveau projet
            const gallery = document.querySelector('.gallery');

            // Création d'un élément <div> pour le nouveau projet
            const workElement = document.createElement('div');
            workElement.classList.add('work');

            // Création d'un élément <img> pour l'image du nouveau projet
            const imageElement = document.createElement('img');
            imageElement.src = data[data.length - 1].imageUrl; // Utiliser l'URL de la dernière image ajoutée

            // Création d'un élément <p> pour le titre du nouveau projet
            const titleElement = document.createElement('p');
            titleElement.textContent = data[data.length - 1].title; // Utiliser le titre de la dernière image ajoutée

            // Ajout des éléments créés dans la <div> pour le nouveau projet
            workElement.appendChild(imageElement);
            workElement.appendChild(titleElement);

            // Ajout de la <div> pour le nouveau projet à la galerie
            gallery.appendChild(workElement);
            alert('image ajouté');
          })

          .catch(error => {
            console.error('Erreur de requête:', error);
          });
      } else {
        console.log('Erreur lors du téléchargement du fichier.');
      }

      // Revoir cette partie du code pour le rafraichissement de la page
    })
    .catch(error => {
      console.error('Erreur de requête:', error);
    });
  return false;
});















