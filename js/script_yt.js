var CACHE_KEY = "youtubeCache";
var CACHE_EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000; 

var arr_url = [];

function initializeYouTubeAPI() {
    var cachedData = getDataFromCache();
    if (cachedData) {
        processData(cachedData);
    } else {
        fetchAndCacheData();
    }
}

function fetchAndCacheData() {
    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCu5g2KWoXXhaE6TVmg-5UzCajAZok5czk&q=ste.agritech&type=video&part=snippet&maxResults=10&channelId=UCydT7lIVxMlR2rjylvI0zAg")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Errore HTTP, stato " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            saveDataToCache(data);
            processData(data);
            console.log("fetch eseguita");
        })
        .catch((error) => {
            console.error('Si è verificato un errore durante la richiesta API:', error);
            useStaticUrls();
        });
}

function processData(data) {
    data.items.sort((a, b) => {
        return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
    });

    var recentVideos = data.items.slice(0, 3);

    recentVideos.forEach((video, index) => {
        arr_url.push(video.id.videoId);
        var url = "https://www.youtube.com/embed/" + video.id.videoId;
        var iframe = document.getElementById("iframe0" + (index + 1));
        iframe.src = url;
    });
}

function useStaticUrls() {
    var staticUrls = [
        "https://www.youtube.com/embed/qxgGt-wekk4",
        "https://www.youtube.com/embed/RJOeLC2402c",
        "https://www.youtube.com/embed/ej8Ypzyr9Tk"
    ];

    staticUrls.forEach((url, index) => {
        var iframe = document.getElementById("iframe0" + (index + 1));
        iframe.src = url;
    });
}

function getDataFromCache() {
    var cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        var parsedData = JSON.parse(cachedData);
        if (new Date().getTime() - parsedData.timestamp <= CACHE_EXPIRATION_TIME_MS) {
            return parsedData.data;
        } else {
            localStorage.removeItem(CACHE_KEY);
        }
    }
    return null;
}

function saveDataToCache(data) {
    var cacheData = {
        data: data,
        timestamp: new Date().getTime()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Funzione per pulire la cache
function clearCache() {
    localStorage.removeItem(CACHE_KEY);
    console.log('Cache pulita');
}
