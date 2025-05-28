import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Define the Branch type
type Branch = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

const branches: Branch[] = [
  {
    id: 1,
    name: "Main Branch",
    address: "123 Main St, New York, NY",
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    id: 2,
    name: "Downtown Branch",
    address: "456 Downtown Ave, Brooklyn, NY",
    lat: 40.6905,
    lng: -73.9857,
  },
];

const BranchLocator = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="w-full space-y-6">
        <br />
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Find a Branch Near You</h2>
        <p className="text-gray-600">Use the map below to locate the nearest branch.</p>
      </div>

      {/* Optional Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter your location"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-md">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={12}
          >
            {branches.map((branch) => (
              <Marker
                key={branch.id}
                position={{ lat: branch.lat, lng: branch.lng }}
                onClick={() => setSelectedBranch(branch)}
              />
            ))}

            {selectedBranch && (
              <InfoWindow
                position={{ lat: selectedBranch.lat, lng: selectedBranch.lng }}
                onCloseClick={() => setSelectedBranch(null)}
              >
                <div>
                  <h3 className="font-semibold">{selectedBranch.name}</h3>
                  <p className="text-sm text-gray-700">{selectedBranch.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default BranchLocator;
