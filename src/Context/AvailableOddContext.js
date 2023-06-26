import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AvailableOddContext = createContext()

const AvailableOddContextProvide =({children}) =>{
        const [AvailableOdd, setAvailableOdd] = useState(0);
        const headers = {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w`,
          };
          const fetchData = async () => {
            const res = await axios.get('https://apis.fretron.com/fleet-manager/fleetOps/v1/fleetOps?filters={} &tab=AVAILABLE', {headers});
            const data =res.data.data
            const processData = data.records["NO GROUPING"].map((val, index)=>{
            const vehicleData = val.hasOwnProperty("vehicle") ? val.vehicle : {}
            const response = {
                Destination : val.destination,
                Status: val.status,
                VNumber: vehicleData.vehicleRegistrationNumber,
                Type: vehicleData.vehicleLoadType?.name,
                GM: vehicleData.customFields.length > 6 ? vehicleData.customFields[6].value : ""
            }
            // console.log(response);
            return response
            
            })
            // console.log(processData)
            }
        useEffect(()=>{

            fetchData()
        },[])
        
    return(
        <AvailableOddContext.Provider
        value={{}}
        >
            {
                children
            }
        </AvailableOddContext.Provider>
    )
}

export default AvailableOddContextProvide 
