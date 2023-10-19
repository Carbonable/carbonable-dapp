import { useEffect } from "react";
import { SVG } from '@svgdotjs/svg.js';

export default function SVGMetadata({svg, id, overrideValues, area, carbonUnits}: {svg: any, id: string, overrideValues?: boolean, area?: string, carbonUnits?: string}) {
    useEffect(() => {
        // Function to modify SVGs
        function modifySVG(containerId: string) {
            const selector = '#' + containerId;
            const container = SVG().addTo(selector);
            const svgToDisplay = container.svg(svg, true); // Use provided SVG content
            const prefix = containerId + '_';

            svgToDisplay.find('[id]').each((element) => {
                element.id(prefix + element.id());
            });

            svgToDisplay.find('[fill]').each((element) => {
                element.fill(element.fill().replace('url(#', 'url(#' + prefix));
            });

            svgToDisplay.find('[stroke]').each((element) => {
                element.stroke(element.stroke().replace('url(#', 'url(#' + prefix));
            });

            svgToDisplay.find('[filter]').each((element) => {
                const currentFilter = element.attr('filter');
                element.attr('filter', currentFilter.replace('url(#', 'url(#' + prefix));
            });

            svgToDisplay.find('[clip-path]').each((element) => {
                const currentClipPath = element.attr('clip-path');
                element.attr('clip-path', currentClipPath.replace('url(#', 'url(#' + prefix));
            });

            svgToDisplay.find('[mask]').each((element) => {
                const currentMask = element.attr('mask');
                element.attr('mask', currentMask.replace('url(#', 'url(#' + prefix));
            });

            svgToDisplay.find('[href]').each((element) => {
                const currentHref = element.attr('href');
                if (currentHref.startsWith('#')) {
                    element.attr('href', currentHref.replace('#', '#' + prefix));
                }
            });

            if (overrideValues === true && area && carbonUnits) {
                const assetAreaTspan = svgToDisplay.findOne('#' + prefix + 'asset_area');

                if (assetAreaTspan) {
                    // Update its text content
                    assetAreaTspan.node.textContent = area;
                }

                const assetCapacityTspan = svgToDisplay.findOne('#' + prefix + 'asset_capacity');

                if (assetCapacityTspan) {
                    // Update its text content
                    assetCapacityTspan.node.textContent = carbonUnits;
                }
            }
        }
        
        // Modify the SVGs
        modifySVG(`svg_${id}`);
    }, []);
    
    return (
        <div
            id={`svg_${id}`}
        />
    )
}