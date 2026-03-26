// "use client";

// import { useEffect, useState } from "react";
// import {  fetchFavourites, addToFavourites, removeFromFavourites } from "@/lib/api/api_favourites";
// import { fetchProperties } from "@/lib/api/api_properties";
// import { Property } from "@/types/property";
// import Button from "@/components/ui/Button";

// export default function Dashboard() {

//   const [properties, setProperties] = useState<Property[]>([]);
//   const [favourites, setFavourites] = useState<Property[]>([]);
//   const [loadingFavourites, setLoadingFavourites] = useState(true);


//   // Fetch properties and favourites
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [allProperties, favs] = await Promise.all([fetchProperties(), fetchFavourites()]);
//         setProperties(allProperties);
//         setFavourites(favs);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoadingFavourites(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Add/remove favourite
//   const toggleFavourite = async (property: Property) => {
//     const isFav = favourites.some((f) => f.id === property.id);
//     try {
//       if (isFav) {
//         await removeFromFavourites(property.id);
//         setFavourites((prev) => prev.filter((f) => f.id !== property.id));
//       } else {
//         await addToFavourites(property.id);
//         setFavourites((prev) => [...prev, property]);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//   };

//   if (loadingFavourites) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
//       <p className="text-gray-400 mb-6">Role: {user?.role}</p>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Properties</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {properties.map((property) => {
//             const isFav = favourites.some((f) => f.id === property.id);
//             return (
//               <div key={property.id} className="p-4 bg-gray-800 rounded-lg shadow-md flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-xl font-semibold">{property.title}</h3>
//                   <p className="text-gray-300">{property.location}</p>
//                   <p className="text-gray-400 mt-1">{property.description}</p>
//                 </div>
//                 <Button
//                   variant={isFav ? "secondary" : "primary"}
//                   className="mt-4"
//                   onClick={() => toggleFavourite(property)}
//                 >
//                   {isFav ? "Remove from Favourites" : "Add to Favourites"}
//                 </Button>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="mt-10">
//         <h2 className="text-2xl font-semibold mb-4">My Favourites</h2>
//         {favourites.length === 0 ? (
//           <p className="text-gray-400">You have no favourite properties yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {favourites.map((fav) => (
//               <div key={fav.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold">{fav.title}</h3>
//                 <p className="text-gray-300">{fav.location}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }