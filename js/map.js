// Variables globales
let map;
let infoWindow;
let markers = [];

// Initialisation de la carte
function initMap() {
    console.log("Initialisation de la carte...");
    
    // Création de la carte
    map = new google.maps.Map(document.getElementById('map'), {
        center: CONFIG.center,
        zoom: CONFIG.zoom,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: true,
        fullscreenControl: false
    });
    
    // Création de l'infoWindow pour les popups
    infoWindow = new google.maps.InfoWindow();
    
    // Chargement des points d'intérêt
    loadPOIs();
    
    // Ajout d'un marqueur pour le centre de la carte (débogage)
    new google.maps.Marker({
        position: CONFIG.center,
        map: map,
        title: "Centre de Bannalec",
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(32, 32)
        }
    });
    
    // Gestion du bouton plein écran
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
}

// Chargement des points d'intérêt
function loadPOIs() {
    console.log("Chargement des points d'intérêt depuis:", CONFIG.dataUrl);
    
    // Utilisation de données en ligne dure pour tester (débogage)
    const hardcodedData = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-3.7001, 47.9333]
                },
                "properties": {
                    "name": "Église Saint-Cado",
                    "type": "eglise",
                    "description": "Église paroissiale datant du 16ème siècle.",
                    "period": "16ème siècle"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-3.6958, 47.9387]
                },
                "properties": {
                    "name": "Menhir de Kerlouriec",
                    "type": "menhir",
                    "description": "Menhir datant du Néolithique.",
                    "period": "Néolithique"
                }
            }
        ]
    };
    
    // Tester avec les données en ligne dure d'abord
    console.log("Création des marqueurs avec données hardcodées");
    hardcodedData.features.forEach(createMarker);
    
    // Puis essayer avec le fichier JSON
    fetch(CONFIG.dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données chargées avec succès:", data);
            if (data.features && Array.isArray(data.features)) {
                console.log(`${data.features.length} points d'intérêt trouvés`);
                data.features.forEach(feature => {
                    console.log("Création du marqueur pour:", feature.properties.name);
                    createMarker(feature);
                });
            } else {
                console.error("Format de données invalide, features non trouvé ou pas un tableau");
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
            alert("Impossible de charger les points d'intérêt. Vérifiez la console pour plus de détails.");
        });
}

// Création d'un marqueur pour chaque point d'intérêt
function createMarker(feature) {
    console.log("Création du marqueur pour:", feature.properties.name);
    
    // Vérification des coordonnées
    if (!feature.geometry || !feature.geometry.coordinates || 
        feature.geometry.coordinates.length !== 2) {
        console.error("Coordonnées invalides pour:", feature.properties.name);
        return;
    }
    
    const type = feature.properties.type || 'autre';
    console.log("Type de POI:", type);
    
    // Utilisation d'une icône par défaut si le type n'est pas défini
    let icon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    
    // Essayer d'utiliser l'icône configurée si disponible
    if (CONFIG.poiTypes[type] && CONFIG.poiTypes[type].icon) {
        icon = CONFIG.poiTypes[type].icon;
    } else {
        console.warn(`Type "${type}" non défini dans CONFIG.poiTypes, utilisation de l'icône par défaut`);
    }
    
    // Position du marqueur
    const position = {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
    };
    
    console.log("Position:", position);
    
    // Création du marqueur
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: feature.properties.name,
        icon: {
            url: icon,
            scaledSize: new google.maps.Size(32, 32)
        }
    });
    
    // Ajout d'un listener pour l'événement click
    marker.addListener('click', () => {
        // Construction du contenu de l'infoWindow
        const content = buildInfoWindowContent(feature);
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
    });
    
    // Ajout du marqueur à la liste des marqueurs
    markers.push(marker);
    console.log("Marqueur créé avec succès");
}

// Construction du contenu de l'infoWindow
function buildInfoWindowContent(feature) {
    const props = feature.properties;
    
    let content = `
        <div class="custom-info-window">
            <h2>${props.name}</h2>
    `;
    
    // Ajout d'une image si disponible
    if (props.image) {
        content += `<img src="${props.image}" alt="${props.name}" onerror="this.style.display='none'">`;
    }
    
    // Ajout de la description
    if (props.description) {
        content += `<p>${props.description}</p>`;
    }
    
    // Ajout de l'époque/période
    if (props.period) {
        content += `<p><strong>Époque :</strong> ${props.period}</p>`;
    }
    
    // Ajout d'un lien si disponible
    if (props.link) {
        content += `<a href="${props.link}" target="_blank">En savoir plus</a>`;
    }
    
    content += '</div>';
    
    return content;
}

// Fonction pour basculer en mode plein écran
function toggleFullScreen() {
    const container = document.querySelector('.container');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}