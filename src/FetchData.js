import React, { useDeferredValue, useEffect, useState } from "react";
import { updateMap } from "kepler.gl/actions";
import { useDispatch } from "react-redux";
import Select from 'react-select';

const DataTable = ({VehicaleData, setShow}) => {
  const dispatch = useDispatch();
  const set = new Set([3, 2, 15,0,1])
  //'At delivery', 'At pickup', 'Enroute for delivery', 'Empty Run', 'Available','MXL','SXL'
  const tableData = [

    {label: "At delivery", value:"At delivery" },
    {label: "At pickup", value: "At pickup" },
    {label: "INTRANSIT", value: "INTRANSIT" },
    {label: "UNLOADING", value: "UNLOADING" },
    {label: "EMPTY RUN", value: "EMPTY RUN" },
    {label: "LOADING", value: "LOADING" },
    {label: "AVAILABLE", value: "AVAILABLE" },
    {label: "AVAILABLE HUB", value: "AVAILABLE HUB" },
    {label: "MAINTENANCE", value: "MAINTENANCE" },
    {label: "OFF DUTY", value: "OFF DUTY" }
  ];

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
  const [fields, setFields] = useState(["Destination","Status", "VNumber","Type","GM"])
  const [Rows, setRow] = useState(proccessedRowsData(VehicaleData.rows))
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const onHandleFilter = () => {
      const searchDataResult = VehicaleData.filter((val, index) => {
        return val.search().toLowerCase().includes(deferredSearch.toLowerCase())
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
            
            <td
                className="cursor-pointer font-bold border-[#FFA500] border-2  text-[#16FF00]"
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
            {val.map((Data, index) => {
              return <td className="text-sm px-5 font-bold border-2 border-[#FFA500] text-[#FF00FF] text-center py-2">{Data}</td>;
            })}
          </tr>
        );
      })
  }

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#000",
      backgroundColor: state.isSelected ? "#00FF00" : "#00FF00",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "white",
      color: "#212529",
      padding: "1px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <>

    <div className="h-14 flex items-center text-sm font-bold justify-between px-5 bg-[#29323C] rounded-tl-xl text-white sticky top-0">
        <div className="text-[15px] text-[#7BFF00]">
        SCREEN
        </div>
        <div className="flex items-center ">
          {/* <input className="mx-2 p-2 px-4 rounded-xl shadow-xl font-normal text-black" 
            list="datalistId"
            placeholder="Enter Vehical Name"
            onChange={(e)=> {
                const value = e.target.value;
                setSearch(e.target.value)
            }} /> */}

          <Select
              
              isMulti
              name="Screen Data"
              options={tableData}
              className="basic-multi-select"
              styles={customStyles}
              onChange={(e)=> {
                setSearch(e[0].label)
              }}
          />
          <datalist id="datalistId">
            {tableData.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
          <div onClick={()=> setShow((pre) => !pre)} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </div>
        </div>

    </div>
    <table className="rounded-xl bg-black bg-opacity-70">
      <thead className="sticky top-[10.2%] shadow-xl bg-white">
        <tr className="border-2  bg-[#FF0000] border-[#00FF00]">
          {/* <th className="border-2 border-[#00FF00]"> Map </th> */}
          {fields.length > 0 &&
            fields.map((val, index) => {
              return <th className="text-sm px-5 py-1 border-[#00FF00] border-2">{val}</th>;
            })}
        </tr>
      </thead>
      <tbody className="">
        {/* {filteredData.length > 0 ? RenderRowsOnTable(filteredData) : RenderRowsOnTable(Rows)} */}
        {
        filteredData && filteredData.length > 0 ? (filteredData.map((vData,i)=>{
          return(
            vData.react()
          )
        })) : (VehicaleData.map((vData,i)=>{
          return(
            vData.react()
          )
        }))
        }
      </tbody>
    </table>
    </>
  );
};

function VehicalDataTable(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute top-3 right-3  z-50 w-[75%] rounded-xl absolute">
      
      {
        show ? (<div className="w-full h-[550px] overflow-auto rounded-xl "><DataTable {...props} setShow={setShow} /></div>) : (
          <div onClick={()=> setShow((pre) => !pre)} className="flex justify-center items-center shadow-md h-8 w-8 bg-[#29323C] text-[#6A7485] text-sm border-none absolute top-10 right-10 cursor-pointer">
            OD
          </div>
        ) 
      }
    </div>
  );
}

export default VehicalDataTable;