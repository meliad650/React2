// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import ApiService from "../ApiService";

// function AlbumDetail() {
//     const { albumId } = useParams();
//     const [photos, setPhotos] = useState([]);
//     const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//     const [displayAddPhotoForm, setDisplayAddPhotoForm] = useState(false);
//     const [newPhoto, setNewPhoto] = useState({ albumId: albumId });
//     const [displayEditPhotoForm, setDisplayEditPhotoForm] = useState(null);
//     const limitOfPhotos = 5;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await ApiService.GETWithLimit(
//                     "photos",
//                     "albumId",
//                     albumId,
//                     limitOfPhotos,
//                     currentPhotoIndex
//                 );
//                 setPhotos(data);
//             } catch (error) {
//                 console.error("Error fetching photos:", error);
//             }
//         };
//         fetchData();
//     }, [albumId, currentPhotoIndex]);

//     const nextPhoto = () => {
//         setCurrentPhotoIndex((prevIndex) => prevIndex + limitOfPhotos);
//     };

//     const previousPhoto = () => {
//         setCurrentPhotoIndex((prevIndex) => prevIndex - limitOfPhotos);
//     };
//     const addPhoto = async () => {
//         if (!newPhoto.title || !newPhoto.thumbnailUrl) {
//             alert('Both title and image URL are required');
//             return;
//         }
//         try {
//             const newPhotoData = await ApiService.POST("photos", newPhoto);
//             setPhotos((prevPhotos) => [...prevPhotos, newPhotoData]);
//             setDisplayAddPhotoForm(false);
//             setNewPhoto({ albumId: albumId });
//         } catch (error) {
//             console.error("Error adding photo:", error);
//             alert('Failed to add photo, please try again.');
//         }
//     };
    

//     const editPhoto = async (photoId) => {
//         try {
//             const updatedPhoto = await ApiService.PUT("photos", photoId, newPhoto);
//             setPhotos((prevPhotos) =>
//                 prevPhotos.map((photo) =>
//                     photo.id === photoId ? updatedPhoto : photo
//                 )
//             );
//             setDisplayEditPhotoForm(null);
//             setNewPhoto({ albumId: albumId });
//         } catch (error) {
//             console.error("Error updating photo:", error);
//         }
//     };

//     const deletePhoto = async (photoId) => {
//         try {
//             await ApiService.DELETE("photos", photoId);
//             setPhotos((prevPhotos) =>
//                 prevPhotos.filter((photo) => photo.id !== photoId)
//             );
//         } catch (error) {
//             console.error("Error deleting photo:", error);
//         }
//     };

//     return (
//         <div>
//             <h3>Photos in Album {albumId}</h3>
//             <button onClick={() => setDisplayAddPhotoForm(true)}>Add Photo</button>
//             {displayAddPhotoForm && (
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Photo Title"
//                         onChange={(e) =>
//                             setNewPhoto({ ...newPhoto, title: e.target.value })
//                         }
//                     />
//                     <input
//                         type="url"
//                         placeholder="Insert a link of the new image"
//                         onChange={(e) =>
//                             setNewPhoto({
//                                 ...newPhoto,
//                                 thumbnailUrl: e.target.value,
//                             })
//                         }
//                     />
//                     <button onClick={addPhoto}>Add</button>
//                 </div>
//             )}
//             <ul>
//                 {photos.map((photo) => (
//                     <li key={photo.id}>
//                         <img src={photo.thumbnailUrl} alt={photo.title} />
//                         <button onClick={() => deletePhoto(photo.id)}>
//                             Delete Photo
//                         </button>
//                         <button onClick={() => setDisplayEditPhotoForm(photo.id)}>
//                             Edit Photo
//                         </button>
//                         {displayEditPhotoForm === photo.id && (
//                             <div>
//                                 <input
//                                     type="text"
//                                     placeholder="Photo Title"
//                                     onChange={(e) =>
//                                         setNewPhoto({
//                                             ...newPhoto,
//                                             title: e.target.value,
//                                         })
//                                     }
//                                 />
//                                 <input
//                                     type="url"
//                                     placeholder="Insert a link of the new image"
//                                     onChange={(e) =>
//                                         setNewPhoto({
//                                             ...newPhoto,
//                                             thumbnailUrl: e.target.value,
//                                         })
//                                     }
//                                 />
//                                 <button onClick={() => editPhoto(photo.id)}>
//                                     Update
//                                 </button>
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//             <button
//                 onClick={previousPhoto}
//                 disabled={currentPhotoIndex === 0}
//             >
//                 Previous
//             </button>
//             <button onClick={nextPhoto}>Next</button>
//         </div>
//     );
// }

// export default AlbumDetail;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../ApiService";

function AlbumDetail() {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [displayAddPhotoForm, setDisplayAddPhotoForm] = useState(false);
    const [newPhoto, setNewPhoto] = useState({ albumId: albumId });
    const [displayEditPhotoForm, setDisplayEditPhotoForm] = useState(null);
    const [loading, setLoading] = useState(false); // לניהול מצב הטעינה
    const [hasMore, setHasMore] = useState(true); // אם יש עוד תמונות
    const limitOfPhotos = 5;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await ApiService.GETWithLimit(
                    "photos",
                    "albumId",
                    albumId,
                    limitOfPhotos,
                    currentPhotoIndex
                );
                if (data.length < limitOfPhotos) {
                    setHasMore(false); // אם פחות מ-5 תמונות, אין עוד תמונות לטעון
                }
                setPhotos((prevPhotos) => [...prevPhotos, ...data]); // הוספת התמונות החדשות
            } catch (error) {
                console.error("Error fetching photos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [albumId, currentPhotoIndex]);

    // פונקציה לטיפול בגלילה
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom && !loading && hasMore) {
            setCurrentPhotoIndex((prevIndex) => prevIndex + limitOfPhotos); // טעינת תמונות נוספות
        }
    };

    const addPhoto = async () => {
        if (!newPhoto.title || !newPhoto.thumbnailUrl) {
            alert('Both title and image URL are required');
            return;
        }
        try {
            const newPhotoData = await ApiService.POST("photos", newPhoto);
            setPhotos((prevPhotos) => [...prevPhotos, newPhotoData]);
            setDisplayAddPhotoForm(false);
            setNewPhoto({ albumId: albumId });
        } catch (error) {
            console.error("Error adding photo:", error);
            alert('Failed to add photo, please try again.');
        }
    };

    const editPhoto = async (photoId) => {
        try {
            const updatedPhoto = await ApiService.PUT("photos", photoId, newPhoto);
            setPhotos((prevPhotos) =>
                prevPhotos.map((photo) =>
                    photo.id === photoId ? updatedPhoto : photo
                )
            );
            setDisplayEditPhotoForm(null);
            setNewPhoto({ albumId: albumId });
        } catch (error) {
            console.error("Error updating photo:", error);
        }
    };

    const deletePhoto = async (photoId) => {
        try {
            await ApiService.DELETE("photos", photoId);
            setPhotos((prevPhotos) =>
                prevPhotos.filter((photo) => photo.id !== photoId)
            );
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    return (
        <div onScroll={handleScroll} style={{ height: '80vh', overflowY: 'auto' }}>
            <h3>Photos in Album {albumId}</h3>
            <button onClick={() => setDisplayAddPhotoForm(true)}>Add Photo</button>
            {displayAddPhotoForm && (
                <div>
                    <input
                        type="text"
                        placeholder="Photo Title"
                        onChange={(e) =>
                            setNewPhoto({ ...newPhoto, title: e.target.value })
                        }
                    />
                    <input
                        type="url"
                        placeholder="Insert a link of the new image"
                        onChange={(e) =>
                            setNewPhoto({
                                ...newPhoto,
                                thumbnailUrl: e.target.value,
                            })
                        }
                    />
                    <button onClick={addPhoto}>Add</button>
                </div>
            )}
            <ul>
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <button onClick={() => deletePhoto(photo.id)}>
                            Delete Photo
                        </button>
                        <button onClick={() => setDisplayEditPhotoForm(photo.id)}>
                            Edit Photo
                        </button>
                        {displayEditPhotoForm === photo.id && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Photo Title"
                                    onChange={(e) =>
                                        setNewPhoto({
                                            ...newPhoto,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="url"
                                    placeholder="Insert a link of the new image"
                                    onChange={(e) =>
                                        setNewPhoto({
                                            ...newPhoto,
                                            thumbnailUrl: e.target.value,
                                        })
                                    }
                                />
                                <button onClick={() => editPhoto(photo.id)}>
                                    Update
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {loading && <div>Loading...</div>}
            {!hasMore && <div>No more photos to load</div>}
        </div>
    );
}

export default AlbumDetail;
