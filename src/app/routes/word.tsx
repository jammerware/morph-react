import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type ApiDecompositionGetResponse } from "../../api/models/decomposition-get-response";
import { decompositionGet } from "../../api/decomposition";

export default function Word() {
  const params = useParams<{ word: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [decomposition, setDecomposition] = useState<ApiDecompositionGetResponse | null>(null);

  useEffect(() => {
    if (!params.word) {
      throw new Error("Param 'word' required");
    }

    let isLoading = true;

    decompositionGet(params.word)
      .then((result) => {
        if (isLoading) setDecomposition(result);
      })
      .catch(() => {
        if (isLoading) setError("Couldn't load recommended searches.");
      })
      .finally(() => {
        if (isLoading) setIsLoading(false);
      });

    return () => {
      isLoading = false;
    };
  }, [params.word]);
  return (
    <>
      <title>{`${decomposition?.word?.translation ?? `Translating "${params.word}"...`}`}</title>

      <div className="card">
        <div className="card-body">
          {isLoading && <progress className="progress progress-primary w-full"></progress>}

          {!isLoading && (
            <>
              <h2 className="card-title">{decomposition?.word?.translation}</h2>
              <p>
                A card component has a figure, a body part, and inside body there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
