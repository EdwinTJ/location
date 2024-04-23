"use client";

import { useRouter } from 'next/navigation'
import { useState,useEffect } from "react";
import { toast } from "sonner";
import { createClient } from '@/util/supabase/client';

export default function Location( {user}) {
  const supabase = createClient();
  const router = useRouter()

  const [ipAddress,setIpAddress] = useState("");
  const [geoInfo,setGeoInfo] = useState(null);

  useEffect(() => {
    getVisitorIP();
  }, []);

  useEffect(() => {
    if (user) {
      fetchGeoInfo();
    }
  }, [user]);

  const getVisitorIP = async ()=>{
    try {
      const response =await fetch("https://api.ipify.org");
      const data = await response.text();
        setIpAddress(data);
    } catch (error) {
      toast.error("Failed to retrive IP address")
      console.log("Failed to fetch IP: " ,error);
    }
  };

  const fetchGeoInfo = async ()=>{
    if (!ipAddress) return;  // Guard clause if no IP address is present

    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await response.json();
      if(data.status === "success"){
        setGeoInfo(data);
      }
      else{
        toast.error("Fail to retive current location")
      }
    } catch (error) {
      toast.error("Fail to get Location Info")
    }
  };

  const addPlace = async () => {
    if (!user) {
      toast.error("User is not logged in");
      return;
    }

    try {
      const { data, error } = await supabase.from("placesvisited").insert([
        {
          user_id : user.id,
          country: geoInfo.country,
          state: geoInfo.regionName,
          city: geoInfo.city
        }
      ]);

      if (error) {
        toast.error("Failed to add place: " + error.message);
      } else {
        toast.success("Place added successfully!");
        router.push('/')
      }
    } catch (error) {
      toast.error("Failed to add place: " + error.message);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
        {geoInfo && (
        <div className="bg-yellow-500 text-white text-center p-4 mb-4">
            <p>Geo Information: {geoInfo.country}, {geoInfo.city}, {geoInfo.regionName}, {geoInfo.timezone}</p>
        </div>
        )}
      <div className="flex gap-4">
          <button 
            className="flex-1 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={fetchGeoInfo}
          >
            Show Me My Location
          </button>
          <button
            className="flex-1 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={addPlace}
            disabled={!geoInfo || !user}
            >
            Add Place
          </button>
        </div>
    </div>
  );
}
