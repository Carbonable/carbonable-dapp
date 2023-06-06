import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import MapSelect from "~/components/Filters/MapSelect";
import type { Dmrv } from "~/types/dmrv";
import type { ValueProps } from "~/types/select";
import TrackingSlider from "./TrackingSlider";

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
    const [selectedImageIndex, setSelectedImageIndex] = useState<string>((ndvis.length - 1).toString());

    const updatelayer = () => {
        const source = map.current?.getSource('data-viz') as mapboxgl.ImageSource;
        if (source === undefined) return;

        switch (selectedIndicator?.id) {
            case "ndvi":
                source.updateImage({url: ndvis[parseInt(selectedImageIndex)].image});
                break;
            case "rgb":
                source.updateImage({url: rgbs[parseInt(selectedImageIndex)].url});
                break;
            default:
                break;
        }
    }

    const handleChange = (event: any) => {
        if (isNaN(event.target.value)) return;

        setSelectedImageIndex(event.target.value);
    }

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
                source.updateImage({url: ndvis[parseInt(selectedImageIndex)].image});
                break;
            case "rgb":
                source.updateImage({url: rgbs[parseInt(selectedImageIndex)].url});
                break;
            default:
                break;
        }
    }, [selectedIndicator]);


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
                'url': ndvis[parseInt(selectedImageIndex)].image,
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
            <div ref={mapContainer} className="mapContainer w-full">
                <div className="absolute top-4 left-4 w-fit z-50">
                    { selectedIndicator !== undefined && <MapSelect values={selectIndicators} selectedValue={selectedIndicator} setSelectedValue={setSelectedIndicator} /> }
                </div>
                <div className="absolute bottom-0 left-0 w-full z-50">
                    <TrackingSlider />
                </div>
            </div>
        </>
    )
}