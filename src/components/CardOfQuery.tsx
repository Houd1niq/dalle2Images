import React from "react";
import { Link } from "react-router-dom";

export const CardOfQuery: React.FC<{
  query: string;
  data: { url: string }[];
  id: string;
}> = ({ query, data, id }) => {
  const upperCaseQuery = query[0].toUpperCase() + query.slice(1);
  return (
    <Link to={`images/${id}`} className="bg-gray-800 relative group block">
      <h3 className="text-3xl absolute block ml-[50%] mt-[50%] translate-x-[-50%] translate-y-[-54%] z-10">
        {upperCaseQuery}
      </h3>
      <div className="flex justify-center flex-wrap max-w-[320px] relative brightness-50 group-hover:brightness-75 transition-all">
        {data.map((item) => {
          return (
            <img
              className="w-[160px]"
              key={item.url}
              src={item.url}
              alt="generated image"
            />
          );
        })}
      </div>
    </Link>
  );
};
