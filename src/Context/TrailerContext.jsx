import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { updateMap } from "kepler.gl/actions";

export const TrailerContext = createContext();

export const TrailerContextProvider = ({children}) => {

    const [offduty, setOffduty] = useState([])
    const [Maintenance, setMaintenance] = useState([])
    const [Intransit, setIntransit] = useState([])
    const [Loading, setLoading] = useState([])
    const [Trailercount, setTrailerCount] = useState(0);
    const [map, setMap] = useState(new Map());
    const dispatch = useDispatch();

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
    
    function TimeDiff(Upcomming){
        var currentTimeStamp = new Date();
        var upcommingTimeStamp = Upcomming
        var timeDifference = upcommingTimeStamp - currentTimeStamp;
        var days = Math.floor(timeDifference/ (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDifference % (1000 * 60  * 60 * 24))/(1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000*60));
        return Math.abs(days) + "D, " + Math.abs(hours) + "H, " + Math.abs(minutes) + "M "
    }

    const TailerDataSelction = (val) =>{
        const vehicleData = val.hasOwnProperty("vehicle") ? val.vehicle : {}
        const coords = map.has(`${vehicleData.vehicleRegistrationNumber}`) ? map.get(`${vehicleData.vehicleRegistrationNumber}`) : {}
        const FinalSelection = {
            currentCoordinates:coords,
            Status:val.status,
            VNumber: `${vehicleData.vehicleRegistrationNumber}`.slice(`${vehicleData.vehicleRegistrationNumber}`.length - 4),
            Type: vehicleData.vehicleLoadType?.name,
            GM:vehicleData.customFields.length > 6 ? vehicleData.customFields[6].value : "",
            Reson:val.emptyRunReason,
            ArriveIn:val.currentTripPoint ? TimeDiff(val.currentTripPoint.actualArrival) : "-",
            Destination:val.currentHub ? val.currentHub.split(" ").length > 1 ? val.currentHub.split(" ")[1] : val.currentHub.split(" ")[0] : "",
            react: function (){
                return(
                    <tr className='w-full text-center'>
                            <td onClick={()=> {
                                
                                dispatch(
                                  updateMap({
                                    latitude: this.currentCoordinates.hasOwnProperty("lat") ? this.currentCoordinates.lat : 0,  
                                    longitude: this.currentCoordinates.hasOwnProperty("lon") ? this.currentCoordinates.lon : 0,
                                    width: 800,
                                    height: 1200,
                                    zoom: 18,
                                  })
                                );
                               
                            
                            }}>{this.currentCoordinates.hasOwnProperty("lat") ? "Location" : "-"}</td>
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
        return FinalSelection
    }
    const ProcessData = async(val) => {
        switch (val.status) {
            case "OffDuty":
                setOffduty((pre)=> [...pre, TailerDataSelction(val)]);
                break;
            case "Maintenance":
                setMaintenance((pre)=> [...pre, TailerDataSelction(val)]);
                break;
            case "Enroute for delivery":
                setIntransit((pre)=> [...pre, TailerDataSelction(val)]);
                break;
            case "At pickup":
                setLoading((pre)=> [...pre, TailerDataSelction(val)]);
                break;
            default:
                break;
                
        }
    }
    async function fetchStatusDataFromApmlApi(){
        const headers = {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w`,
        };
        const response = await axios.get("https://apis.fretron.com/fleet-manager/fleetOps/v1/fleetOps?filters={}%20&tab=ALL%20VEHICLES", {headers})
        const DATA = response.data.data.recordes["NO GROUPING"];
        setTrailerCount(response.data.data.count);
        DATA.map((val, index) => {
            if(JSON.stringify(val).toLocaleLowerCase().includes("hb")) ProcessData(val);
        })
    }

    useEffect(()=>{
        const promise = new Promise((res, rej)=> {
            res(FetchVehicaleData())
        })
        promise.then((d)=> {
        fetchStatusDataFromApmlApi();
    })
}, [])

    return(
        <TrailerContext.Provider
            value={{
                offduty,
                Maintenance,
                Intransit,
                Loading,
                TotalCount: Trailercount
            }}
        >
            {children}
        </TrailerContext.Provider>
    )

}