import React, { useState, useEffect } from "react";
import "../css_files/albums.css";


const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [photosPage, setPhotosPage] = useState(1);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const limitOfPhotos = 4; // מספר התמונות בכל טעינה
  const currentUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  ; // מזהה המשתמש הנוכחי (לדוגמה)

  // טעינת כל האלבומים
  useEffect(() => {
    fetch("http://localhost:3000/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setFilteredAlbums(data); // ברירת מחדל - כל האלבומים
      })
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  // חיפוש אלבומים
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = albums.filter(
      (album) =>
        album.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        album.id.toString().includes(event.target.value)
    );
    setFilteredAlbums(filtered);
  };

  // סינון לפי המשתמש הנוכחי
  const filterByCurrentUser = () => {
    const userAlbums = albums.filter((album) => album.userId === currentUserId);
    setFilteredAlbums(userAlbums);
  };

  // טעינת תמונות מאלבום
  const loadPhotos = (albumId, page) => {
    setIsLoadingPhotos(true);
    fetch(`http://localhost:3000/photos?albumId=${albumId}&_page=${page}&_limit=${limitOfPhotos}`)
      .then((response) => response.json())
      .then((data) => {
        const newPhotos = data.filter(
          (photo) => !photos.some((existingPhoto) => existingPhoto.id === photo.id)
        );

        if (newPhotos.length < limitOfPhotos) {
          setHasMorePhotos(false);
        }

        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        setIsLoadingPhotos(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setIsLoadingPhotos(false);
      });
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    setPhotos([]);
    setPhotosPage(1);
    setHasMorePhotos(true);
    loadPhotos(albumId, 1);
  };

  const handleLoadMorePhotos = () => {
    const nextPage = photosPage + 1;
    loadPhotos(selectedAlbum, nextPage);
    setPhotosPage(nextPage);
  };

  const handleAddAlbum = () => {
    const title = prompt("Enter album title:");
    if (title) {
      fetch("http://localhost:3000/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userId: currentUserId }),
      })
        .then((response) => response.json())
        .then((newAlbum) => {
          setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
          setFilteredAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
        })
        .catch((error) => console.error("Error adding album:", error));
    }
  };

  const handleDeletePhoto = (photoId) => {
    fetch(`http://localhost:3000/photos/${photoId}`, {
      method: "DELETE",
    })
      .then(() => {
        setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
      })
      .catch((error) => console.error("Error deleting photo:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Albums</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddAlbum}>
        Add Album
      </button>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded ml-2"
        onClick={filterByCurrentUser}
      >
        Show My Albums
      </button>
      <input
        type="text"
        placeholder="Search by ID or title"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full"
      />
      {selectedAlbum ? (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-gray-300 rounded"
            onClick={() => setSelectedAlbum(null)}
          >
            Back to Albums
          </button>
          <h2 className="text-xl font-bold">Photos</h2>
          <div className="photos-container">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
                <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="load-more-container">
            <button
              className="load-more-button"
              onClick={handleLoadMorePhotos}
              disabled={!hasMorePhotos}
            >
              {hasMorePhotos ? "Load More Photos" : "אין עוד תמונות"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Album List</h2>
          <ul>
            {filteredAlbums.map((album) => (
              <li key={album.id}>
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleAlbumClick(album.id)}
                >
                  {album.id}: {album.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;
