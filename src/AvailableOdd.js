import React, { useDeferredValue, useEffect, useState } from "react";
import { updateMap } from "kepler.gl/actions";
import { useDispatch } from "react-redux";
import {AvailableOddContext } from "./Context/AvailableOddContext";


const DataTable = ({VehicaleData, setShow}) => {
  const dispatch = useDispatch();
  const set = new Set([0, 1, 3, 14, 15, 17, 18])

  const proccessedFieldData = (Data) => {
    if(Data && Data.length > 0){
        return [
          ...Data.filter((val, index) => set.has(index))
        ]
    }

    return []
  }

  const proccessedRowsData = (Data) => {
    if(Data && Data.length > 0){
        const filteredRows = Data.map((rowData, rowindex) => {
            return rowData.filter((val, index) => set.has(index))
        })

        return [...filteredRows]
    }

    return []
  }
  const [fields, setFields] = useState(proccessedFieldData(VehicaleData.fields))
  const [Rows, setRow] = useState(proccessedRowsData(VehicaleData.rows))
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const onHandleFilter = () => {
      const searchDataResult = Rows.filter((val, index) => {
        return `${val.join(" ")}`.toLowerCase().includes(deferredSearch.toLowerCase())
      });
      setFilteredData(searchDataResult)
  }

  useEffect(()=> {
    onHandleFilter()
  }, [deferredSearch])


  
  const RenderRowsOnTable = (RowDataOnTable) => {
      const SplitDataTo = RowDataOnTable.slice(0, 100);
      return SplitDataTo.length > 0 && SplitDataTo.map((val, index) => {
        return (
          <tr className="border-b">
            {val.map((Data, index) => {
              
              return <td className="text-sm px-5 border-x-2 text-center py-2">{Data}</td>;

            })}
            <td
                className="cursor-pointer  text-black"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
                onClick={() => {
                  dispatch(
                    updateMap({
                      latitude: val[0] ? val[0] : 0,
                      longitude: val[1] ? val[1] : 0,
                      width: 800,
                      height: 1200,
                      zoom: 18,
                    })
                  );
                  setShow((pre) => !pre)
                }}
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>

            </td>
          </tr>
        );
      })
  }

  return (
    <>

    <div className="h-14 flex items-center text-sm font-bold justify-between px-5 bg-[#29323C] rounded-tl-xl text-white sticky top-0">
        <div className="text-[15px]">
          Vehical DataTable
        </div>
        <div className="flex items-center">
          <input className="mx-2 p-2 px-4 rounded-xl shadow-xl font-normal text-black" 
            placeholder="Enter Vehical Name"
            onChange={(e)=> {
                const value = e.target.value;
                setSearch(value)
            }} />
          <div onClick={()=> setShow((pre) => !pre)} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </div>
        </div>

    </div>
    <table className="rounded-xl">
      <thead className="sticky top-[10.2%] shadow-xl bg-white">
        <tr className="border">
          {fields.length > 0 &&
            fields.map((val, index) => {
              return <th className="text-sm px-5 py-1 border-x">{val.name}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? RenderRowsOnTable(filteredData) : RenderRowsOnTable(Rows)}
      </tbody>
    </table>
    </>
  );
};
function AvailableOdd(propsNew) {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute top-3 right-3 z-50 bg-white w-[75%] rounded-xl">
      
      {
        show ? (<div className="w-full h-[550px] overflow-auto rounded-xl"><DataTable {...propsNew} setShow={setShow} /></div>) : (
          <div onClick={()=> setShow((pre) => !pre)} className="flex justify-center items-center shadow-md h-8 w-8 bg-[#29323C] text-[#6A7485] text-sm border-none absolute top-0 right-10 cursor-pointer">
            AO
          </div>
        ) 
      }
    </div>
  );
}

export default AvailableOdd;