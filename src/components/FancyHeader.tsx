import React, { useEffect } from "react";

export const FancyHeader: React.FC<{ value: string }> = ({ value }) => {
  const [title, setTitle] = React.useState<string>("");
  // Function that will emulate generation effect of title
  const generateTitle = (value: string) => {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    // setTitle("");
    let iteration = 0;

    let interval = setInterval(() => {
      let tempTitle = "";
      for (let i = 0; i < value.length; i++) {
        if (value[i] === " ") {
          tempTitle += " ";
        } else if (i > iteration) {
          tempTitle += alphabet[Math.floor(Math.random() * alphabet.length)];
        } else {
          tempTitle += value[i];
        }
      }
      console.log(iteration, tempTitle);
      iteration++;
      setTitle(tempTitle);
      if (iteration === value.length) {
        clearInterval(interval);
      }
    }, 60);
  };

  useEffect(() => {
    generateTitle(value);
  }, []);

  return <h1 className="font-bold text-3xl mb-3">{title.toUpperCase()}</h1>;
};
