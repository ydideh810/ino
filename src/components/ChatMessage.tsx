import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, Check } from 'lucide-react';
import { ChatMessageProps } from '../types';

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div
      className={`flex gap-4 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex gap-3 max-w-3xl p-4 rounded-lg backdrop-blur-sm ${
          isUser
            ? 'bg-gradient-to-r from-red-500/10 to-grey-500/10 border border-red-500/20'
            : 'bg-gradient-to-r from-grey-500/10 to-black-300/10 border border-grey-500/20'
        }`}
      >
        <div className="flex-shrink-0">
          {isUser ? (
            <User className="w-6 h-6 text-red-400" />
          ) : (
            <Bot className="w-6 h-6 text-grey-400" />
          )}
        </div>
        <div className="prose prose-invert max-w-none overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');

                if (!inline && match) {
                  return (
                    <div className="syntax-highlighter-container group relative">
                      <button
                        onClick={() => copyToClipboard(code)}
                        className="absolute right-2 top-2 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100 z-10 flex items-center gap-2"
                        title="Copy code"
                      >
                        {copiedCode === code ? (
                          <>
                            <Check className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400">
                              Copied!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400">Copy</span>
                          </>
                        )}
                      </button>
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                        }}
                        {...props}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
