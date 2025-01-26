// // // import React, { useState, useEffect } from "react";
// // // import { useParams } from "react-router-dom";
// // // import ApiService from "../ApiService";

// // // function AlbumDetail() {
// // //     const { albumId } = useParams();
// // //     const [photos, setPhotos] = useState([]);
// // //     const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
// // //     const [displayAddPhotoForm, setDisplayAddPhotoForm] = useState(false);
// // //     const [newPhoto, setNewPhoto] = useState({ albumId: albumId });
// // //     const [displayEditPhotoForm, setDisplayEditPhotoForm] = useState(null);
// // //     const limitOfPhotos = 5;

// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 const data = await ApiService.GETWithLimit(
// // //                     "photos",
// // //                     "albumId",
// // //                     albumId,
// // //                     limitOfPhotos,
// // //                     currentPhotoIndex
// // //                 );
// // //                 setPhotos(data);
// // //             } catch (error) {
// // //                 console.error("Error fetching photos:", error);
// // //             }
// // //         };
// // //         fetchData();
// // //     }, [albumId, currentPhotoIndex]);

// // //     const nextPhoto = () => {
// // //         setCurrentPhotoIndex((prevIndex) => prevIndex + limitOfPhotos);
// // //     };

// // //     const previousPhoto = () => {
// // //         setCurrentPhotoIndex((prevIndex) => prevIndex - limitOfPhotos);
// // //     };
// // //     const addPhoto = async () => {
// // //         if (!newPhoto.title || !newPhoto.thumbnailUrl) {
// // //             alert('Both title and image URL are required');
// // //             return;
// // //         }
// // //         try {
// // //             const newPhotoData = await ApiService.POST("photos", newPhoto);
// // //             setPhotos((prevPhotos) => [...prevPhotos, newPhotoData]);
// // //             setDisplayAddPhotoForm(false);
// // //             setNewPhoto({ albumId: albumId });
// // //         } catch (error) {
// // //             console.error("Error adding photo:", error);
// // //             alert('Failed to add photo, please try again.');
// // //         }
// // //     };
    

// // //     const editPhoto = async (photoId) => {
// // //         try {
// // //             const updatedPhoto = await ApiService.PUT("photos", photoId, newPhoto);
// // //             setPhotos((prevPhotos) =>
// // //                 prevPhotos.map((photo) =>
// // //                     photo.id === photoId ? updatedPhoto : photo
// // //                 )
// // //             );
// // //             setDisplayEditPhotoForm(null);
// // //             setNewPhoto({ albumId: albumId });
// // //         } catch (error) {
// // //             console.error("Error updating photo:", error);
// // //         }
// // //     };

// // //     const deletePhoto = async (photoId) => {
// // //         try {
// // //             await ApiService.DELETE("photos", photoId);
// // //             setPhotos((prevPhotos) =>
// // //                 prevPhotos.filter((photo) => photo.id !== photoId)
// // //             );
// // //         } catch (error) {
// // //             console.error("Error deleting photo:", error);
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h3>Photos in Album {albumId}</h3>
// // //             <button onClick={() => setDisplayAddPhotoForm(true)}>Add Photo</button>
// // //             {displayAddPhotoForm && (
// // //                 <div>
// // //                     <input
// // //                         type="text"
// // //                         placeholder="Photo Title"
// // //                         onChange={(e) =>
// // //                             setNewPhoto({ ...newPhoto, title: e.target.value })
// // //                         }
// // //                     />
// // //                     <input
// // //                         type="url"
// // //                         placeholder="Insert a link of the new image"
// // //                         onChange={(e) =>
// // //                             setNewPhoto({
// // //                                 ...newPhoto,
// // //                                 thumbnailUrl: e.target.value,
// // //                             })
// // //                         }
// // //                     />
// // //                     <button onClick={addPhoto}>Add</button>
// // //                 </div>
// // //             )}
// // //             <ul>
// // //                 {photos.map((photo) => (
// // //                     <li key={photo.id}>
// // //                         <img src={photo.thumbnailUrl} alt={photo.title} />
// // //                         <button onClick={() => deletePhoto(photo.id)}>
// // //                             Delete Photo
// // //                         </button>
// // //                         <button onClick={() => setDisplayEditPhotoForm(photo.id)}>
// // //                             Edit Photo
// // //                         </button>
// // //                         {displayEditPhotoForm === photo.id && (
// // //                             <div>
// // //                                 <input
// // //                                     type="text"
// // //                                     placeholder="Photo Title"
// // //                                     onChange={(e) =>
// // //                                         setNewPhoto({
// // //                                             ...newPhoto,
// // //                                             title: e.target.value,
// // //                                         })
// // //                                     }
// // //                                 />
// // //                                 <input
// // //                                     type="url"
// // //                                     placeholder="Insert a link of the new image"
// // //                                     onChange={(e) =>
// // //                                         setNewPhoto({
// // //                                             ...newPhoto,
// // //                                             thumbnailUrl: e.target.value,
// // //                                         })
// // //                                     }
// // //                                 />
// // //                                 <button onClick={() => editPhoto(photo.id)}>
// // //                                     Update
// // //                                 </button>
// // //                             </div>
// // //                         )}
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //             <button
// // //                 onClick={previousPhoto}
// // //                 disabled={currentPhotoIndex === 0}
// // //             >
// // //                 Previous
// // //             </button>
// // //             <button onClick={nextPhoto}>Next</button>
// // //         </div>
// // //     );
// // // }

// // // export default AlbumDetail;
// // import React, { useState, useEffect } from "react";
// // // import { useParams } from "react-router-dom";
// // // import ApiService from "../ApiService";

// // function AlbumDetail() {
// //     // const { albumId } = useParams();
// //     const [photos, setPhotos] = useState([]);
// //     const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
// //     const [displayAddPhotoForm, setDisplayAddPhotoForm] = useState(false);
// //     const [newPhoto, setNewPhoto] = useState({ albumId: albumId });
// //     const [displayEditPhotoForm, setDisplayEditPhotoForm] = useState(null);
// //     const [loading, setLoading] = useState(false); // לניהול מצב הטעינה
// //     const [hasMore, setHasMore] = useState(true); // אם יש עוד תמונות
// //     const limitOfPhotos = 5;

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             setLoading(true);
// //             try {
// //                 const data = await ApiService.GETWithLimit(
// //                     "photos",
// //                     "albumId",
// //                     albumId,
// //                     limitOfPhotos,
// //                     currentPhotoIndex
// //                 );
// //                 if (data.length < limitOfPhotos) {
// //                     setHasMore(false); // אם פחות מ-5 תמונות, אין עוד תמונות לטעון
// //                 }
// //                 setPhotos((prevPhotos) => [...prevPhotos, ...data]); // הוספת התמונות החדשות
// //             } catch (error) {
// //                 console.error("Error fetching photos:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, [albumId, currentPhotoIndex]);

// //     // פונקציה לטיפול בגלילה
// //     const handleScroll = (e) => {
// //         const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
// //         if (bottom && !loading && hasMore) {
// //             setCurrentPhotoIndex((prevIndex) => prevIndex + limitOfPhotos); // טעינת תמונות נוספות
// //         }
// //     };

// //     const addPhoto = async () => {
// //         if (!newPhoto.title || !newPhoto.thumbnailUrl) {
// //             alert('Both title and image URL are required');
// //             return;
// //         }
// //         try {
// //             const newPhotoData = await ApiService.POST("photos", newPhoto);
// //             setPhotos((prevPhotos) => [...prevPhotos, newPhotoData]);
// //             setDisplayAddPhotoForm(false);
// //             setNewPhoto({ albumId: albumId });
// //         } catch (error) {
// //             console.error("Error adding photo:", error);
// //             alert('Failed to add photo, please try again.');
// //         }
// //     };

// //     const editPhoto = async (photoId) => {
// //         try {
// //             const updatedPhoto = await ApiService.PUT("photos", photoId, newPhoto);
// //             setPhotos((prevPhotos) =>
// //                 prevPhotos.map((photo) =>
// //                     photo.id === photoId ? updatedPhoto : photo
// //                 )
// //             );
// //             setDisplayEditPhotoForm(null);
// //             setNewPhoto({ albumId: albumId });
// //         } catch (error) {
// //             console.error("Error updating photo:", error);
// //         }
// //     };

// //     const deletePhoto = async (photoId) => {
// //         try {
// //             await ApiService.DELETE("photos", photoId);
// //             setPhotos((prevPhotos) =>
// //                 prevPhotos.filter((photo) => photo.id !== photoId)
// //             );
// //         } catch (error) {
// //             console.error("Error deleting photo:", error);
// //         }
// //     };

// //     return (
// //         <div onScroll={handleScroll} style={{ height: '80vh', overflowY: 'auto' }}>
// //             <h3>Photos in Album {albumId}</h3>
// //             <button onClick={() => setDisplayAddPhotoForm(true)}>Add Photo</button>
// //             {displayAddPhotoForm && (
// //                 <div>
// //                     <input
// //                         type="text"
// //                         placeholder="Photo Title"
// //                         onChange={(e) =>
// //                             setNewPhoto({ ...newPhoto, title: e.target.value })
// //                         }
// //                     />
// //                     <input
// //                         type="url"
// //                         placeholder="Insert a link of the new image"
// //                         onChange={(e) =>
// //                             setNewPhoto({
// //                                 ...newPhoto,
// //                                 thumbnailUrl: e.target.value,
// //                             })
// //                         }
// //                     />
// //                     <button onClick={addPhoto}>Add</button>
// //                 </div>
// //             )}
// //             <ul>
// //                 {photos.map((photo) => (
// //                     <li key={photo.id}>
// //                         <img src={photo.thumbnailUrl} alt={photo.title} />
// //                         <button onClick={() => deletePhoto(photo.id)}>
// //                             Delete Photo
// //                         </button>
// //                         <button onClick={() => setDisplayEditPhotoForm(photo.id)}>
// //                             Edit Photo
// //                         </button>
// //                         {displayEditPhotoForm === photo.id && (
// //                             <div>
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Photo Title"
// //                                     onChange={(e) =>
// //                                         setNewPhoto({
// //                                             ...newPhoto,
// //                                             title: e.target.value,
// //                                         })
// //                                     }
// //                                 />
// //                                 <input
// //                                     type="url"
// //                                     placeholder="Insert a link of the new image"
// //                                     onChange={(e) =>
// //                                         setNewPhoto({
// //                                             ...newPhoto,
// //                                             thumbnailUrl: e.target.value,
// //                                         })
// //                                     }
// //                                 />
// //                                 <button onClick={() => editPhoto(photo.id)}>
// //                                     Update
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </li>
// //                 ))}
// //             </ul>
// //             {loading && <div>Loading...</div>}
// //             {!hasMore && <div>No more photos to load</div>}
// //         </div>
// //     );
// // }

// // export default AlbumDetail;

// import React, { useState, useEffect } from "react";

// const AlbumsPage = () => {
//   const [albums, setAlbums] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
//   const [photosPage, setPhotosPage] = useState(1);

//   useEffect(() => {
//     fetch("http://localhost:3000/albums")
//       .then((response) => response.json())
//       .then((data) => setAlbums(data))
//       .catch((error) => console.error("Error fetching albums:", error));
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredAlbums = albums.filter(
//     (album) =>
//       album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       album.id.toString().includes(searchQuery)
//   );

//   const handleAlbumClick = (albumId) => {
//     setSelectedAlbum(albumId);
//     setPhotos([]);
//     setPhotosPage(1);
//     loadPhotos(albumId, 1);
//   };

//   const loadPhotos = (albumId, page) => {
//     setIsLoadingPhotos(true);
//     fetch(`http://localhost:3000/albums/${albumId}/photos?_page=${page}&_limit=10`)
//       .then((response) => response.json())
//       .then((data) => {
//         setPhotos((prevPhotos) => [...prevPhotos, ...data]);
//         setIsLoadingPhotos(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching photos:", error);
//         setIsLoadingPhotos(false);
//       });
//   };

//   const handleLoadMorePhotos = () => {
//     loadPhotos(selectedAlbum, photosPage + 1);
//     setPhotosPage((prevPage) => prevPage + 1);
//   };

//   const handleAddAlbum = () => {
//     const title = prompt("Enter album title:");
//     if (title) {
//       fetch("http://localhost:3000/albums", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, userId: 1 }), // Assuming userId is 1 for active user
//       })
//         .then((response) => response.json())
//         .then((newAlbum) => setAlbums((prevAlbums) => [...prevAlbums, newAlbum]))
//         .catch((error) => console.error("Error adding album:", error));
//     }
//   };

//   const handleDeletePhoto = (photoId) => {
//     fetch(`http://localhost:3000/photos/${photoId}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
//       })
//       .catch((error) => console.error("Error deleting photo:", error));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Albums</h1>
//       <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddAlbum}>
//         Add Album
//       </button>
//       <input
//         type="text"
//         placeholder="Search by ID or title"
//         value={searchQuery}
//         onChange={handleSearch}
//         className="mb-4 p-2 border rounded w-full"
//       />
//       {selectedAlbum ? (
//         <div>
//           <button
//             className="mb-4 px-4 py-2 bg-gray-300 rounded"
//             onClick={() => setSelectedAlbum(null)}
//           >
//             Back to Albums
//           </button>
//           <h2 className="text-xl font-bold">Photos</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {photos.map((photo) => (
//               <div key={photo.id} className="border rounded p-2">
//                 <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-auto" />
//                 <p>{photo.title}</p>
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDeletePhoto(photo.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//           {isLoadingPhotos && <p>Loading...</p>}
//           <button
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//             onClick={handleLoadMorePhotos}
//           >
//             Load More Photos
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-xl font-bold">Album List</h2>
//           <ul>
//             {filteredAlbums.map((album) => (
//               <li key={album.id}>
//                 <button
//                   className="text-blue-500 underline"
//                   onClick={() => handleAlbumClick(album.id)}
//                 >
//                   {album.id}: {album.title}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AlbumsPage;
import React, { useState, useEffect } from "react";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [photosPage, setPhotosPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.id.toString().includes(searchQuery)
  );

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    setPhotos([]);
    setPhotosPage(1);
    loadPhotos(albumId, 1);
  };

  const loadPhotos = (albumId, page) => {
    setIsLoadingPhotos(true);
    fetch(`http://localhost:3000/photos?albumId=${albumId}&_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        setIsLoadingPhotos(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setIsLoadingPhotos(false);
      });
  };

  const handleLoadMorePhotos = () => {
    loadPhotos(selectedAlbum, photosPage + 1);
    setPhotosPage((prevPage) => prevPage + 1);
  };

  const handleAddAlbum = () => {
    const title = prompt("Enter album title:");
    if (title) {
      fetch("http://localhost:3000/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userId: 1 }), // Assuming userId is 1 for active user
      })
        .then((response) => response.json())
        .then((newAlbum) => setAlbums((prevAlbums) => [...prevAlbums, newAlbum]))
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
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="border rounded p-2">
                <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-auto" />
                <p>{photo.title}</p>
                <button
                  className="text-red-500"
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {isLoadingPhotos && <p>Loading...</p>}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleLoadMorePhotos}
          >
            Load More Photos
          </button>
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
