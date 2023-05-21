import React, { useEffect, useState } from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap, updateMap, VisStateActions } from "kepler.gl/actions";
import useSwr from "swr";
import VehicalDataTable from "./VehicalDataTable";

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

function Map() {
  const dispatch = useDispatch();
  const { data } = useSwr("MAP", async () => {
    const dataMain = [];
    // JK TYRE
    const response = await fetch(
      "https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=gGgIPxcjEBlaKXzzQc6VFS3RmmKhp-Dol4jztZEamb91RSHK9ZWb5nQI6oipvVrceIlBcF3Z35-QzV8QQUYxiwM-UvZ_EnW_OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzIkCT1C4m3Pe3HxqsuikSOeAPUnsrS0vluQ2Uby7DG2Y3vuSLosqIfTdUiHxE9km8JpftAgXPfm9wqKhLKJUXmgUB1GrB9O3RCv3JOdKRfXuA&lib=MgTvtBGCTtK-aqrbE1lqq1bLLe_nYFSPD"
    );
    const data = await response.json();
    const newData = {
      fields: [
        { name: "Sl No.", format: "", type: "real" },
        { name: "Dealership Name", format: "", type: "string" },
        { name: "Zone", format: "", type: "string" },
        { name: "Address Line1", format: "", type: "string" },
        { name: "Latitude and longitude", format: "", type: "string" },
        { name: "lat", format: "", type: "real" },
        { name: "lon", format: "", type: "real" },
        { name: "polygon", format: "", type: "string" },
        { name: "icon", format: "", type: "string" },
      ],
      rows: data.fields,
    };

    // TOLL
    const response2 = await fetch(
      "https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=gmlwNpYg9cN01pRJZkfRlcP_1eqCtUjpJBvgZxehbgCs0gP-vMr5Eb3Wo35wSOYbU_KEXxPfbkre_U_WOdVZ7DkZDFcwJUlhOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzIzUcc0q3-TMNFnZJSXqW6mgraOtUqihibRo_HJeu0O54ZsSaMXzr1cIPapngRiJYYEHmFCFVpMYLopjiEHrbjimXkPq5_15mTPoWyzxpfA9w&lib=MmI5wSdFmX4YMwd45GewwobLLe_nYFSPD"
    );
    const data2 = await response2.json();
    const newData2 = {
      fields: [
        { name: "LAT", format: "", type: "real" },
        { name: "LON", format: "", type: "string" },
        { name: "toll name", format: "", type: "string" },
        { name: "icon ", format: "", type: "string" },
      ],
      rows: data2.data,
    };

    // VEHICLE

    const response3 = await fetch(
      "https://script.google.com/macros/s/AKfycbw8Lz1tD_ar-Fa9irk8RhZxWIc8urdB7QyBigErWpX5exsSgLdgg_kPI10lYBSXzyr8/exec"
    );
    const data3 = await response3.json();

    const newData3 = {
      fields: [
        { name: "LAT", format: "", type: "string" },
        { name: "LON", format: "", type: "string" },
        { name: "icon", format: "", type: "string" },
        { name: "Vname ", format: "", type: "string" },
        { name: "Dttime", format: "", type: "string" },
        { name: "Speed", format: "", type: "string" },
        { name: "Odo", format: "", type: "string" },
        { name: "Angle", format: "", type: "string" },
        { name: "Ignition", format: "", type: "string" },
        { name: "Batlevel ", format: "", type: "string" },
        { name: "Location", format: "", type: "string" },
        { name: "Haltinghours", format: "", type: "string" },
        { name: "Lat-Lngt", format: "", type: "string" },
        { name: "Halt/Running ", format: "", type: "string" },
        { name: "VEHICLE TYPE", format: "", type: "string" },
        { name: "GAADI MALIK", format: "", type: "string" },
        { name: "ROUTE ", format: "", type: "string" },
        { name: "status ", format: "", type: "string" },
        { name: "VT ", format: "", type: "string" },
        { name: "latd ", format: "", type: "string" },
        { name: "lond", format: "", type: "string" },
      ],
      rows: data3.data,
    };

 

    // branch
    const response4 = await fetch(
      "https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=-leOnDhCzDiH7cp16YoPHn1ATj42pQys2s_HzYzF-h7P-9Pz0xDeEazv-5akCg4uMWIk2y1pJXahhaNRFE7-9RpzjK5AXF3COJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzJXoFFnRBLEn5qlD60My1U7FwUQwBDfl8spceukbWTFZQJeJmFZJvEyLReoJnAAtfrPvgXAAEU5tQJzMcwQzXoIfp5DtHnGESHNeXgmLLIU4g&lib=MSXPsUDFHcyUQDHE2QNy1JbLLe_nYFSPD"
    );
    const data4 = await response4.json();
    const newData4 = {
      fields: [
        { name: "Coordinate", format: "", type: "string" },
        { name: "lat", format: "", type: "string" },
        { name: "lon", format: "", type: "string" },
        { name: " ", format: "", type: "string" },
        { name: " ", format: "", type: "string" },
        { name: " ", format: "", type: "string" },
        { name: "pop up", format: "", type: "string" },
        { name: "brn", format: "", type: "string" },
        { name: "1ASs", format: "", type: "string" },
      ],
      rows: data4.fields,
    };

    // Borders APML
    const response5 = await fetch(
      "https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=kuExC_Mgivbd-ghoHtiC-JdSoOOjoOKxxuWJrzQIL2wrpYF2S9kCYol2-1YKMd71BmQgjIAFN_AsemEijkUhO5HfqEmrf0gdOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzKA-1HpqlMFv8VZImoBzGQQ7e-MCTKqmNzAQeI5XOkQGdg_Kt3wptxxTR8ju5VFZHQujetzLf1eyl-DeJpXMtf6dgFiF9wYKc68mzDTCqnGIg&lib=MB_kQ8NCDAKTdyWJAm0EuPoDBSEx397KY"
    );
    const data5 = await response5.json();
    const newData5 = {
      fields: [
        { name: "BORDER NAME", format: "", type: "string" },
        { name: "AGENT NAME", format: "", type: "string" },
        { name: "NUMBER", format: "", type: "string" },
        { name: "", format: "", type: "string" },
        { name: "", format: "", type: "string" },
        { name: "LL", format: "", type: "string" },
        { name: "latitude", format: "", type: "string" },
        { name: "longtitude", format: "", type: "string" },
        { name: "IN", format: "", type: "string" },
        { name: "OUT", format: "", type: "string" },
        { name: "a", format: "", type: "string" },
        { name: "in lat", format: "longtitude", type: "string" },
        { name: "out lat", format: "", type: "string" },
        { name: "icon", format: "", type: "string" },
      ],
      rows: data5.fields,
    };

    dataMain.push(newData, newData2, newData3, newData4, newData5);
    console.log(dataMain);
    return dataMain;
  });
  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: [
            {
              info: {
                label: "JK Tyre",
                id: "data_1",
              },
              data: data[0],
            },
            {
              info: {
                label: "TOll",
                id: "data_2",
              },
              data: data[1],
            },
            {
              info: {
                label: "VEHICLE",
                id: "data_3",
              },
              data: data[2],
            },
            {
              info: {
                label: "Branch",
                id: "data_4",
              },
              data: data[3],
            },
            {
              info: {
                label: "Broder",
                id: "data_5",
              },
              data: data[4],
            },
          ],
          option: {
            centerMap: true,
            readOnly: false,
          },
          // config: {}
          config: {
            visState: {
              filters: [],
              layers: [
                {
                  id: "8ozfk64",
                  type: "icon",
                  config: {
                    dataId: "data_2",
                    label: "TOll",
                    color: [255, 254, 230],
                    highlightColor: [252, 242, 26, 255],
                    columns: {
                      lat: "LAT",
                      lng: "LON",
                      altitude: null,
                      icon: "icon ",
                    },
                    isVisible: true,
                    visConfig: {
                      radius: 42.2,
                      fixedRadius: false,
                      opacity: 0.8,
                      colorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      radiusRange: [0, 50],
                    },
                    hidden: false,
                    textLabel: [
                      {
                        field: null,
                        color: [255, 255, 255],
                        size: 18,
                        offset: [0, 0],
                        anchor: "start",
                        alignment: "center",
                      },
                    ],
                  },
                  visualChannels: {
                    colorField: null,
                    colorScale: "quantile",
                    sizeField: null,
                    sizeScale: "linear",
                  },
                },

                {
                  id: "jp8hts",
                  type: "icon",
                  config: {
                    dataId: "data_1",
                    label: "JK Tyre",
                    color: [19, 164, 171],
                    highlightColor: [252, 242, 26, 255],
                    columns: {
                      lat: "lat",
                      lng: "lon",
                      icon: "icon",
                      altitude: null,
                    },
                    isVisible: true,
                    visConfig: {
                      radius: 26.6,
                      fixedRadius: false,
                      opacity: 0.8,
                      colorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      radiusRange: [0, 50],
                    },
                    hidden: false,
                    textLabel: [
                      {
                        field: null,
                        color: [255, 255, 255],
                        size: 18,
                        offset: [0, 0],
                        anchor: "start",
                        alignment: "center",
                      },
                    ],
                  },
                  visualChannels: {
                    colorField: null,
                    colorScale: "quantile",
                    sizeField: null,
                    sizeScale: "linear",
                  },
                },
                {
                  id: "sdtocxq",
                  type: "geojson",
                  config: {
                    dataId: "data_4",
                    label: "Branch",
                    color: [253, 236, 0],
                    highlightColor: [252, 242, 26, 255],
                    columns: {
                      geojson: "1ASs",
                    },
                    isVisible: false,
                    visConfig: {
                      opacity: 0.01,
                      strokeOpacity: 1,
                      thickness: 0.5,
                      strokeColor: [197, 21, 74],
                      colorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      strokeColorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      radius: 10,
                      sizeRange: [0, 10],
                      radiusRange: [0, 50],
                      heightRange: [0, 500],
                      elevationScale: 39.6,
                      enableElevationZoomFactor: true,
                      stroked: false,
                      filled: true,
                      enable3d: true,
                      wireframe: false,
                    },
                    hidden: false,
                    textLabel: [
                      {
                        field: null,
                        color: [255, 255, 255],
                        size: 18,
                        offset: [0, 0],
                        anchor: "start",
                        alignment: "center",
                      },
                    ],
                  },
                  visualChannels: {
                    colorField: {
                      name: "lat",
                      type: "real",
                    },
                    colorScale: "quantile",
                    strokeColorField: null,
                    strokeColorScale: "quantile",
                    sizeField: null,
                    sizeScale: "linear",
                    heightField: null,
                    heightScale: "linear",
                    radiusField: null,
                    radiusScale: "linear",
                  },
                },
                {
                  id: "t0tstvj",
                  type: "icon",
                  config: {
                    dataId: "data_5",
                    label: "Broder",
                    color: [210, 0, 0],
                    highlightColor: [252, 242, 26, 255],
                    columns: {
                      lat: "latitude",
                      lng: "longtitude",
                      icon: "icon",
                      altitude: null,
                    },
                    isVisible: true,
                    visConfig: {
                      radius: 26.6,
                      fixedRadius: false,
                      opacity: 1,
                      colorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      radiusRange: [0, 50],
                    },
                    hidden: false,
                    textLabel: [
                      {
                        field: null,
                        color: [255, 255, 255],
                        size: 18,
                        offset: [0, 0],
                        anchor: "start",
                        alignment: "center",
                      },
                    ],
                  },
                  visualChannels: {
                    colorField: null,
                    colorScale: "quantile",
                    sizeField: null,
                    sizeScale: "linear",
                  },
                },
                {
                  id: "iza6pd",
                  type: "icon",
                  config: {
                    dataId: "data_3",
                    label: "VEHICLE2",
                    color: [248, 149, 112],
                    highlightColor: [252, 242, 26, 255],
                    columns: {
                      lat: "LAT",
                      lng: "LON",
                      icon: "icon",
                      altitude: null,
                    },
                    isVisible: true,
                    visConfig: {
                      radius: 2,
                      fixedRadius: false,
                      opacity: 0.8,
                      colorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      radiusRange: [0, 24.1],
                    },
                    hidden: false,
                    textLabel: [
                      {
                        field: {
                          name: "VEHICLE TYPE",
                          type: "string",
                        },
                        color: [255, 255, 255],
                        size: 15,
                        offset: [0, 0],
                        anchor: "end",
                        alignment: "center",
                      },
                      {
                        field: {
                          name: "Vname",
                          type: "string",
                        },
                        color: [255, 255, 255],
                        size: 17,
                        offset: [0, 0],
                        anchor: "start",
                        alignment: "center",
                      },
                    ],
                  },
                  visualChannels: {
                    colorField: {
                      name: "VEHICLE TYPE",
                      type: "string",
                    },
                    colorScale: "ordinal",
                    sizeField: null,
                    sizeScale: "linear",
                  },
                },
                {
                  id: "9fcecn5",
                  type: "grid",
                  config: {
                    dataId: "data_3",
                    label: "VEHICLE",
                    color: [248, 149, 112],
                    highlightColor: [252, 242, 26, 255],
                    columns: {
                      lat: "LAT",
                      lng: "LON",
                    },
                    isVisible: true,
                    visConfig: {
                      opacity: 0.8,
                      worldUnitSize: 0.001,
                      colorRange: {
                        name: "Global Warming",
                        type: "sequential",
                        category: "Uber",
                        colors: [
                          "#5A1846",
                          "#900C3F",
                          "#C70039",
                          "#E3611C",
                          "#F1920E",
                          "#FFC300",
                        ],
                      },
                      coverage: 1,
                      sizeRange: [0, 500],
                      percentile: [0, 100],
                      elevationPercentile: [0, 100],
                      elevationScale: 5.8,
                      enableElevationZoomFactor: true,
                      colorAggregation: "average",
                      sizeAggregation: "average",
                      enable3d: true,
                    },
                    hidden: false,
                    textLabel: [
                      {
                        field: null,
                        color: [255, 255, 255],
                        size: 18,
                        offset: [0, 0],
                        anchor: "start",
                        alignment: "center",
                      },
                    ],
                  },
                  visualChannels: {
                    colorField: {
                      name: "Haltinghours",
                      type: "integer",
                    },
                    colorScale: "quantile",
                    sizeField: {
                      name: "Haltinghours",
                      type: "integer",
                    },
                    sizeScale: "linear",
                  },
                },
              ],
              interactionConfig: {
                tooltip: {
                  fieldsToShow: {
                    tp74d5uko: [
                      {
                        name: "BORDER NAME",
                        format: null,
                      },
                      {
                        name: "AGENT NAME",
                        format: null,
                      },
                      {
                        name: "NUMBER",
                        format: null,
                      },
                    ],
                    zm187nrdw: [
                      {
                        name: "brn",
                        format: null,
                      },
                      {
                        name: "pop up",
                        format: null,
                      },
                    ],
                    vi1vb53ql: [
                      {
                        name: "Sl No.",
                        format: null,
                      },
                      {
                        name: "Dealership Name",
                        format: null,
                      },
                      {
                        name: "Zone",
                        format: null,
                      },
                      {
                        name: "Address Line1",
                        format: null,
                      },
                      {
                        name: "icon",
                        format: null,
                      },
                    ],
                    qswvmwjeq: [
                      {
                        name: "Vname",
                        format: null,
                      },
                      {
                        name: "Dttime",
                        format: null,
                      },
                      {
                        name: "VEHICLE TYPE",
                        format: null,
                      },
                      {
                        name: "GAADI MALIK",
                        format: null,
                      },
                      {
                        name: "ROUTE",
                        format: null,
                      },
                      {
                        name: "status",
                        format: null,
                      },
                      {
                        name: "Haltinghours",
                        format: null,
                      },
                    ],
                    "3hj5ri1z": [
                      {
                        name: "toll name",
                        format: null,
                      },
                    ],
                  },
                  compareMode: false,
                  compareType: "absolute",
                  enabled: true,
                },
                brush: {
                  size: 0.5,
                  enabled: false,
                },
                geocoder: {
                  enabled: false,
                },
                coordinate: {
                  enabled: false,
                },
              },
              layerBlending: "normal",
              splitMaps: [],
              mapClick: (e) => {
                console.log("Click ", e)
              },
              animationConfig: {
                currentTime: null,
                speed: 1,
              },
            },

            mapState: {
              bearing: 0,
              dragRotate: false,
              latitude: 19.0815865402256,
              longitude: 72.9217529296875,
              pitch: 0,
              zoom: 10.760487464831026,
              isSplit: false,
            },
            mapStyle: {
              styleType: "dark",
              topLayerGroups: {},
              visibleLayerGroups: {
                label: true,
                road: true,
                border: false,
                building: true,
                water: true,
                land: true,
                "3d building": false,
              },
              threeDBuildingColor: [
                9.665468314072013, 17.18305478057247, 31.1442867897876,
              ],
              mapStyles: {},
            },
          },
        })
      );
    }
  }, [dispatch, data]);

  const [VehicaleData,setVehicaleData]=useState({})
  const FetchVehicaleData = async()=>{
    const response3 = await fetch(
      "https://script.google.com/macros/s/AKfycbw8Lz1tD_ar-Fa9irk8RhZxWIc8urdB7QyBigErWpX5exsSgLdgg_kPI10lYBSXzyr8/exec"
    );
    const data3 = await response3.json();

    const newData3 = {
      fields: [
        { name: "LAT", format: "", type: "string" },
        { name: "LON", format: "", type: "string" },
        { name: "icon", format: "", type: "string" },
        { name: "Vname ", format: "", type: "string" },
        { name: "Dttime", format: "", type: "string" },
        { name: "Speed", format: "", type: "string" },
        { name: "Odo", format: "", type: "string" },
        { name: "Angle", format: "", type: "string" },
        { name: "Ignition", format: "", type: "string" },
        { name: "Batlevel ", format: "", type: "string" },
        { name: "Location", format: "", type: "string" },
        { name: "Haltinghours", format: "", type: "string" },
        { name: "Lat-Lngt", format: "", type: "string" },
        { name: "Halt/Running ", format: "", type: "string" },
        { name: "VEHICLE TYPE", format: "", type: "string" },
        { name: "GAADI MALIK", format: "", type: "string" },
        { name: "ROUTE ", format: "", type: "string" },
        { name: "status ", format: "", type: "string" },
        { name: "VT ", format: "", type: "string" },
        { name: "latd ", format: "", type: "string" },
        { name: "lond", format: "", type: "string" },
      ],
      rows: data3.data,
    };
    setVehicaleData(newData3)
  }
  useEffect(()=>{
    FetchVehicaleData()
  },[dispatch, data])
  return (
    <div className="relative">
    {/* <div style={{background: "red", position: "absolute", zIndex: 1000, top: "50%", right: "50%"}} onClick={()=> {
      dispatch(
        updateMap({latitude: 33.87455775, longitude: 75.0440257, width: 800, height: 1200, zoom: 13})
      )
    }}>Click</div> */}
    <KeplerGl
      id="MAP"
      mapboxApiAccessToken={
        "pk.eyJ1IjoicHVuaXRtaXN0cnkiLCJhIjoiY2w4NGFsa3F5MDExeTQxcDVkMzc5dm5seSJ9.z3Y8JC8jThJ1e3R67u18Kg"
      }
      width={window.innerWidth}
      height={window.innerHeight}
    />
    <VehicalDataTable VehicaleData={VehicaleData} />
    </div>
  );
}