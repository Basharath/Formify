import { ChangeEvent, MouseEvent } from 'react';
import Input from './Input';

import { FieldsObjType } from '../types';

interface FormInputsType {
  name: string;
  displayName: string;
}

interface FormModalType {
  inputsState: FormInputsType;
  checkboxesState: FieldsObjType;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  closeModal: () => void;
}

function FormModal({
  inputsState,
  checkboxesState,
  onInputChange,
  onCheckboxChange,
  onSubmit,
  closeModal,
}: FormModalType) {
  const handlePropagation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="bg-gray-100/90 absolute inset-0 flex justify-center p-4 pt-24"
      onClick={closeModal}
    >
      <div
        className="max-w-xl w-full md:min-w-[400px] max-h-[450px] h-fit p-8 rounded-lg bg-blue-200 shadow-md"
        onClick={handlePropagation}
      >
        <h3 className="text-2xl font-semibold text-center mb-4">
          Create new form
        </h3>
        <div>
          <label className="font-medium">Enter form name</label>
          <Input
            name="name"
            value={inputsState.name}
            type="text"
            onChange={onInputChange}
            placeholder="Feedback form for formify"
            classes="border rounded-md px-2 py-1.5 my-1 w-full focus:outline-none"
          />
        </div>
        <div>
          <label className="font-medium">Enter display name</label>
          <Input
            name="displayName"
            value={inputsState.displayName}
            type="text"
            onChange={onInputChange}
            placeholder="Share your feedback"
            classes="border rounded-md px-2 py-1.5 my-1 w-full focus:outline-none"
          />
        </div>
        <div className="font-medium">Select the form fields</div>
        <div className="grid grid-cols-3 my-2 mb-4">
          <label className="">
            <input
              name="name"
              type="checkbox"
              className="accent-purple-500"
              onChange={onCheckboxChange}
              checked={checkboxesState.name}
            />{' '}
            Name
          </label>
          <label className="md:justify-self-center">
            <input
              name="email"
              type="checkbox"
              className="accent-purple-500"
              onChange={onCheckboxChange}
              checked={checkboxesState.email}
            />{' '}
            Email
          </label>
          <label className="md:pl-20">
            <input
              name="website"
              type="checkbox"
              className="accent-purple-500"
              onChange={onCheckboxChange}
              checked={checkboxesState.website}
            />{' '}
            Website
          </label>
          <label className="col-span-2">
            <input
              name="twitter"
              type="checkbox"
              className="accent-purple-500"
              onChange={onCheckboxChange}
              checked={checkboxesState.twitter}
            />{' '}
            Twitter
          </label>
          <label className="md:pl-20">
            <input
              name="message"
              type="checkbox"
              className="accent-purple-500"
              onChange={onCheckboxChange}
              checked={checkboxesState.message}
            />{' '}
            Message
          </label>
        </div>
        <div>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-purple-500/80 hover:bg-purple-500 rounded-lg text-white w-full focus:outline-none"
          >
            Create form
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
