import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface SyntaxHighlightProps {
  code: string;
  onCopy: () => void;
  title: string;
}

export default function SyntaxHighlight({
  code,
  onCopy,
  title,
}: SyntaxHighlightProps) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-lg font-medium">{title}</span>
        <span className="cursor-pointer" onClick={onCopy}>
          Copy 📋
        </span>
      </div>
      <SyntaxHighlighter
        className="rounded-xl scrollbar -mb-1 shadow-md"
        language="javascript"
        style={atomOneDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
