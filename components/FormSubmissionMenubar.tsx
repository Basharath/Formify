import React from 'react';

interface FieldsType {
  fieldsArray: string[];
}

function FormSubmissionMenubar({ fieldsArray }: FieldsType) {
  const length = fieldsArray.length;
  const gridLength = `grid-col-` + length;
  const classes = `
bg-purple-400 text-gray-800 p-4 min-w-[700px] rounded-xl grid ${gridLength} items-center overflow-x-auto grid-flow-col`;

  return (
    <div className={classes}>
      {[...fieldsArray].map((f, idx) => (
        <div key={idx} className="font-medium px-2">
          {f}
        </div>
      ))}
      {/* <div className="w-3/12 font-medium md:px-4">Form name</div>
      <div className="w-3/12 font-medium pl-8">Form fields</div>
      <div className="w-2/12 font-medium grid place-content-center">
        Form script
      </div>
      <div className="w-2/12 font-medium grid place-content-center">Edit</div>
      <div className="w-2/12 font-medium grid place-content-center md:pl-10">
        Delete form
      </div> */}
    </div>
  );
}

export default FormSubmissionMenubar;
