import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import WordSuggester from "./WordSuggester";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    <div className="card bg-base-100 shadow-lg w-full">
      <div className="card-body">
        <WordSuggester />
        <div className="flex items-center gap-4 my-2">
          <input
            type="text"
            placeholder="Search for any word, in any language"
            className="input input-xl grow focus:outline-none focus:ring-0 focus:border-primary"
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            autoFocus
          />
          <button
            className="btn btn-circle btn-primary material-icons"
            onClick={handleOnClick}
            disabled={searchTerm.length < 2}
          >
            search
          </button>
        </div>
      </div>
    </div>
  );
}
