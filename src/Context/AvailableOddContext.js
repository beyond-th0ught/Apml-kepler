import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { updateMap } from "kepler.gl/actions";

export const AvailableContext = createContext();

export const AvailableContextProvider = ({children}) => {

    const [AvailableHub, setAvailableHub] = useState([])
    const [AvailableOdd, setAvailableOdd] = useState([])
    const [AvailableSXLHub, setAvailableSXLHub] = useState([])
    const [AvailableSXLOdd, setAvailableSXLOdd] = useState([])
    const [AvailableTrailerHub, setAvailableTrailerHub] = useState([])
    const [AvailableTrailerOdd, setAvailableTrailerOdd] = useState([])
    const [map, setMap] = useState(new Map());
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    function TimeDiff(Upcomming){
        var currentTimestamp = new Date();

        // Set the upcoming timestamp
        var upcomingTimestamp = Upcomming // Note: Months are zero-indexed (0-11)

        // Calculate the time difference in milliseconds
        var timeDifference = upcomingTimestamp - currentTimestamp;

        // Convert the time difference to days, hours, and minutes
        var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        return Math.abs(days) + "D, " + Math.abs(hours) + "H " //+ Math.abs(minutes) + "M"
    }

    const FetchVehicaleData = async()=>{
        const response3 = await fetch(
          "https://script.google.com/macros/s/AKfycbw8Lz1tD_ar-Fa9irk8RhZxWIc8urdB7QyBigErWpX5exsSgLdgg_kPI10lYBSXzyr8/exec"
        );
        const data3 = await response3.json();
        const data1= data3.data.map((val, index)=> {
            map.set(val[3], {
                lat: val[0],
                lon: val[1]
            })
            return {
                lat: val[0],
                lon: val[1]
            }
        })
        return data1;
    }

    const DataSelection = (val) => {
        const vehicleData = val.hasOwnProperty("vehicle") ? val.vehicle : {}
        const coords = map.has(`${vehicleData.vehicleRegistrationNumber}`) ? map.get(`${vehicleData.vehicleRegistrationNumber}`) : {}

        const finalSelection = {
                currentCoordinates: coords,
                Status: val.status,
                VNumber: `${vehicleData.vehicleRegistrationNumber}`.slice(`${vehicleData.vehicleRegistrationNumber}`.length - 4),
                Type: vehicleData.vehicleLoadType?.name,
                GM: vehicleData.customFields.length > 6 ? vehicleData.customFields[6].value : "",
                Reson: val.emptyRunReason,
                ArriveIN: val.currentTripPoint ? TimeDiff(val.currentTripPoint.actualArrival) : "-",
                destination: val.currentHub ? val.currentHub.split(" ").length > 1 ? val.currentHub.split(" ")[1] : val.currentHub.split(" ")[0] : "",
                react: function () {
                    return (
                        <tr className='w-full text-center '>
                            <td className='border-2 border-[#29323C] text-blue-500' onClick={()=> {
                                
                                dispatch(
                                  updateMap({
                                    latitude: this.currentCoordinates.hasOwnProperty("lat") ? this.currentCoordinates.lat : 0,  
                                    longitude: this.currentCoordinates.hasOwnProperty("lon") ? this.currentCoordinates.lon : 0,
                                    width: 800,
                                    height: 1200,
                                    zoom: 18,
                                  })
                                );
                               
                            
                            }}>
                                
                                {this.currentCoordinates.hasOwnProperty("lat") ? <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg></> : "-"}
                            </td>
                            <td className="border-2 border-[#29323C] ">{this.VNumber}</td>
                            <td className="border-2 border-[#29323C] ">{this.destination}</td>
                            <td className="border-2 border-[#29323C] ">{this.Status}</td>
                            <td className="border-2 border-[#29323C] ">{this.ArriveIN}</td>
                            <td className="border-2 border-[#29323C] ">{this.GM}</td>
                            <td className="border-2 border-[#29323C] ">{this.Reson}</td>
                            <td className="border-2 border-[#29323C] text-[#FFFF00] font-bold ">{this.Type}</td>
                        </tr>
                    )
                }
        }

        return finalSelection
    }
    const PorocessData = async(val) => {
       const hub = val.currentHub.includes("APML")
        switch(val.status) {
            case "Available":
                if (hub){
                    setAvailableHub((pre)=> [...pre, DataSelection(val)]);
                }
                else{
                    setAvailableOdd((pre)=> [...pre, DataSelection(val)])
                }
                
                break;
            default:
                break;
                
        }
    }

    const PorocessDataForSXL = async(val) => {
        const hub = val.currentHub.includes("APML")
         switch(val.status) {
             case "Available":
                 if (hub){
                    setAvailableSXLHub((pre)=> [...pre, DataSelection(val)]);
                 }
                 else{
                    setAvailableSXLOdd((pre)=> [...pre, DataSelection(val)])
                 }
                 
                 break;
             default:
                 break;
                 
         }
     }
     const PorocessDataForTrailer = async(val) => {
        const hub = val.currentHub.includes("APML")
         switch(val.status) {
             case "Available":
                 if (hub){
                    setAvailableTrailerHub((pre)=> [...pre, DataSelection(val)]);
                 }
                 else{
                    setAvailableTrailerOdd((pre)=> [...pre, DataSelection(val)])
                 }
                 
                 break;
             default:
                 break;
                 
         }
     }
    async function fetchStatusDataFromApmlApi() {
        const headers = {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w`,
        };
        const response = await axios.get("https://apis.fretron.com/fleet-manager/fleetOps/v1/fleetOps?filters={}%20&tab=AVAILABLE", {headers})

        const DATA = response.data.data.records["NO GROUPING"];
        setCount(response.data.data.count);
        DATA.map((val, index) => {
            if(JSON.stringify(val).toLocaleLowerCase().includes("mxl")) PorocessData(val);
            if(JSON.stringify(val).toLocaleLowerCase().includes("sxl")) PorocessDataForSXL(val);
            if(JSON.stringify(val).toLocaleLowerCase().includes("hb")) PorocessDataForTrailer(val);

        })  
    }

    useEffect(()=> {
        const promise = new Promise((res, rej)=> {
            res(FetchVehicaleData())
        })
        promise.then((d)=> {
            fetchStatusDataFromApmlApi();
        })
    }, [])


    return (
        <AvailableContext.Provider
        value={{
            AvailableHub,
            AvailableOdd,
            AvailableSXLHub,
            AvailableSXLOdd,
            AvailableTrailerHub,
            AvailableTrailerOdd,
            TotalCount1: count
        }}
        >
            {children}
        </AvailableContext.Provider>
    )
}