// Configuration de la carte
const CONFIG = {
    // Centre de la carte (coordonnées de Bannalec)
    center: { lat: 47.9333, lng: -3.7 },
    
    // Niveau de zoom initial
    zoom: 13,
    
    // Chemin vers le fichier de données
    dataUrl: 'data/poi.json',
    
    // Types de points d'intérêt et leurs icônes
    poiTypes: {
        'eglise': {
            icon: 'data/images/church.png',
            title: 'Église'
        },
        'menhir': {
            icon: 'data/images/menhir.png',
            title: 'Menhir'
        },
        'megalithe': {
            icon: 'data/images/megalith.png',
            title: 'Mégalithe'
        },
        'moulin': {
            icon: 'data/images/mill.png',
            title: 'Moulin à eau'
        },
        'four': {
            icon: 'data/images/oven.png', 
            title: 'Four à pain'
        },
        'autre': {
            icon: 'data/images/landmark.png',
            title: 'Point d\'intérêt'
        }
    }
};
