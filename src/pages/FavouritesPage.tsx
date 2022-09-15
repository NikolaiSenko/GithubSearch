import React from "react";
import { useAppSelector } from "../hooks/redux";
import {IRepo} from "../models/models";
import {useActions} from "../hooks/actions";

const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.github);
  const { removeFavourite } = useActions();

  const removeFromFavourite =(repo :IRepo) =>{
    removeFavourite(repo)
  }

  if (favourites.length === 0) return <p className="text-center">No items:(</p>;
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourites.map((el) => (
          <li key={el.id}>
            <a
              className="font-bold flex gap-2 align-middle"
              href={el.html_url}
              target="_blank"
            >
              <img
                className="rounded-3xl"
                src={el.owner.avatar_url}
                width="50px"
              />
              {el.full_name}
            </a>
            <p>{el.description}</p>

            <button
              className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
              onClick={()=> removeFromFavourite(el)}
            >
              Remove from favourites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
