import React, { useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const dateObj = new Date(repo.created_at);
  const date =
    dateObj.getDate() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getFullYear();
  const { addFavourite, removeFavourite } = useActions();

  const { favourites } = useAppSelector((state) => state.github);

  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(repo)
  );
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFavourite(true);

    addFavourite(repo);
  };
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFavourite(false);

    removeFavourite(repo);
  };

  return (
    <div className="border-2 py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
      </a>
      <p className="py-2 m-1">⏲ Created at {date}</p>
      {repo?.description && <p className="text-sm border-2"><span className='font-bold'>Description:</span> {repo.description}</p>}

      {!isFavourite ? (
        <button
          className="py-2 px-4 bg-yellow-400 m-2 rounded hover:shadow-md transition-all"
          onClick={addToFavourite}
        >
          Add to favourites
        </button>
      ) : (
        <button
          className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          onClick={removeFromFavourite}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default RepoCard;
