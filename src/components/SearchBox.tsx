import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { recommendedSearchTermsGet } from "../api/recommended-search-terms";
import { getRandom } from "../util/get-random";
import { useNavigate } from "react-router";

export default function SearchBox() {
  const [terms, setTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedTerm, setSuggestedTerm] = useState("lightning bolt");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (terms.length === 0) {
        return;
      }

      setSuggestedTerm(getRandom(terms));
    }, 5000);

    return () => clearInterval(interval);
  }, [terms]);

  useEffect(() => {
    let isActive = true;

    recommendedSearchTermsGet()
      .then((result) => {
        if (isActive) setTerms(result);
      })
      .catch(() => {
        if (isActive) setError("Couldn't load recommended searches.");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const handleOnKeyDown = (keyEvent: KeyboardEvent<HTMLInputElement>) => {
    if (keyEvent.code === "Enter") {
      keyEvent.preventDefault();
      handleOnClick();
    }
  };

  const handleOnClick = () => {
    if ((searchTerm?.length ?? 0) > 1) {
      navigate(`/word/${searchTerm}`);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-lg w-full">
      <div className="card-body">
        <div className="flex items-center gap-4 my-2">
          <input
            type="text"
            placeholder={`Try "${suggestedTerm}"`}
            className="input input-xl flex-grow focus:outline-none focus:ring-0 focus:border-primary"
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
          <button
            className="btn btn-circle btn-primary material-icons"
            onClick={handleOnClick}
            disabled={searchTerm.length < 2}
          >
            search
          </button>
        </div>

        {error && <p>{error}</p>}
        {isLoading && <progress className="progress progress-primary w-full"></progress>}
      </div>
    </div>
  );
}
