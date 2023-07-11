import React, { useContext, useState } from 'react'
import { TrailerContext } from '../Context/TrailerContext';
import { AvailableContext } from '../Context/AvailableOddContext';
import Logo from '../assets/logo1.png'
// import Select from 'react-select/dist/declarations/src/Select';

const DataTrailerTable = ({ControlTable, 
    Data, TotalCount, Type}) => {
    const fields = ["Map","VNumber", "Destination","Status", "Arrive IN", "GM", "Reson", "Type"]
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

function TrailerTable() {
    const [show, setShow] = useState({
        dataToShow: "OffDuty",
        open: false,
    })
    const TrailerContextU = useContext(TrailerContext)
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
                return TrailerContextU.offduty;
            case "AvailableHub":
                return AvailableOddContextU.AvailableTrailerHub;
            case "AvailableOdd":
                return AvailableOddContextU.AvailableTrailerOdd;
            case "Maintenance":
                return TrailerContextU.Maintenance;
            case "Enroute for delivery":
                return TrailerContextU.Intransit
            case "At pickup":
                return TrailerContextU.Loading
            default:
                return TrailerContextU.offduty;
        }
    }

    return (
        <div className='absolute w-full top-3  left-16 justify-center items-center z-50 w-fit text-[8px] rounded-xl'>
             {
                show.open ? (<DataTrailerTable ControlTable={ControlTable} Data={CheckToPassData()} TotalCount={TrailerContextU.TotalCount} Type={show.dataToShow} />) : (
                    <>
                        <div className='absolute w-fit rounded-md text-[11px] bg-gray-300 flex justify-between items-center w-[80%] p-1  left-60'>
                        <img src={Logo} alt="" srcset="" className='w-8 h-8' />
                        <h1 className="text-[#0000FF] w-full font-black  mr-1"> Trailer <span className='text-[#000000]'>Screen Issue</span></h1>
                    </div>
                    <div onClick={()=> ControlTable("AvailableHub")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[3rem] left-64 cursor-pointer">
                        <h1 className="text-[#FF0000] font-bold mr-1">  AVLBL HUB</h1>
                        <h1 className='text-[#FFFF00] bg-gray-900 rounded-full text-center p-[5px]'>{ ((AvailableOddContextU.AvailableTrailerHub.length / TrailerContextU.TotalCount) * 100).toFixed(0) }%  🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("AvailableOdd")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[5rem] left-64 cursor-pointer">
                        <h1 className="text-[#FF0000] font-bold  mr-1">  AVLBL ODD</h1>
                        <h1 className='text-[#FFFF00] bg-gray-900 rounded-full text-center p-[5px]'>{ ((AvailableOddContextU.AvailableTrailerOdd.length / TrailerContextU.TotalCount) * 100).toFixed(0) }%  🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("OffDuty")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[7rem] left-64 cursor-pointer">
                        <h1 className="text-[#FF0000] font-bold  mr-1">  OFFDT  </h1>
                        <h1 className='text-[#FFFF00] bg-gray-900 rounded-full text-center p-[5px]'>{ ((CheckToPassData().length / TrailerContextU.TotalCount) * 100).toFixed(0) }% 🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("Maintenance")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[9rem] left-64 cursor-pointer">
                        <h1 className="text-[#FF0000] font-bold  mr-1">  MNTNCE</h1>
                        <h1 className='text-[#FFFF00] bg-gray-900 rounded-full text-center p-[5px]'> 🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("Enroute for delivery")} className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute top-[11rem] left-64 cursor-pointer">
                        <h1 className="text-[#FF0000] font-bold  mr-1">  INTRANSIT</h1>
                        <h1 className='text-[#FFFF00] bg-gray-900 rounded-full text-center p-[5px]'> 🚛</h1>
                    </div>
                    <div onClick={()=> ControlTable("At pickup")}  className="flex flex-cols-1 p-1 justify-between items-center shadow-md h-6 w-24 bg-[#29323C] text-[#00FF00] font-black  border-none absolute bottom-[13rem] left-64 cursor-pointer">
                        <h1 className="text-[#FF0000] font-bold  mr-1">  LODING</h1>
                        <h1 className='text-[#FFFF00] bg-gray-900 rounded-full text-center p-[5px]'>🚛</h1>
                    </div>
                    </>
                )}
    </div>

    )
}

export default TrailerTable
    
    
    
    