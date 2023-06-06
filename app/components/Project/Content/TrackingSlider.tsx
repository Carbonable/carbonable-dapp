import { useState } from "react";
import Draggable from "react-draggable";

  
  export default function TrackingSlider() {
    const data = [20, 33, 100]
    const [activeDrags, setActiveDrags] = useState(0);
    const [width, setWidth] = useState(data.length * 8 / 2 - 5);
    console.log(width)
    
    const onStart = () => {
        setActiveDrags(activeDrags + 1);
    };
    
    const onStop = () => {
        setActiveDrags(activeDrags - 1);
    };
    
    const dragHandlers = {onStart, onStop};
  
    return (
      <div className="w-full overflow-hidden mx-auto min-h-[200px]">
        <Draggable bounds={{top: 0, left: -width, right: width, bottom: 0}} {...dragHandlers} defaultClassName="w-fit mx-auto min-h-[200px]">
            <div className="box flex items-end justify-center cursor-pointer">
                {data.map((item, index) => (
                    <div key={`date_${index}`} className={`w-[9px] rounded-t-full bg-greenish-500 border-t-[2px] border-x-[2px] border-greenish-700`} style={{ height: `${item * 0.9}px`}}></div>
                ))}
            </div>
        </Draggable>

      </div>
    );
  };