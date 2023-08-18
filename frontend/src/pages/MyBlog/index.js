import React, { useEffect, useState } from "react";
import { MyBlogItem } from "../../components";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMyDataBlog } from "../../config/redux/action";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";

const MyBlog = () => {
  const [counter, setCounter] = useState(1);
  const { myDataBlogs, page } = useSelector((state) => state.myBlogReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMyDataBlog(counter));
  }, [counter, dispatch]);

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
                dispatch(setMyDataBlog(counter));
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
    <div className="w-full -mt-10">
      <div className="">
        <h1 className="text-lg font-bold border-b border-orange-500 pb-1 my-5">
          My Articles
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {myDataBlogs.map((blog) => {
            return (
              <MyBlogItem
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
      </div>

      <div className="flex justify-center items-center mt-10 ">
        <ul className="flex space-x-6">
          <li>
            <button
              className="px-3 py-1 bg-orange-500 text-white rounded-md shadow-md"
              onClick={previous}
            >
              Previous
            </button>
          </li>
          <li>
            <button className="px-3 py-1 bg-orange-500 text-white rounded-md shadow-md">
              {page.currentPage} / {page.totalPage}
            </button>
          </li>
          <li>
            <button
              className="px-3 py-1 bg-orange-500 text-white rounded-md shadow-md"
              onClick={next}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyBlog;
