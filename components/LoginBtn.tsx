import { MouseEvent } from 'react';

interface LoginBtnTyp {
  onClick: (e: MouseEvent) => Promise<void>;
  text: string;
}

function LoginBtn({ onClick, text }: LoginBtnTyp) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="px-4 py-2 bg-purple-500/80 hover:bg-purple-500 rounded-lg text-white w-full focus:outline-none"
    >
      {text}
    </button>
  );
}

export default LoginBtn;
