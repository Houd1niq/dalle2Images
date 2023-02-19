import React from "react";
import { Link } from "react-router-dom";

export const DesktopCardOfQuery: React.FC<{
  query: string;
  data: { url: string }[];
  id: string;
}> = ({ query, data, id }) => {
  const upperCaseQuery = query[0].toUpperCase() + query.slice(1);
  return (
    <Link to={`images/${id}`} className="mt-5">
      <div className="flex gap-2">
        {data.map((item) => {
          return (
            <img
              className="
            images w-[140px] h-[340px] object-cover first:
          "
              src={item.url}
              key={item.url}
              alt="generated image"
            ></img>
          );
        })}
      </div>
      <h3 className="mt-10 text-3xl hover:scale-110 transition-all">
        {upperCaseQuery}
      </h3>
    </Link>
  );
};
