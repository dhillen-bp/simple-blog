import React, { useEffect, useState } from "react";
import { Link } from "../../components";
import "./detailBlog.scss";
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
      <div className="detail-blog-wrapper">
        <img
          className="img-cover"
          src={`http://localhost:4000/${data.image}`}
          alt="thumb"
        />
        <p className="blog-title">{data.title}</p>
        <p className="blog-author">
          {data.author.name} - {data.createdAt}
        </p>
        <p className="blog-body">{data.body}</p>
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
