import React, { useEffect, useState } from "react";
import { BlogItem, Button, Gap } from "../../components";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDataBlog } from "../../config/redux/action";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";

const Home = () => {
  const [counter, setCounter] = useState(1);
  const { dataBlogs, page } = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataBlog(counter));
  }, [counter, dispatch]);

  const navigate = useNavigate();

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1);
  };

  const confirmDelete = (id) => {
    const token = sessionStorage.getItem("accessToken");
    console.log("delete token: ", token);
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios
              .delete(`http://localhost:4000/v1/blog/post/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                dispatch(setDataBlog(counter));
              })
              .catch((err) => {
                console.log("error: ", err);
              }),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <div className="home-page-wrapper">
      <div className="create-wrapper">
        <Button
          title="Create Blog"
          onClick={() => {
            navigate("/create-blog");
          }}
        />
      </div>
      <Gap height={20} />
      <div className="content-wrapper">
        {dataBlogs.map((blog) => {
          return (
            <BlogItem
              key={blog._id}
              image={`http://localhost:4000/${blog.image}`}
              title={blog.title}
              body={blog.body}
              name={blog.author.name}
              date={blog.createdAt.substring(0, 10)}
              _id={blog._id}
              onDelete={confirmDelete}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Button title="Previous" onClick={previous} />
        <Gap width={20} />
        <p className="text-page">
          {page.currentPage} / {page.totalPage}
        </p>
        <Gap width={20} />
        <Button title="Next" onClick={next} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Home;
