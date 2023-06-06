import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import MapSelect from "~/components/Filters/MapSelect";
import type { Dmrv } from "~/types/dmrv";
import type { ValueProps } from "~/types/select";
import TrackingSlider from "./TrackingSlider";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";

export default function Tracking({mapboxKey, dmrv}: {mapboxKey: string, dmrv: Dmrv}) {
    mapboxgl.accessToken = mapboxKey;
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [bounds] = useState<any>(dmrv.bounds);
    const [coordinates] = useState<any>(dmrv.coordinates[0]);
    const [ndvis] = useState<any[]>(dmrv.ndvis);
    const [rgbs] = useState<any[]>(dmrv.rgbs);
    const [selectedIndicator, setSelectedIndicator] = useState<ValueProps | undefined>(undefined);
    const [selectIndicators, setSelectIndicators] = useState<any[]>([]);
    const [mapLoaded, setMapLoaded] = useState<boolean>(true);
    const [selectedDateIndex, setSelectedDateIndex] = useState<number>(dmrv.ndvis.length - 1);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(dmrv.ndvis.length - 1);


    useEffect(() => {
        const selectData = [];
        
        for (const indicator of dmrv.indicators) {
            selectData.push({
                id: indicator,
                name: indicator
            })
        }
        setSelectIndicators(selectData);
        setSelectedIndicator(selectData[0]);
    }, [dmrv.indicators]);

    useEffect(() => {
        if (selectedIndicator === undefined) return;

        const source = map.current?.getSource('data-viz') as mapboxgl.ImageSource;
        if (source === undefined) return;

        switch (selectedIndicator.id) {
            case "ndvi":
                source.updateImage({url: ndvis[selectedImageIndex].image});
                break;
            case "rgb":
                source.updateImage({url: rgbs[selectedImageIndex].url});
                break;
            default:
                break;
        }
    }, [selectedIndicator, selectedImageIndex]);


    useEffect(() => {
        if (map.current) return; // initialize map only once

        // Init the map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [bounds[0][1], bounds[1][0]]
        });

        // Resize the container of the map to fit the parent
        setTimeout(() => {
            if (map.current) {
                map.current.resize();
            }
        }, 50);

        setTimeout(() => {
            setMapLoaded(true);
        }, 5000);

        map.current.on('load', () => {
            if (map.current === null) return;

            map.current.fitBounds([
                [bounds[0][1], bounds[0][0]], // southwestern corner of the bounds
                [bounds[1][1], bounds[1][0]] // northeastern corner of the bounds
            ], { padding: {top: 20, bottom: 90, left: 0, right: 0}});

            // Add a data source to display the delimited project area
            map.current.addSource('delimitation', {
                type: 'geojson',
                data: {
                type: "FeatureCollection",
                features: [
                    {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates: [coordinates],
                    }
                    }
                ]
                }
            });

            map.current.addLayer({
                id: 'outline',
                type: 'line',
                source: 'delimitation',
                layout: {},
                paint: {
                  'line-color': '#000',
                  'line-width': 6
                }
            });

            const longitudes = coordinates.map((point: number[]) => point[0]);
            const latitudes = coordinates.map((point: number[]) => point[1]);
            const maxLon = Math.max(...longitudes);
            const minLon = Math.min(...longitudes);
            const maxLat = Math.max(...latitudes);
            const minLat = Math.min(...latitudes);

            // Add a source for the data viz
            map.current.addSource('data-viz', {
                'type': 'image',
                'url': ndvis[selectedImageIndex].image,
                'coordinates': [
                  [minLon, maxLat],
                  [maxLon, maxLat],
                  [maxLon, minLat],
                  [minLon, minLat],
                ]
              });
        
              map.current.addLayer({
                id: 'layer-layer',
                type: 'raster',
                source: 'data-viz',
                layout: { visibility: 'visible' },
                paint: {
                  'raster-fade-duration': 0
                }
              });
        });
    });

    return (
        <>
            <div className="relative">
                <div ref={mapContainer} className="mapContainer w-full">
                    <div className="absolute top-4 left-4 w-fit z-50">
                        { selectedIndicator !== undefined && <MapSelect values={selectIndicators} selectedValue={selectedIndicator} setSelectedValue={setSelectedIndicator} /> }
                    </div>
                    {mapLoaded && <div className="absolute bottom-0 left-0 w-full z-40">
                        <TrackingSlider data={dmrv.ndvis} setSelectedImageIndex={setSelectedImageIndex} selectedDateIndex={selectedDateIndex} setSelectedDateIndex={setSelectedDateIndex} />
                    </div>}
                </div>
                {mapLoaded && 
                    <div className="absolute bottom-[-12px] w-full z-50">
                        <div className="w-[24px] h-[24px] flex justify-center items-center bg-opacityLight-80 rounded-full mx-auto">
                            <ChevronLeftIcon className="w-[20px] text-neutral-900" />
                            <ChevronRightIcon className="w-[20px]  text-neutral-900" />
                        </div>
                    </div>
                }
            </div>
            {mapLoaded && 
                <div className="w-fit mx-auto mt-6 py-2 pl-3 pr-2 border border-neutral-300 bg-opacityLight-10 rounded-xl text-sm">
                    {moment(ndvis[selectedDateIndex].date).format("MMM. Do YYYY")} <span className="border border-neutral-300 bg-opacityLight-10 rounded-lg py-1 px-2 ml-2 text-xs">🌳 {Math.round(ndvis[selectedDateIndex].value * 100)}%</span>
                </div>
            }
        </>
       
    )
}