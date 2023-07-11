import React, { useContext, useState } from 'react'
import { SXLContext } from '../Context/SXLContext';
import { AvailableContext } from '../Context/AvailableOddContext';
import Logo from '../assets/logo1.png'
// import Select from 'react-select/dist/declarations/src/Select';

const DataSxlTable = ({ControlTable, 
    Data, TotalCount, Type}) => {
    const fields = ["Map", "VNumber", "Destination","Status", "Arrive IN", "GM", "Reson", "Type"]
    const [Search,setSearch] = useState("")
    return(
        <div className=''>
                    
                    <div className="h-14 w-full flex items-center text-sm font-bold justify-between px-5 bg-[#29323C] rounded-tl-xl text-white sticky top-0  ">
                        <div className="text-[10px] text-[#FF0000] flex justify-between gap-2 items-center">
                            <h1>VEHICLE ISSUE {`${Type}`.toUpperCase()} </h1> 
                            <h1 className='font-black text-[#0000FF] bg-gray-100 rounded-full p-1 w-12 text-center '>{ ((Data.length / TotalCount) * 100).toFixed(0) } % </h1>
                        </div>
                        <div className="flex items-center ">

                                <input className="mx-2 p-1 px-3 rounded-xl shadow-xl text-[11px] text-black" 
                                list="datalistId"
                                placeholder="Search"
                                onChange={(e)=> {
                                    const value = e.target.value;
                                    setSearch(e.target.value)
                                }} />

                            <div onClick={ControlTable} className="cursor-pointer ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </div>
                        </div>

                    </div>
                    <table className="bg-black w-full text-[10px] bg-opacity-70 block h-[500px] overflow-y-auto ">
                        <thead className="sticky top-0 w-fit shadow-xl bg-white">
                            <tr className="w-full bg-[#FF0000] ">
                               {
                                fields.map((val, index) => {
                                    return (<th className=" w-fit px-5 border-[#FF0000] border-2 sticky top-0">{val}</th>)
                                })
                               }
                            </tr>
                        </thead>
                        <tbody className="text-white  w-full">
                            
                            {
                                    Data.map((val, index)=> {
                                        const SearchField = JSON.stringify(val)
                                        if(Search.length > 0 && SearchField.toLocaleLowerCase().includes(Search.toLocaleLowerCase())){
                                            return(
                                                val.react()
                                            )
                                        }
                                        else if(Search.length === 0){
                                            return(
                                                val.react()
                                            )
                                        }

                                    })
                               } 
                        </tbody>
                    </table>
                </div>
    )
}

function SxlTable() {
    const [show, setShow] = useState({
        dataToShow: "OffDuty",
        open: false,
    })
    const StatusContextU = useContext(SXLContext)
    const AvailableOddContextU = useContext(AvailableContext)
    function ControlTable(type) {
        if(!type){
            setShow({
                ...show,
                open: !show.open,
            })
        } else {
            setShow({
                ...show,
                open: !show.open,
                dataToShow: type
            })
        }
    }

    const CheckToPassData = () => {
        switch(show.dataToShow){
            case "OffDuty":
                return StatusContextU.Sxloffduty;
            case "AvailableHub":
                return AvailableOddContextU.AvailableSXLHub;
            case "AvailableOdd":
                return AvailableOddContextU.AvailableSXLOdd;
            case "Maintenance":
                return StatusContextU.SxlMaintenance;
            case "Enroute for delivery":
                return StatusContextU.SxlIntransit;
            case "At pickup":
                return StatusContextU.SxlLoading;
            default:
                return StatusContextU.Sxloffduty;
        }
    }

    return (
        <div className=' absolute top-3 left-16 h-full justify-center items-center z-50 w-fit text-[8px] rounded-xl '>
             {
                show.open ? (<DataSxlTable ControlTable={ControlTable} Data={CheckToPassData()} TotalCount={StatusContextU.TotalCount} Type={show.dataToShow} />) : (
                    <div >
                    <div className='w-[140px] h-[40px] rounded-md text-[11px] bg-gray-300 flex justify-between items-center absolute left-[1.5rem] cursor-pointer'>
                        <img src={Logo} alt="" srcset="" className='animate-bounce w-8 h-8' />
                        <h1 className="text-[#0000FF] w-full font-black  mr-1"> SXL <span className='text-[#000000]'>Screen Issue</span></h1>
                    </div>
                    <div onClick={()=> ControlTable("AvailableHub")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[3rem] left-12 cursor-pointer">
                        <h1 className="text-[#00FF00] font-bold mr-1">  AVLBL HUB</h1>
                        <h1 className='text-[#FF0000] bg-gray-900 rounded-full text-center p-[5px]'> { ((AvailableOddContextU.AvailableSXLHub.length / StatusContextU.TotalCount) * 100).toFixed(0) }% 🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("AvailableOdd")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[5rem] left-12 cursor-pointer">
                        <h1 className="text-[#00FF00] font-bold  mr-1">  AVLBL ODD</h1>
                        <h1 className='text-[#FF0000] bg-gray-900 rounded-full text-center p-[5px]'> { ((AvailableOddContextU.AvailableSXLOdd.length / StatusContextU.TotalCount) * 100).toFixed(0) }%🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("OffDuty")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[7rem] left-12 cursor-pointer">
                        <h1 className="text-[#00FF00] font-bold  mr-1">  OFFDT  </h1>
                        <h1 className='text-[#FF0000] bg-gray-900 rounded-full text-center p-[5px]'>{ ((CheckToPassData().length / StatusContextU.TotalCount) * 100).toFixed(0) }%🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("Maintenance")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[9rem] left-12 cursor-pointer">
                        <h1 className="text-[#00FF00] font-bold  mr-1">  MNTNCE</h1>
                        <h1 className='text-[#FF0000] bg-gray-900 rounded-full text-center p-[5px]'>{ ((StatusContextU.SxlMaintenance.length / StatusContextU.TotalCount) * 100).toFixed(0) }%🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("Enroute for delivery")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[11rem] left-12 cursor-pointer">
                        <h1 className="text-[#00FF00] font-bold  mr-1">  INTRANSIT</h1>
                        <h1 className='text-[#FF0000] bg-gray-900 rounded-full text-center p-[5px]'> { ((StatusContextU.SxlIntransit.length / StatusContextU.TotalCount) * 100).toFixed(0) }%🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("At pickup")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[13rem] left-12 cursor-pointer">
                        <h1 className="text-[#00FF00] font-bold  mr-1">  LODING</h1>
                        <h1 className='text-[#FF0000] bg-gray-900 rounded-full text-center p-[5px]'>{ ((StatusContextU.SxlLoading.length / StatusContextU.TotalCount) * 100).toFixed(0) }%🚛</h1>
                    </div>
                    </div>
                )}
    </div>

    )
}

export default SxlTable
    
    
    
    