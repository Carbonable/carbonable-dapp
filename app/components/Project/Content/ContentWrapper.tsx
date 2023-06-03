import { LinkSecondary } from "~/components/Buttons/LinkButton";
import { urlFor } from "~/utils/sanity/image";
import type { SanityContent } from "~/utils/sanity/types";
import ImageGallery from "./ImagesGallery";
import Reports from "./Reports";
import Section from "./SectionWrapper";
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from "react";
import type { Dmrv } from "~/types/dmrv";
import MapSelect from "~/components/Filters/MapSelect";
import type { ValueProps } from "~/types/select";

export default function ContentWrapper({content, mapboxKey, dmrv}: {content: SanityContent, mapboxKey: string, dmrv: Dmrv}) {
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
            center: [bounds[0][1], bounds[1][0]],
            fitBoundsOptions: { padding: {top: 20, bottom: 10, left: 20, right: 20}}
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
            ]);

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
        <div className="mb-20">
            <div className="font-inter font-bold text-neutral-100 text-lg uppercase flex flex-wrap items-center pb-2">
                <div>
                    🔍 <span className="ml-2">Project overview</span>
                </div>
                <div className="hidden md:block mx-6 font-thin text-2xl mt-[-4px] text-neutral-500">|</div>
                { content.mediumArticle !== undefined && <div className="mt-4 mr-8 md:mt-0 md:mr-2">
                    <LinkSecondary  href={content.mediumArticle}>Our medium article</LinkSecondary>
                </div>
                }   
                { content.dueDiligence !== undefined && <div className="mt-4 md:mt-0">
                    <LinkSecondary href={content.dueDiligence}>Due diligence</LinkSecondary>
                </div>
                }
            </div>
            { content.projectOverview && content.projectOverview.sections.length > 0 && content.projectOverview.sections.map((section, index) => (
                <Section key={`section_${index}`} section={section}></Section>
            ))}
            <div className="font-inter font-bold text-neutral-100 text-lg mt-12 flex items-center">
                🌱 <span className="ml-2 uppercase">Tracking</span>
                <span className="px-3 py-1 ml-3 bg-beta-button text-xs rounded-md font-light">Beta version</span>
            </div>
            <div className="mt-4 pt-8 border-t border-neutral-500">
                <div ref={mapContainer} className="mapContainer w-full">
                    <div className="absolute top-4 left-4 w-fit z-50">
                        { selectedIndicator !== undefined && <MapSelect values={selectIndicators} selectedValue={selectedIndicator} setSelectedValue={setSelectedIndicator} /> }
                    </div>                
                </div>
                Type a number between 0 and {ndvis.length - 1} to update the layer
                <input value={selectedImageIndex} className="w-full mt-4 text-neutral-900" onChange={handleChange} />
                <button className="mt-4 w-full bg-beta-button text-neutral-50 py-2 rounded-md font-inter font-bold" onClick={updatelayer}>Update layer</button>
            </div>
            { (content.imagesGallery?.length > 0 || content.reports?.length > 0) && <div className="font-inter font-bold text-neutral-100 text-lg uppercase mt-12">✨ <span className="ml-2">Impact</span></div>}
            { content.imagesGallery?.length > 0 && <div className="mt-4 pt-8 border-t border-neutral-500">
                <div className="font-inter font-bold text-neutral-300 uppercase">Images gallery</div>
                <div className="mt-4">
                    <ImageGallery gallery={content.imagesGallery} />
                </div>
            </div>
            }
            { content.reports?.length > 0 && <div className="mt-4 pt-8 border-t border-neutral-500">
                <div className="font-inter font-bold text-neutral-300 uppercase">Impacts reports</div>
                <div className="mt-4">
                    <Reports reports={content.reports} />
                </div>
            </div>
            }
            <div className="w-full border border-neutral-500 text-center py-16 mt-20 rounded-3xl font-inter">
                <div className="text-neutral-300 text-lg">Proudly certified by</div>
                <img src={urlFor(content.certifier.logo).width(500).url()} alt="Certifier logo" className="mx-auto" />
                <a className="text-neutral-300 text-xl cursor-pointer hover:text-neutral-200" href={content.certifier.link} target="_blank" rel="noreferrer">{content.certifier.link}</a>
            </div>
        </div>
    )
}