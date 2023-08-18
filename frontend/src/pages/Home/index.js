import React, { useEffect, useState } from "react";
import { BlogItem } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDataBlog } from "../../config/redux/action";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";
import { ComputerImg } from "../../assets";

const Home = () => {
  const [counter, setCounter] = useState(1);
  const { dataBlogs, page } = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataBlog(counter));
  }, [counter, dispatch]);

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1);
  };

  return (
    <div className="w-full">
      {page.currentPage === "1" && (
        <div>
          <h1 className="text-lg font-bold border-b border-orange-500 pb-1 mb-5">
            Popular Articles
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* <!-- Kolom Kiri --> */}
            <div className="relative col-span-2 rounded-md overflow-hidden pr-5 text-white">
              <img
                src={ComputerImg}
                alt="Article-Thumb"
                className="rounded-md"
              />

              {/* <!-- Overlay untuk latar belakang blur pada teks --> */}
              <div className="absolute bottom-0 left-0 right-5 p-2 bg-opacity-50 backdrop-filter backdrop-blur shadow-md rounded-md">
                <div className="font-semibold text-lg">Blog Title</div>
                <p className="text-md hidden md:block">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maiores, dolore?
                </p>
                <p className="text-sm">Author - 03 Agustus 2023</p>
                <a href="./detail-blog.html" className="underline">
                  {" "}
                  Read More
                </a>
              </div>
            </div>

            {/* <!-- Kolom Kanan --> */}
            <div className="grid grid-cols-1 grid-rows-3 gap-2 sm:gap-4 items-start">
              {/* <!-- Artikel 1 --> */}
              <div className="grid grid-cols-2 gap-2 shadow-sm items-center">
                <div className="flex justify-evenly items-center bg-gray-800 rounded-md">
                  <img
                    src={ComputerImg}
                    alt=""
                    className="w-full object-cover rounded-md"
                  />
                </div>
                <div className="col-span-1">
                  <div className="font-semibold text-md text-slate-700 self-end">
                    Blog Title Left
                  </div>
                  <p className="text-sm text-slate-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsum, molestiae!
                  </p>
                  <a href="" className="underline">
                    {" "}
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="">
        <h1 className="text-lg font-bold border-b border-orange-500 pb-1 my-5 lg:mt-10">
          Latest Articles
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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

export default Home;
