/* eslint-disable @next/next/no-sync-scripts */
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import {
//   docco,
//   tomorrowNight,
// } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { MouseEvent } from 'react';
import toast from 'react-hot-toast';
import { UserFormTypeWithId } from '../types';
import { copyToClipboard } from '../utils';
import SyntaxHighlight from './SyntaxHighlight';

interface ScriptModalType {
  formDetails: UserFormTypeWithId;
  onClose: () => void;
}

function ScriptModal({ formDetails, onClose }: ScriptModalType) {
  const { id, displayName = 'Suggestions/Feedback', fields } = formDetails;

  const arr = fields
    .split(',')
    .filter((f) => f)
    .map((f) => `'${f}'`);

  const script = `<script src='https://formify.vercel.app/script.min.js'></script>
<script>
  const fields = [${arr}];
  const formURL = 'https://formify.vercel.app/api/forms/submissions?id=${id}';
  const heading = '${displayName}';
  formifyInit(fields, formURL, heading);
</script>
`;

  const reactScript = `// npm i formify-form
// import { Form } from 'formify-form';

<Form
  formFields={[${arr}]}
  formURL='https://formify.vercel.app/api/forms/submissions?id=${id}'
  formTitle='${displayName}'
/>
`;

  const handlePropagation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleCopy = async (data: string) => {
    try {
      await copyToClipboard(data);
      toast.success('Script copied!');
    } catch (err) {
      toast.success('Failed tocopied!');
    }
  };

  return (
    <div
      className="bg-gray-100/90 absolute inset-0 flex justify-center p-4 pt-24"
      onClick={onClose}
    >
      <div
        className="max-w-xl w-full md:min-w-[400px] max-h-[450px] h-fit p-8 rounded-lg bg-blue-200 shadow-md overflow-auto scrollbar relative"
        onClick={handlePropagation}
      >
        <div
          className="w-6 h-6 rounded-full absolute top-2 right-2 flex justify-center items-center select-none cursor-pointer"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-semibold text-center mb-4">
          Code to embed
        </h3>
        <div>
          <SyntaxHighlight
            title="As a JS script"
            code={script}
            onCopy={() => handleCopy(script)}
          />
          <div className="text-center">OR</div>
          <SyntaxHighlight
            title="As a react component"
            code={reactScript}
            onCopy={() => handleCopy(reactScript)}
          />
        </div>
      </div>
    </div>
  );
}

export default ScriptModal;
