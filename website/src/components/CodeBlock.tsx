import { cn } from "@/utils/cn";
import React from "react";

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, language = "tsx" }) => {
  const langClass = `language-${language}`;

  return (
    <pre className={cn("bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm", langClass, className)}>
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlock;
