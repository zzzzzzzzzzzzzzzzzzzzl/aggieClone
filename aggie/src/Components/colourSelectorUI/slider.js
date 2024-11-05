import React, { useEffect, useRef, useState } from "react";

function Slider({ onChange }) {
    const handleSliderChange = (event) => {
        const value = event.target.value;
        onChange(value); // Pass the slider value to the parent component
    };

    return (
        <div className="slider-container" >

            <span style={{ width: '90px', display: 'inline-block' }}>

                hue: <span > { }</span>
            </span>
            <span>
                <input type="range" id="mySlider" min="0" max="100" defaultValue="50" step="1"
                    onChange={handleSliderChange}
                />

            </span>
        </div>
    );
}

export default Slider;
