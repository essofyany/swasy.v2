const input = document.querySelector('#input');
const searchBtn = document.querySelector('#search-btn');
const songCollection = document.querySelector('.section-slider');
const lyricsApi = 'https://api.lyrics.ovh';

// create  container of songs searched
const songRow = document.createElement('div');
songRow.setAttribute('class', 'row');

// get song or artist songs
async function searchSong(term) {
    const res = await fetch(`${lyricsApi}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// get lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${lyricsApi}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyricsText = data.lyrics.replace(/(\r\n|\n|\r)/g, '<br>');
    
    songCollection.innerHTML = `
        <h4 class ="flow-text center purple-text" style="font-weight: bold;">${songTitle}</h4>
            <h5 class ="flow-text center grey-text">${artist}</h5>
        <div>
            <p class="flow-text center">${lyricsText}</p>
        </div>
    `;

}


// show collection of searched song or artist
function showData(data) {

    let output = '';
    data.data.length = 12;
    data.data.forEach( song => {
            output += `
            <div class="col s12 m3"">
                <a href="#!" class="grey-text">
                    <div style="height: 300px;">
                        <img src="${song.artist.picture}" style="width: 150px;" class="album-img" 
                            data-artist="${song.artist.name}" data-songtitle="${song.title}"alt="">
                        <h6 class="flow-text artist" data-artist="${song.artist.name}" 
                            data-songtitle="${song.title}">${song.artist.name}</h6>
                        <p class="song-name" data-artist="${song.artist.name}" 
                            data-songtitle="${song.title}">${song.title}</p>
                    </div>
                </a>
            </div> `
        
    });

    songRow.innerHTML = output;

}


// search listener
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchName = input.value.trim();
    if(!input.value) {
        alert('Please Enter The Name of A Song Or An Artist!')
    } else {
        input.value = ''
        searchSong(searchName);
        songCollection.innerHTML = '';
        songCollection.appendChild(songRow);
    }
});

// get lyrics 
songCollection.addEventListener('click', (e)=> {
    const clickedElement = e.target;
    
    const artist = clickedElement.getAttribute('data-artist');
    const songTitle = clickedElement.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
})



