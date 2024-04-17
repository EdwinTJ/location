"use client";

import { useState,useEffect } from "react";
export default function Home() {
  const [ipAddress,setIpAddress] = useState("");
  const [geoInfo,setGeoInfo] = useState(null);

  const [cordinates,setLocation] = useState("");
  useEffect(()=>{

    getVisitorIP();
  },[]);

  const getVisitorIP = async ()=>{
    try {
      const response =await fetch("https://api.ipify.org");
      const data = await response.text();
        setIpAddress(data);
    } catch (error) {
      console.log("Failed to fetch IP: " ,error);
    }
  };

  const fetchGeoInfo = async ()=>{
    if (!ipAddress) return;  // Guard clause if no IP address is present

    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
      // const response = await fetch(`http://ip-api.com/json/144.39.206.197`);
      const data = await response.json();
      if(data.status === "success"){
        console.log("data",data);
        setGeoInfo(data);
      }
      else{
        console.log("Fail")
      }
    } catch (error) {
      console.log("Fail to get Location Info: ", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex justify-center items-center min-h-screen">
          {ipAddress && <p>Your IP address is {ipAddress}</p>}
          <button 
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={fetchGeoInfo}
          >
              Show Me My Location
          </button>
          {geoInfo && <p>Geo Information: {geoInfo.country}, {geoInfo.city}, {geoInfo.regionName}, {geoInfo.timezone}</p>}
        </div>
    </div>
    </main>
  );
}
