import React, { useDeferredValue, useEffect, useState } from "react";
import Select from 'react-select';

const DataTable = ({ VehicaleData, setShow, TotalEmpty }) => {
  const tableData = [
    { label: "At delivery", value: "At delivery" },
    { label: "At pickup", value: "At pickup" },
    { label: "INTRANSIT", value: "INTRANSIT" },
    { label: "UNLOADING", value: "UNLOADING" },
    { label: "EMPTY RUN", value: "EMPTY RUN" },
    { label: "LOADING", value: "LOADING" },
    { label: "AVAILABLE", value: "AVAILABLE" },
    { label: "AVAILABLE HUB", value: "AVAILABLE HUB" },
    { label: "MAINTENANCE", value: "MAINTENANCE" },
    { label: "OFF DUTY", value: "OFF DUTY" }
  ];

  const [fields, setFields] = useState(["VNumber","Status", "Destination", "Arrive IN", "GM", "Reson", "Type"])
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const onHandleFilter = () => {
    const searchDataResult = VehicaleData.filter((val, index) => {
      return val.search().toLowerCase().includes(deferredSearch.toLowerCase())
    });
    setFilteredData(searchDataResult)
  }

  useEffect(() => {
    onHandleFilter()
  }, [deferredSearch])

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
      width: "20rem"
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div className="w-full">

      <div className="h-14 w-full flex items-center text-sm font-bold justify-between px-5 bg-[#29323C] rounded-tl-xl text-white sticky top-0">
        <div className="text-[15px] text-[#7BFF00] ">
          VEHICLE ISSUE EMPTY RUN  (  {`${((VehicaleData.length / TotalEmpty) * 100).toFixed(0)}%`} )
        </div>
        <div className="flex items-center ">
          <Select

            isMulti
            name="Screen Data"
            options={tableData}
            className="basic-multi-select"
            styles={customStyles}
            onChange={(e) => {
              setSearch(e[0].label)
            }}
          />

          <div onClick={() => setShow((pre) => !pre)} className="cursor-pointer ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </div>
        </div>

      </div>
      <table className="rounded-xl w-full bg-black bg-opacity-70">
        <thead className="sticky top-[10.1%] shadow-xl bg-white">
          <tr className="border-2 w-full bg-[#FF0000] border-[#00FF00]">
            {fields.length > 0 &&
              fields.map((val, index) => {
                return <th className="text-sm px-5 py-1 border-[#00FF00] border-2">{val}</th>;
              })}
          </tr>
        </thead>
        <tbody className="text-white">

          {
            filteredData.map((vData, i) => {
              return (
                vData.react()
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

function EmptyVehicle(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute top-3 right-3  z-50 w-[75%] rounded-xl absolute">

      {
        show ? (<div className="w-full h-[550px] overflow-auto rounded-xl "><DataTable {...props} setShow={setShow} /></div>) : (
          <div onClick={() => setShow((pre) => !pre)} className="flex flex-cols-1 justify-center items-center shadow-md h-8 w-20 bg-[#29323C] text-[#00FF00] font-bold text-sm border-none absolute top-10 right-10 cursor-pointer">
            <h1 className="text-[#FF0000] font-normal">EMPT</h1>
            {/* {`${((VehicaleData.length / TotalEmpty) * 100).toFixed(0)}%`} */}
          </div>
        )
      }
    </div>
  );
}

export default EmptyVehicle;