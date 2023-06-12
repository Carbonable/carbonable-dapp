import { useState } from "react";
import Draggable from "react-draggable";
import type { Ndvi } from "~/types/dmrv";

  
  export default function TrackingSlider({data, setSelectedImageIndex, selectedDateIndex, setSelectedDateIndex}: {data: Ndvi[], setSelectedImageIndex: (index: number) => void, selectedDateIndex: number, setSelectedDateIndex: (index: number) => void}) {
    const [activeDrags, setActiveDrags] = useState(0);
    const [width] = useState(data.length * 8 / 2 - 4);
    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});
    

    const handleDrag = (e: any, ui: { deltaX: number; deltaY: number; }) => {
      const {x, y} = deltaPosition;
      setDeltaPosition({
          x: x + ui.deltaX,
          y: y + ui.deltaY,
      });
      setSelectedDateIndex(data.length - (Math.round(x / 8) + 1));
    };
  
    
    const onStart = () => {
        setActiveDrags(activeDrags + 1);
    };
    
    const onStop = () => {
        setActiveDrags(activeDrags - 1);
        setSelectedImageIndex(data.length - (Math.round(deltaPosition.x / 8) + 1));
    };
    
    const dragHandlers = {onStart, onStop};
  
    return (
      <div className="w-full overflow-hidden mx-auto min-h-[200px]">
        <Draggable bounds={{top: 0, left: -width, right: width, bottom: 0}} defaultPosition={{x: -width, y: 0}} {...dragHandlers} defaultClassName="w-fit mx-auto min-h-[200px]" onDrag={handleDrag}>
            <div className="box flex items-end justify-center cursor-grab">
                {data.map((item, index) => (
                    <div key={`date_${index}`} className={`w-[8px] rounded-t-full  border-t-[2px] border-x-[2px] border-greenish-700 ${index <= selectedDateIndex ? "bg-greenish-500/80 border-greenish-800/80" : "bg-neutral-500/70 border-neutral-700/70"}`} style={{ height: `${Math.round(item.value * 100 * 0.9)}px`}}></div>
                ))}
            </div>
        </Draggable>
      </div>
    );
  };