import { useEffect, useState } from "react";
import { RiArrowUpCircleFill, RiGithubFill } from "react-icons/ri";
import "../index.css";

export const ButtonUp = () => {
  const [btnUp, setBtnUp] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 6000) {
        setBtnUp(true);
      } else {
        setBtnUp(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="btnTop">
      {btnUp && (
        <button onClick={scrollUp}>
          <RiArrowUpCircleFill className="RiArrowUpCircleFill" />
        </button>
      )}
      <a
        className="a__RiGithubFill"
        href="https://github.com/JsMendoza13"
        target="_blank"
        rel="noreferrer"
      >
        <RiGithubFill className="RiGithubFill" />
      </a>
    </div>
  );
};
