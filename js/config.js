// Configuration de la carte
const CONFIG = {
    // Centre de la carte (coordonnées de Bannalec)
    center: { lat: 47.9333, lng: -3.7 },
    
    // Niveau de zoom initial
    zoom: 13,
    
    // Chemin vers le fichier de données
    dataUrl: 'data/poi.json',
    
    // Types de points d'intérêt et leurs icônes (utilisant les icônes Google Maps par défaut)
    poiTypes: {
        'eglise': {
            icon: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            title: 'Église'
        },
        'menhir': {
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            title: 'Menhir'
        },
        'megalithe': {
            icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            title: 'Mégalithe'
        },
        'moulin': {
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            title: 'Moulin à eau'
        },
        'four': {
            icon: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png', 
            title: 'Four à pain'
        },
        'autre': {
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            title: 'Point d\'intérêt'
        }
    }
};