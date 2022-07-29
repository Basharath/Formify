import Link from 'next/link';
import { MouseEvent } from 'react';

interface UserFormItemType {
  name: string;
  fields: string[];
  onScriptClick: (e: MouseEvent<HTMLElement>) => void;
  onEditClick: (e: MouseEvent<HTMLElement>) => void;
  onDeleteClick: (e: MouseEvent<HTMLElement>) => void;
  formId: string;
}

function UserFormItem({
  name,
  fields,
  onScriptClick,
  onEditClick,
  onDeleteClick,
  formId,
}: // key,
UserFormItemType) {
  return (
    <Link href={`/form/${formId}`}>
      <div className="w-auto flex justify-evenly items-center p-4 py-5 min-w-[700px] bg-blue-50 hover:bg-blue-100 cursor-pointer border-b last:border-b-0">
        <div className="w-3/12 font-medium">{name}</div>
        <div className="w-3/12 flex flex-wrap md:flex-nowrap">
          {fields.map((f, idx) => (
            <span
              key={idx}
              className="px-1 py-[2px] mr-1 rounded-md bg-blue-200 text-sm mb-1 md:mb-0"
            >
              {f}
            </span>
          ))}
        </div>
        <div
          className="w-2/12 grid place-content-center group"
          onClick={onScriptClick}
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
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <div
          className="w-2/12 grid place-content-center group"
          onClick={onEditClick}
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <div
          className="w-2/12 grid place-content-center pl-10 group"
          onClick={onDeleteClick}
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
    </Link>
  );
}

export default UserFormItem;
