import React, { useEffect, useState } from "react";
import { Link } from "../../components";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DetailBlog = (props) => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/v1/blog/post/${id}`)
      .then((res) => {
        console.log("success: ", res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, [id]);

  if (data.author) {
    return (
      <div className="mx-auto -mt-16 w-3/4 md:px-20">
        <h1 className="text-lg font-bold md:text-xl text-center mt-5">
          {data.title}
        </h1>
        <p className="text-sm text-center mt-2 text-slate-500">
          Tags: <span>{data.tags.map((tag) => tag.name).join(", ")}</span>
        </p>
        <p className="text-md mt-3 text-slate-500">
          {data.author.name} - {data.createdAt}
        </p>
        <img
          src={`http://localhost:4000/${data.image}`}
          alt="Article-Img"
          className="mx-auto w-full mt-3 shadow-md"
        />
        <button className="mx-auto mt-2 flex items-center bg-white text-black font-bold py-2 px-2 rounded">
          <FaHeart />
        </button>
        <p
          className="text-md mt-5 mb-10 first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
      first-letter:mr-3 first-letter:float-left"
        >
          {data.body}
        </p>

        <Link
          title="Kembali ke Home"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    );
  }
  return <p>...Loading Data</p>;
};

export default DetailBlog;
