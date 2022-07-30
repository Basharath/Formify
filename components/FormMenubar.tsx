import React from 'react';

function FormMenubar() {
  return (
    <div className="bg-purple-400 text-gray-800 p-4 min-w-[700px] rounded-xl flex justify-between items-center overflow-x-auto">
      <div className="w-3/12 font-semibold text-lg md:px-4">Form name</div>
      <div className="w-3/12 font-semibold text-lg pl-8">Form fields</div>
      <div className="w-2/12 font-semibold text-lg grid place-content-center">
        Form script
      </div>
      <div className="w-2/12 font-semibold text-lg grid place-content-center">
        Edit form
      </div>
      <div className="w-2/12 font-semibold text-lg grid place-content-center md:pl-10">
        Delete form
      </div>
    </div>
  );
}

export default FormMenubar;
