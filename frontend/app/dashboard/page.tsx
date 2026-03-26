"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProperties, fetchFavourites, addToFavourites, removeFromFavourites } from "@/lib/api/api_favourites";
import { getCurrentUser } from "@/lib/api/api_auth";
import { logoutUser } from "@/lib/api/api_auth";
import { User } from "@/types/auth";
import { Property } from "@/types/property";
import Button from "@/components/ui/Button";
import { Heart, Trash, LogOut, MapPin, Tag, Building2, Menu, X } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [favourites, setFavourites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);
        const [allProperties, favs] = await Promise.all([fetchProperties(), fetchFavourites()]);
        setProperties(allProperties);
        setFavourites(favs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [router]);

  const addFavourite = async (property: Property) => {
    try {
      await addToFavourites(property.id);
      setFavourites((prev) => [...prev, property]);
    } catch (err) {
      console.error(err);
      alert("Failed to add to favourites.");
    }
  };

  const removeFavourite = async (property: Property) => {
    try {
      await removeFromFavourites(property.id);
      setFavourites((prev) => prev.filter((f) => f.id !== property.id));
    } catch (err) {
      console.error(err);
      alert("Failed to remove favourite.");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold mb-5">
        {user?.name?.charAt(0).toUpperCase()}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">User Info</h3>
        <div className="space-y-3">
          {[
            { label: "Name", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Role", value: user?.role },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
              <p className="text-gray-300 text-sm break-all">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-700 mb-6" />

      <div className="mb-6">
        <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-3">Saved Properties</h4>
        {favourites.length === 0 ? (
          <p className="text-gray-600 text-sm">None saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {favourites.slice(0, 5).map((fav) => (
              <li key={fav.id} className="flex items-center gap-2 text-sm text-gray-300">
                <Heart size={12} className="text-green-400 fill-green-400 shrink-0" />
                <span className="truncate">{fav.name}</span>
              </li>
            ))}
            {favourites.length > 5 && (
              <p className="text-xs text-gray-500 pl-5">+{favourites.length - 5} more</p>
            )}
          </ul>
        )}
      </div>

      <Button
        variant="ghost"
        className="mt-auto flex items-center justify-center gap-2 border border-gray-600 hover:bg-red-600 hover:text-white w-full"
        onClick={handleLogout}
      >
        <LogOut size={18} /> Logout
      </Button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">

      {/* mobile */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700 sticky top-0 z-30">
        <h1 className="text-lg font-bold truncate">Welcome, {user?.name}</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
         
          <div className="relative ml-auto w-80 max-w-full bg-gray-900 border-l border-gray-700 flex flex-col p-6 h-full overflow-y-auto">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
            <div className="mt-8">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="flex flex-1 overflow-hidden">
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Browse all listings or manage your saved favourites below.
            </p>
          </div>

          
          <p className="lg:hidden text-gray-400 text-sm mb-6">
            Browse all listings or manage your saved favourites below.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
            {[
              { label: "Total Listings", value: properties.length, icon: Building2 },
              { label: "Favourites", value: favourites.length, icon: Heart },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-gray-800 rounded-lg p-4 flex items-center gap-3 shadow-md">
                <div className="bg-gray-700 p-2 rounded-md">
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">All Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {properties.map((property) => {
                const isFav = favourites.some((f) => f.id === property.id);
                return (
                  <div
                    key={property.id}
                    className="p-4 bg-gray-800 rounded-lg shadow-md flex flex-col justify-between hover:shadow-xl transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold">{property.name}</h3>
                        {isFav && (
                          <Heart size={16} className="text-green-400 fill-green-400 shrink-0 mt-1" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-300 text-sm mb-1">
                        <MapPin size={13} className="text-gray-500 shrink-0" />
                        {property.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Tag size={13} className="text-gray-500 shrink-0" />
                        {property.price}
                      </div>
                    </div>

                    {isFav ? (
                      <p className="mt-4 text-green-400 font-semibold text-sm">✓ Added to Favourites</p>
                    ) : (
                      <Button
                        variant="primary"
                        className="mt-4 flex items-center gap-2"
                        onClick={() => addFavourite(property)}
                      >
                        <Heart size={16} /> Add to Favourites
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Favourites</h2>
            {favourites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-700 rounded-lg">
                <Heart size={28} className="text-gray-600 mb-2" />
                <p className="text-gray-400">You have no favourite properties yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {favourites.map((fav) => (
                  <div
                    key={fav.id}
                    className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center hover:shadow-xl transition"
                  >
                    <div className="min-w-0 mr-4">
                      <h3 className="text-lg sm:text-xl font-semibold truncate">{fav.name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-300 text-sm mt-0.5">
                        <MapPin size={12} className="text-gray-500 shrink-0" />
                        <span className="truncate">{fav.location}</span>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="ml-4 flex items-center gap-2 shrink-0"
                      onClick={() => removeFavourite(fav)}
                    >
                      <Trash size={16} /> Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <aside className="hidden lg:flex w-80 bg-gray-900 p-6 border-l border-gray-700 flex-col">
          <SidebarContent />
        </aside>
      </div>
    </div>
  );
}