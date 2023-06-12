import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import MapSelect from "~/components/Filters/MapSelect";
import type { Dmrv } from "~/types/dmrv";
import type { ValueProps } from "~/types/select";
import TrackingSlider from "./TrackingSlider";
import { ChevronLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { MapButton } from "~/components/Buttons/ActionButton";
import TrackingModal from "./TrackingModal";

export enum TrackingIndicator {
    NDVI = "ndvi",
    RGB = "rgb"
}

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
    const [isOpen, setIsOpen] = useState<boolean>(false);


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
            case TrackingIndicator.NDVI:
                source.updateImage({url: ndvis[selectedImageIndex].image});
                break;
            case TrackingIndicator.RGB:
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
                <div className="text-neutral-100">
                    <p className="mt-2">
                        We're excited to release the Beta version of our digital Monitoring feature. Utilizing satellite imagery and artificial intelligence, this innovative tool offers real-time data and sophisticated analysis on the performance and evolution of carbon removal projects.
                        Through the implementation of this feature (dMRV), our aim is to enhance the integrity and accountability of carbon removal initiatives. Our collaboration with independent third-party providers ensures precision and transparency, maintaining an unbiased approach.
                    </p>
                    <p className="mt-2">Please note, as a Beta feature, digital Monitoring is a work in progress. It represents our commitment to constant improvement and evolution, as we refine this solution to optimally serve our clients and the environment. Our objective is to deliver comprehensive tracking and reporting on the carbon sequestration and biodiversity protection across all Carbonable projects.</p>
                    <p className="mt-2">In interpreting the data, it's important to consider the effects of seasonal changes on vegetation and leaf growth. Year-on-year comparisons typically provide a more accurate view of carbon removal dynamics than month-to-month comparisons. Given that weather conditions can significantly vary from year to year, examining broader trends, rather than strict comparisons, is key to a robust understanding of these dynamics.</p>
                    <p className="mt-2">Also, when it comes to monitoring Blue Carbon Projects - initiatives that focus on carbon sequestration in coastal ecosystems such as mangroves, salt marshes, and seagrass meadows - current metrics might not be as directly applicable due to their tidal nature. Vegetation and water levels can fluctuate dramatically throughout the day  affecting considerably the indicator readings. </p>
                </div>
            
                <div ref={mapContainer} className="mapContainer w-full mt-8">
                    <div className="absolute top-4 left-4 w-fit z-10">
                        { selectedIndicator !== undefined && <MapSelect values={selectIndicators} selectedValue={selectedIndicator} setSelectedValue={setSelectedIndicator} /> }
                    </div>
                    <div className="absolute top-4 right-4 w-fit z-10">
                        { selectedIndicator !== undefined && <MapButton className="flex flex-nowrap justify-center items-center" onClick={() => setIsOpen(true)}>Learn More <QuestionMarkCircleIcon className="w-5 ml-2" /></MapButton> }
                    </div>
                    {mapLoaded && <div className="absolute bottom-0 left-0 w-full z-10">
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
            <TrackingModal isOpen={isOpen} setIsOpen={setIsOpen} indicator={selectedIndicator} />
        </>
       
    )
}