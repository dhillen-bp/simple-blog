import React, { useEffect, useState } from "react";
import { Upload, Link } from "../../components";
import "./createBlog.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import {
  postToAPI,
  setForm,
  setImgPreview,
  updateToAPI,
} from "../../config/redux/action";
import axios from "axios";

const CreateBlog = (props) => {
  const { form, imgPreview } = useSelector((state) => state.createBlogReducer);
  const { title, body } = form;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      axios
        .get(`http://localhost:4000/v1/blog/post/${id}`)
        .then((res) => {
          const data = res.data.data;
          dispatch(setForm("title", data.title));
          dispatch(setForm("body", data.body));
          dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    } else {
      dispatch(setForm("title", ""));
      dispatch(setForm("body", ""));
      dispatch(setImgPreview(null));
    }
  }, [id, dispatch]);

  const onSubmit = () => {
    if (isUpdate) {
      updateToAPI(form, id);
      navigate("/");
    }
    postToAPI(form);
    navigate("/");
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm("image", file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    // Fetch tag data from the API
    axios
      .get("http://localhost:4000/v1/tag/tags")
      .then((response) => {
        // Check if the response data contains the "data" property and if it is an array
        if (response.data && Array.isArray(response.data.data)) {
          // Map the "data" property to options for react-select
          const options = response.data.data.map((tag) => ({
            value: tag.slug,
            label: tag.name,
          }));
          setTagOptions(options); // Set the tag options in the state
        } else {
          // Handle the case where the response data does not have the expected format
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching tag data:", error);
      });
  }, []);

  // Handle the change event for the Select component
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Extract the values of the selected tags and convert them into a comma-separated string
    const selectedTagSlugs = selectedOptions
      .map((option) => option.value)
      .join(",");

    // Dispatch the selected tags as a comma-separated string to the form state
    dispatch(setForm("tags", selectedTagSlugs));

    console.log(selectedTagSlugs);
  };

  // const token = sessionStorage.getItem("accessToken");
  // console.log("session token: ", token);

  return (
    <div className="mx-auto mt-20 w-3/4 md:px-20 py-10">
      <Link
        title="Kembali"
        onClick={() => {
          navigate("/");
        }}
      />
      <h1 className="text-xl font-bold text-center mb-2">
        {isUpdate ? "Update" : "Create"} Blog Post
      </h1>
      <div className="mt-4">
        <label htmlFor="title" className="text-lg font-bold">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="w-full px-4 py-2 rounded-full border border-orange-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
          value={title}
          onChange={(e) => dispatch(setForm("title", e.target.value))}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="image" className="text-lg font-bold">
          Image
        </label>
        <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />

        <div className="mt-2" id="imagePreviewContainer"></div>
      </div>
      <div className="mt-4">
        <label htmlFor="body" className="text-lg font-bold">
          Body
        </label>
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="10"
          className="w-full px-6 py-4 rounded-md border border-orange-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
          value={body}
          onChange={(e) => dispatch(setForm("body", e.target.value))}
        ></textarea>
      </div>
      <div className="mt-4">
        <label htmlFor="tags" className="text-lg font-bold">
          Tags
        </label>
        <Select
          className="focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
          isMulti
          name="tags"
          options={tagOptions}
          value={selectedTags}
          onChange={handleTagChange}
        />
      </div>

      <div className="flex justify-between mt-4">
        <a
          href="./index.html"
          type="submit"
          className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Back
        </a>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 mr-2"
          onClick={onSubmit}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
