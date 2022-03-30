import classNames from "classnames";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import vsDark from 'prism-react-renderer/themes/vsDark';

interface CodeBlockProps {
  code: string;
  language?: Language;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const { code, language = 'jsx' } = props;

  return (
    <Highlight {...defaultProps} code={code.trim()} language={language} theme={vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classNames('code-block', className)} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}