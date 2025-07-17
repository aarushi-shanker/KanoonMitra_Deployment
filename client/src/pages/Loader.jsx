import React from "react";
import "../App.css";
import data from "../assets/LoaderData";

const Loader = () => {
    function randNo() {
        const randNumber = Math.random();
        const index = Math.floor(randNumber * 8);
        return index;
    }
    const arrInd = randNo();
    return (
        <div id="loader" className="bg-base-100">
            <div id='load' className="flex items-center flex-col p-4">
                <img src="/load-img.png" id="logo" />
                <h6 className="text-[2.5rem] font-[Alfa Slab One]" id="loadLogo text-center">
                    Kanoon<span className="samarkand text-amber-600">Mitra</span></h6>
                <h6 id="factHead">Did you know?</h6>
                <h6 id="fact">{data[arrInd]}</h6>
            </div>
        </div>
    );
};
export default Loader;