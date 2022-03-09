// add event listener on enter button
document
  .getElementById("input-field")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      document.getElementById("submit").click();
    }
  });

const handleSearch = () => {
  const keyword = document.getElementById('input-field');
  const artistContainer = document.getElementById("artists");
  const albumContainer = document.getElementById("albums");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));

  document.getElementById('input-field').value = '';
  artistContainer.innerHTML = "";
  albumContainer.innerHTML = "";
};

const showArtists = (data) => {
  const artistContainer = document.getElementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : 'https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : 'Not available'}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : 'Not available'}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : 'Not available'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  const artistContainer = document.getElementById("artists");
  artistContainer.innerHTML = "";
  const albumContainer = document.getElementById("albums");
  albumContainer.innerHTML = "";
};

const showAlbum = (allAlbums) => {
  const albumContainer = document.getElementById("albums");
  allAlbums.forEach((album) => {
    console.log(album)
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h4>${album.strAlbum} (${album.intYearReleased})</h4>
          <p>${album.strArtist}</p>
        </div>
      `;
    albumContainer.appendChild(div);
  });
};

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () => {
  themeToggler.classList.toggle('fa-sun');
  if (themeToggler.classList.contains('fa-sun')) {
    document.body.classList.add('active');
  } else {
    document.body.classList.remove('active');
  }
}