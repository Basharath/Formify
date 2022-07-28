import { ChangeEvent } from 'react';

interface InputType {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  value: string;
  placeholder: string;
}

function Input({ onChange, type, name, value, placeholder }: InputType) {
  return (
    <div className="w-full mb-4">
      <input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        className="border rounded-md p-2 w-full"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
