import React from "react";
import { v4 as uuidv4 } from "uuid";

const Main = ({ responseData }) => {
  return (
    <div className="w-full h-full grid grid-rows-2 print:grid-rows-1 text-slate-600">
      <div className="flex flex-col items-center justify-center print:hidden">
        <div className="mb-6 flex flex-col items-center justify-center">
          <p className="text-6xl font-semibold">
            {responseData[responseData.length - 2].point}
          </p>
          <p className="text-xs font-semibold">PONTSZÁM</p>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold">
            {responseData[responseData.length - 3].point}
          </p>
          <p className="text-xs font-semibold">STÁTUSZ</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold">
            {responseData[responseData.length - 1].point}
          </p>
          <p className="text-xs font-semibold">SZAVAZAT</p>
        </div>
      </div>
      <div className="mx-4 mb-8 flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide space-y-2">
        {responseData.slice(0, responseData.length - 3).map((item) => (
          <div
            key={uuidv4()}
            className="flex items-center justify-center py-2 px-6 bg-slate-200 rounded-md w-full md:w-[40%]"
          >
            <p className="mr-auto w-2/3 font-semibold">{item.event}</p>
            <p className="text-xl font-semibold text-right">{item.point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
