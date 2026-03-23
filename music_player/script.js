// const CLIENT_ID = "22161c3e";
// const BASE_URL = "https://api.jamendo.com/v3.0/tracks/";
// const DEFAULT_COVER = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80&auto=format&fit=crop";

// const featuredSongs = document.getElementById("featuredSongs");
// const browseSongs = document.getElementById("browseSongs");
// const playlistContainer = document.getElementById("playlistContainer");
// const favoritesContainer = document.getElementById("favoritesContainer");
// const recentContainer = document.getElementById("recentContainer");

// const searchInput = document.getElementById("searchInput");
// const searchBtn = document.getElementById("searchBtn");
// const categoryButtons = document.querySelectorAll(".category-btn");

// const menuItems = document.querySelectorAll(".menu-item");
// const contentSections = document.querySelectorAll(".content-section");

// const audioPlayer = document.getElementById("audioPlayer");

// const playerCover = document.getElementById("playerCover");
// const playerTitle = document.getElementById("playerTitle");
// const playerArtist = document.getElementById("playerArtist");

// const playBtn = document.getElementById("playBtn");
// const stopBtn = document.getElementById("stopBtn");
// const prevBtn = document.getElementById("prevBtn");
// const nextBtn = document.getElementById("nextBtn");
// const progressBar = document.getElementById("progressBar");
// const currentTime = document.getElementById("currentTime");
// const duration = document.getElementById("duration");
// const volumeControl = document.getElementById("volumeControl");

// const bigPlayerCover = document.getElementById("bigPlayerCover");
// const bigPlayerTitle = document.getElementById("bigPlayerTitle");
// const bigPlayerArtist = document.getElementById("bigPlayerArtist");
// const bigPlayBtn = document.getElementById("bigPlayBtn");
// const bigStopBtn = document.getElementById("bigStopBtn");
// const bigPrevBtn = document.getElementById("bigPrevBtn");
// const bigNextBtn = document.getElementById("bigNextBtn");
// const bigProgressBar = document.getElementById("bigProgressBar");
// const bigCurrentTime = document.getElementById("bigCurrentTime");
// const bigDuration = document.getElementById("bigDuration");
// const bigVolumeControl = document.getElementById("bigVolumeControl");
// const autoplayToggle = document.getElementById("autoplayToggle");
// const backToHomeBtn = document.getElementById("backToHomeBtn");

// let tracks = [];
// let playlist = [];
// let favorites = [];
// let recentPlayed = [];
// let currentList = [];
// let currentIndex = 0;
// let currentTag = "";

// setDefaultPlayerUI();

// menuItems.forEach(item => {
//   item.addEventListener("click", () => {
//     openSection(item.dataset.section);
//   });
// });

// backToHomeBtn.addEventListener("click", () => {
//   openSection("homeSection");
// });

// function openSection(sectionId) {
//   menuItems.forEach(i => i.classList.remove("active"));
//   contentSections.forEach(section => section.classList.remove("active-section"));

//   document.getElementById(sectionId).classList.add("active-section");

//   const activeItem = [...menuItems].find(item => item.dataset.section === sectionId);
//   if (activeItem) activeItem.classList.add("active");
// }

// function setDefaultPlayerUI() {
//   playerCover.src = DEFAULT_COVER;
//   playerTitle.textContent = "No song selected";
//   playerArtist.textContent = "Choose a song to start";

//   bigPlayerCover.src = DEFAULT_COVER;
//   bigPlayerTitle.textContent = "No song selected";
//   bigPlayerArtist.textContent = "Choose a song to start";

//   progressBar.value = 0;
//   bigProgressBar.value = 0;
//   currentTime.textContent = "0:00";
//   duration.textContent = "0:00";
//   bigCurrentTime.textContent = "0:00";
//   bigDuration.textContent = "0:00";
// }

// async function fetchSongs(search = "", tag = "") {
//   try {
//     let url = `${BASE_URL}?client_id=${CLIENT_ID}&format=jsonpretty&limit=48&include=musicinfo&audioformat=mp32`;

//     if (search) url += `&search=${encodeURIComponent(search)}`;
//     if (tag) url += `&tags=${encodeURIComponent(tag)}`;

//     const response = await fetch(url);
//     const data = await response.json();
//     tracks = data.results || [];

//     renderSongs(tracks, featuredSongs);
//     renderSongs(tracks, browseSongs);
//   } catch (error) {
//     featuredSongs.innerHTML = "<p>Failed to load songs.</p>";
//     browseSongs.innerHTML = "<p>Failed to load songs.</p>";
//     console.error(error);
//   }
// }

// function renderSongs(songArray, container) {
//   container.innerHTML = "";

//   songArray.forEach((song, index) => {
//     const card = document.createElement("div");
//     card.className = "song-card";

//     card.innerHTML = `
//       <img src="${song.album_image || DEFAULT_COVER}" alt="${escapeHtml(song.name)}">
//       <div class="song-info">
//         <h4>${escapeHtml(song.name)}</h4>
//         <p>${escapeHtml(song.artist_name)}</p>
//         <div class="song-buttons">
//           <button class="play-song-btn" onclick="playTrack(${index})">Play</button>
//           <button class="playlist-btn" onclick="addToPlaylist(${index})">Playlist</button>
//           <button class="favorite-btn" onclick="addToFavorites(${index})">❤ Favorite</button>
//         </div>
//       </div>
//     `;

//     container.appendChild(card);
//   });
// }

// function updatePlayerUI(song) {
//   const image = song.album_image || DEFAULT_COVER;

//   playerCover.src = image;
//   playerTitle.textContent = song.name;
//   playerArtist.textContent = song.artist_name;

//   bigPlayerCover.src = image;
//   bigPlayerTitle.textContent = song.name;
//   bigPlayerArtist.textContent = song.artist_name;
// }

// function loadSong(song) {
//   audioPlayer.src = song.audio;
//   updatePlayerUI(song);
// }

// function playSong() {
//   if (!audioPlayer.src) return;
//   audioPlayer.play();
//   playBtn.textContent = "⏸";
//   bigPlayBtn.textContent = "⏸";
// }

// function pauseSong() {
//   audioPlayer.pause();
//   playBtn.textContent = "▶";
//   bigPlayBtn.textContent = "▶";
// }

// function stopSong() {
//   audioPlayer.pause();
//   audioPlayer.currentTime = 0;
//   playBtn.textContent = "▶";
//   bigPlayBtn.textContent = "▶";
//   progressBar.value = 0;
//   bigProgressBar.value = 0;
//   currentTime.textContent = "0:00";
//   bigCurrentTime.textContent = "0:00";
// }

// function playTrack(index) {
//   currentList = tracks;
//   currentIndex = index;
//   const song = currentList[currentIndex];
//   loadSong(song);
//   playSong();
//   addToRecent(song);
//   openSection("nowPlayingSection");
// }

// function addToPlaylist(index) {
//   const song = tracks[index];
//   if (!playlist.some(item => item.id === song.id)) {
//     playlist.push(song);
//     renderList(playlist, playlistContainer, "playlist");
//   }
// }

// function addToFavorites(index) {
//   const song = tracks[index];
//   if (!favorites.some(item => item.id === song.id)) {
//     favorites.push(song);
//     renderList(favorites, favoritesContainer, "favorites");
//   }
// }

// function addToRecent(song) {
//   recentPlayed = recentPlayed.filter(item => item.id !== song.id);
//   recentPlayed.unshift(song);

//   if (recentPlayed.length > 12) {
//     recentPlayed.pop();
//   }

//   renderList(recentPlayed, recentContainer, "recent");
// }

// function removeFromPlaylist(index) {
//   playlist.splice(index, 1);
//   renderList(playlist, playlistContainer, "playlist");
// }

// function removeFromFavorites(index) {
//   favorites.splice(index, 1);
//   renderList(favorites, favoritesContainer, "favorites");
// }

// function renderList(list, container, type) {
//   container.innerHTML = "";

//   if (list.length === 0) {
//     container.innerHTML = "<p>No songs here yet.</p>";
//     return;
//   }

//   list.forEach((song, index) => {
//     const item = document.createElement("div");
//     item.className = "list-item";

//     let actions = "";

//     if (type === "playlist") {
//       actions = `
//         <div class="list-actions">
//           <button class="action-btn" onclick="playFromSavedList('playlist', ${index})">Play</button>
//           <button class="remove-btn" onclick="removeFromPlaylist(${index})">Remove</button>
//         </div>
//       `;
//     } else if (type === "favorites") {
//       actions = `
//         <div class="list-actions">
//           <button class="action-btn" onclick="playFromSavedList('favorites', ${index})">Play</button>
//           <button class="remove-btn" onclick="removeFromFavorites(${index})">Remove</button>
//         </div>
//       `;
//     } else {
//       actions = `
//         <div class="list-actions">
//           <button class="action-btn" onclick="playFromSavedList('recent', ${index})">Play</button>
//         </div>
//       `;
//     }

//     item.innerHTML = `
//       <div>
//         <strong>${escapeHtml(song.name)}</strong><br>
//         <small>${escapeHtml(song.artist_name)}</small>
//       </div>
//       ${actions}
//     `;

//     container.appendChild(item);
//   });
// }

// function playFromSavedList(type, index) {
//   if (type === "playlist") {
//     currentList = playlist;
//   } else if (type === "favorites") {
//     currentList = favorites;
//   } else {
//     currentList = recentPlayed;
//   }

//   currentIndex = index;
//   const song = currentList[currentIndex];
//   loadSong(song);
//   playSong();
//   addToRecent(song);
//   openSection("nowPlayingSection");
// }

// function playNextSong() {
//   if (currentList.length === 0) return;
//   currentIndex = (currentIndex + 1) % currentList.length;
//   const song = currentList[currentIndex];
//   loadSong(song);
//   playSong();
//   addToRecent(song);
// }

// function playPrevSong() {
//   if (currentList.length === 0) return;
//   currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
//   const song = currentList[currentIndex];
//   loadSong(song);
//   playSong();
//   addToRecent(song);
// }

// playBtn.addEventListener("click", () => {
//   if (!audioPlayer.src) return;
//   audioPlayer.paused ? playSong() : pauseSong();
// });

// bigPlayBtn.addEventListener("click", () => {
//   if (!audioPlayer.src) return;
//   audioPlayer.paused ? playSong() : pauseSong();
// });

// stopBtn.addEventListener("click", stopSong);
// bigStopBtn.addEventListener("click", stopSong);

// nextBtn.addEventListener("click", playNextSong);
// prevBtn.addEventListener("click", playPrevSong);
// bigNextBtn.addEventListener("click", playNextSong);
// bigPrevBtn.addEventListener("click", playPrevSong);

// audioPlayer.addEventListener("timeupdate", () => {
//   if (audioPlayer.duration) {
//     const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;

//     progressBar.value = progress;
//     bigProgressBar.value = progress;

//     currentTime.textContent = formatTime(audioPlayer.currentTime);
//     duration.textContent = formatTime(audioPlayer.duration);

//     bigCurrentTime.textContent = formatTime(audioPlayer.currentTime);
//     bigDuration.textContent = formatTime(audioPlayer.duration);
//   }
// });

// progressBar.addEventListener("input", () => {
//   if (audioPlayer.duration) {
//     audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
//   }
// });

// bigProgressBar.addEventListener("input", () => {
//   if (audioPlayer.duration) {
//     audioPlayer.currentTime = (bigProgressBar.value / 100) * audioPlayer.duration;
//   }
// });

// volumeControl.addEventListener("input", () => {
//   audioPlayer.volume = volumeControl.value;
//   bigVolumeControl.value = volumeControl.value;
// });

// bigVolumeControl.addEventListener("input", () => {
//   audioPlayer.volume = bigVolumeControl.value;
//   volumeControl.value = bigVolumeControl.value;
// });

// audioPlayer.addEventListener("ended", () => {
//   if (autoplayToggle.checked) {
//     playNextSong();
//   } else {
//     stopSong();
//   }
// });

// searchBtn.addEventListener("click", () => {
//   fetchSongs(searchInput.value.trim(), currentTag);
//   openSection("browseSection");
// });

// categoryButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     categoryButtons.forEach(btn => btn.classList.remove("active-category"));
//     button.classList.add("active-category");

//     currentTag = button.dataset.tag;
//     fetchSongs(searchInput.value.trim(), currentTag);
//   });
// });

// function formatTime(time) {
//   const min = Math.floor(time / 60);
//   const sec = Math.floor(time % 60).toString().padStart(2, "0");
//   return `${min}:${sec}`;
// }

// function escapeHtml(text) {
//   const div = document.createElement("div");
//   div.textContent = text || "";
//   return div.innerHTML;
// }

// window.playTrack = playTrack;
// window.addToPlaylist = addToPlaylist;
// window.addToFavorites = addToFavorites;
// window.removeFromPlaylist = removeFromPlaylist;
// window.removeFromFavorites = removeFromFavorites;
// window.playFromSavedList = playFromSavedList;

// fetchSongs("love", "");


const CLIENT_ID = "22161c3e";
const BASE_URL = "https://api.jamendo.com/v3.0/tracks/";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80&auto=format&fit=crop";

const featuredSongs = document.getElementById("featuredSongs");
const browseSongs = document.getElementById("browseSongs");
const playlistContainer = document.getElementById("playlistContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const recentContainer = document.getElementById("recentContainer");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryButtons = document.querySelectorAll(".category-btn");

const menuItems = document.querySelectorAll(".menu-item");
const contentSections = document.querySelectorAll(".content-section");

const audioPlayer = document.getElementById("audioPlayer");

const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeControl = document.getElementById("volumeControl");

const bigPlayerCover = document.getElementById("bigPlayerCover");
const bigPlayerTitle = document.getElementById("bigPlayerTitle");
const bigPlayerArtist = document.getElementById("bigPlayerArtist");
const bigPlayBtn = document.getElementById("bigPlayBtn");
const bigStopBtn = document.getElementById("bigStopBtn");
const bigPrevBtn = document.getElementById("bigPrevBtn");
const bigNextBtn = document.getElementById("bigNextBtn");
const bigProgressBar = document.getElementById("bigProgressBar");
const bigCurrentTime = document.getElementById("bigCurrentTime");
const bigDuration = document.getElementById("bigDuration");
const bigVolumeControl = document.getElementById("bigVolumeControl");
const autoplayToggle = document.getElementById("autoplayToggle");
const backToHomeBtn = document.getElementById("backToHomeBtn");

let tracks = [];
let playlist = [];
let favorites = [];
let recentPlayed = [];
let currentList = [];
let currentIndex = 0;
let currentTag = "";

setDefaultPlayerUI();

history.replaceState({ section: "homeSection" }, "", "#homeSection");
openSection("homeSection", false);

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    openSection(item.dataset.section, true);
  });
});

backToHomeBtn.addEventListener("click", () => {
  openSection("homeSection", true);
});

window.addEventListener("popstate", (event) => {
  const section = event.state?.section || getSectionFromHash() || "homeSection";
  openSection(section, false);
});

function getSectionFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return null;

  const exists = document.getElementById(hash);
  return exists ? hash : null;
}

function openSection(sectionId, addToHistory = true) {
  menuItems.forEach(i => i.classList.remove("active"));
  contentSections.forEach(section => section.classList.remove("active-section"));

  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  targetSection.classList.add("active-section");

  const activeItem = [...menuItems].find(item => item.dataset.section === sectionId);
  if (activeItem) activeItem.classList.add("active");

  if (addToHistory) {
    history.pushState({ section: sectionId }, "", `#${sectionId}`);
  }
}

function setDefaultPlayerUI() {
  playerCover.src = DEFAULT_COVER;
  playerTitle.textContent = "No song selected";
  playerArtist.textContent = "Choose a song to start";

  bigPlayerCover.src = DEFAULT_COVER;
  bigPlayerTitle.textContent = "No song selected";
  bigPlayerArtist.textContent = "Choose a song to start";

  progressBar.value = 0;
  bigProgressBar.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";
  bigCurrentTime.textContent = "0:00";
  bigDuration.textContent = "0:00";
}

async function fetchSongs(search = "", tag = "") {
  try {
    let url = `${BASE_URL}?client_id=${CLIENT_ID}&format=jsonpretty&limit=48&include=musicinfo&audioformat=mp32`;

    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (tag) url += `&tags=${encodeURIComponent(tag)}`;

    const response = await fetch(url);
    const data = await response.json();
    tracks = data.results || [];

    renderSongs(tracks, featuredSongs);
    renderSongs(tracks, browseSongs);
  } catch (error) {
    featuredSongs.innerHTML = "<p>Failed to load songs.</p>";
    browseSongs.innerHTML = "<p>Failed to load songs.</p>";
    console.error(error);
  }
}

function renderSongs(songArray, container) {
  container.innerHTML = "";

  songArray.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <img src="${song.album_image || DEFAULT_COVER}" alt="${escapeHtml(song.name)}">
      <div class="song-info">
        <h4>${escapeHtml(song.name)}</h4>
        <p>${escapeHtml(song.artist_name)}</p>
        <div class="song-buttons">
          <button class="play-song-btn" onclick="playTrack(${index})">Play</button>
          <button class="playlist-btn" onclick="addToPlaylist(${index})">Playlist</button>
          <button class="favorite-btn" onclick="addToFavorites(${index})">❤ Favorite</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function updatePlayerUI(song) {
  const image = song.album_image || DEFAULT_COVER;

  playerCover.src = image;
  playerTitle.textContent = song.name;
  playerArtist.textContent = song.artist_name;

  bigPlayerCover.src = image;
  bigPlayerTitle.textContent = song.name;
  bigPlayerArtist.textContent = song.artist_name;
}

function loadSong(song) {
  audioPlayer.src = song.audio;
  updatePlayerUI(song);
}

function playSong() {
  if (!audioPlayer.src) return;
  audioPlayer.play();
  playBtn.textContent = "⏸";
  bigPlayBtn.textContent = "⏸";
}

function pauseSong() {
  audioPlayer.pause();
  playBtn.textContent = "▶";
  bigPlayBtn.textContent = "▶";
}

function stopSong() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  playBtn.textContent = "▶";
  bigPlayBtn.textContent = "▶";
  progressBar.value = 0;
  bigProgressBar.value = 0;
  currentTime.textContent = "0:00";
  bigCurrentTime.textContent = "0:00";
}

function playTrack(index) {
  currentList = tracks;
  currentIndex = index;
  const song = currentList[currentIndex];
  loadSong(song);
  playSong();
  addToRecent(song);
  openSection("nowPlayingSection", true);
}

function addToPlaylist(index) {
  const song = tracks[index];
  if (!playlist.some(item => item.id === song.id)) {
    playlist.push(song);
    renderList(playlist, playlistContainer, "playlist");
  }
}

function addToFavorites(index) {
  const song = tracks[index];
  if (!favorites.some(item => item.id === song.id)) {
    favorites.push(song);
    renderList(favorites, favoritesContainer, "favorites");
  }
}

function addToRecent(song) {
  recentPlayed = recentPlayed.filter(item => item.id !== song.id);
  recentPlayed.unshift(song);

  if (recentPlayed.length > 12) {
    recentPlayed.pop();
  }

  renderList(recentPlayed, recentContainer, "recent");
}

function removeFromPlaylist(index) {
  playlist.splice(index, 1);
  renderList(playlist, playlistContainer, "playlist");
}

function removeFromFavorites(index) {
  favorites.splice(index, 1);
  renderList(favorites, favoritesContainer, "favorites");
}

function renderList(list, container, type) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No songs here yet.</p>";
    return;
  }

  list.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = "list-item";

    let actions = "";

    if (type === "playlist") {
      actions = `
        <div class="list-actions">
          <button class="action-btn" onclick="playFromSavedList('playlist', ${index})">Play</button>
          <button class="remove-btn" onclick="removeFromPlaylist(${index})">Remove</button>
        </div>
      `;
    } else if (type === "favorites") {
      actions = `
        <div class="list-actions">
          <button class="action-btn" onclick="playFromSavedList('favorites', ${index})">Play</button>
          <button class="remove-btn" onclick="removeFromFavorites(${index})">Remove</button>
        </div>
      `;
    } else {
      actions = `
        <div class="list-actions">
          <button class="action-btn" onclick="playFromSavedList('recent', ${index})">Play</button>
        </div>
      `;
    }

    item.innerHTML = `
      <div>
        <strong>${escapeHtml(song.name)}</strong><br>
        <small>${escapeHtml(song.artist_name)}</small>
      </div>
      ${actions}
    `;

    container.appendChild(item);
  });
}

function playFromSavedList(type, index) {
  if (type === "playlist") {
    currentList = playlist;
  } else if (type === "favorites") {
    currentList = favorites;
  } else {
    currentList = recentPlayed;
  }

  currentIndex = index;
  const song = currentList[currentIndex];
  loadSong(song);
  playSong();
  addToRecent(song);
  openSection("nowPlayingSection", true);
}

function playNextSong() {
  if (currentList.length === 0) return;
  currentIndex = (currentIndex + 1) % currentList.length;
  const song = currentList[currentIndex];
  loadSong(song);
  playSong();
  addToRecent(song);
}

function playPrevSong() {
  if (currentList.length === 0) return;
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  const song = currentList[currentIndex];
  loadSong(song);
  playSong();
  addToRecent(song);
}

playBtn.addEventListener("click", () => {
  if (!audioPlayer.src) return;
  audioPlayer.paused ? playSong() : pauseSong();
});

bigPlayBtn.addEventListener("click", () => {
  if (!audioPlayer.src) return;
  audioPlayer.paused ? playSong() : pauseSong();
});

stopBtn.addEventListener("click", stopSong);
bigStopBtn.addEventListener("click", stopSong);

nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);
bigNextBtn.addEventListener("click", playNextSong);
bigPrevBtn.addEventListener("click", playPrevSong);

audioPlayer.addEventListener("timeupdate", () => {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = progress;
    bigProgressBar.value = progress;

    currentTime.textContent = formatTime(audioPlayer.currentTime);
    duration.textContent = formatTime(audioPlayer.duration);

    bigCurrentTime.textContent = formatTime(audioPlayer.currentTime);
    bigDuration.textContent = formatTime(audioPlayer.duration);
  }
});

progressBar.addEventListener("input", () => {
  if (audioPlayer.duration) {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  }
});

bigProgressBar.addEventListener("input", () => {
  if (audioPlayer.duration) {
    audioPlayer.currentTime = (bigProgressBar.value / 100) * audioPlayer.duration;
  }
});

volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
  bigVolumeControl.value = volumeControl.value;
});

bigVolumeControl.addEventListener("input", () => {
  audioPlayer.volume = bigVolumeControl.value;
  volumeControl.value = bigVolumeControl.value;
});

audioPlayer.addEventListener("ended", () => {
  if (autoplayToggle.checked) {
    playNextSong();
  } else {
    stopSong();
  }
});

searchBtn.addEventListener("click", () => {
  fetchSongs(searchInput.value.trim(), currentTag);
  openSection("browseSection", true);
});

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active-category"));
    button.classList.add("active-category");

    currentTag = button.dataset.tag;
    fetchSongs(searchInput.value.trim(), currentTag);
  });
});

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

window.playTrack = playTrack;
window.addToPlaylist = addToPlaylist;
window.addToFavorites = addToFavorites;
window.removeFromPlaylist = removeFromPlaylist;
window.removeFromFavorites = removeFromFavorites;
window.playFromSavedList = playFromSavedList;

fetchSongs("love", "");