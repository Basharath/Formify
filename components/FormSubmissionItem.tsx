import { MouseEvent } from 'react';
import { FieldsObjType, FormSubmissionType } from '../types';
import { fieldsToArray, parseFieldNames } from '../utils';

interface SubmissionItemType {
  formDetails: FormSubmissionType;
  fields: Array<keyof FieldsObjType>;
  onDeleteClick: (e: MouseEvent<HTMLElement>, id: string) => void;
}

function FormSubmissionItem({
  onDeleteClick,
  formDetails,
  fields,
}: SubmissionItemType) {
  const { id: formId } = formDetails;
  const gridLength = `grid-col-` + (fields.length + 1);
  const classes = `
grid ${gridLength} items-center p-4 py-5 bg-blue-50 hover:bg-blue-100 cursor-pointer border-b last:border-b-0 grid-flow-col w-full`;

  const fieldClasses = `px-2 min-w-[200px] max-w-[200px]`;
  const fieldClassesForMessage = `px-2 min-w-[200px] max-w-[200px] whitespace-pre-wrap`;

  return (
    <div className="flex justify-between items-center p-4 py-5 bg-gray-50 hover:bg-blue-100 border-b last:border-b-0 min-w-[1200px] md:min-w-full w-full">
      {fields.map((f, idx) => (
        <div
          key={idx}
          className={f === 'message' ? fieldClassesForMessage : fieldClasses}
        >
          {formDetails[f]}
        </div>
      ))}
      <div
        className="group cursor-pointer pl-2 pr-4"
        onClick={(e) => onDeleteClick(e, formId)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 group-hover:text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
}

export default FormSubmissionItem;
