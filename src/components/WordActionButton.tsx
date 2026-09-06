import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export default function WordActionButton(props: {
  copyText?: string;
  materialIcon: string;
  tooltip: string;
}) {
  const [copiedText, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    if (!text) {
      return Promise.resolve();
    }

    copy(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    props.copyText && (
      <>
        <div className="tooltip" data-tip={props.tooltip}>
          <button
            className="btn btn-primary btn-circle material-icons"
            onClick={() => handleCopy(props.copyText!)}
          >
            {props.materialIcon}
          </button>
        </div>

        {isCopied && (
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>Copied "{copiedText}" to your clipboard</span>
            </div>
          </div>
        )}
      </>
    )
  );
}
