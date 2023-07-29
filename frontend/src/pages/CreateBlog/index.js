import React, { useEffect, useState } from "react";
import { Button, Gap, Input, TextArea, Upload, Link } from "../../components";
import "./createBlog.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

  // const token = sessionStorage.getItem("accessToken");
  // console.log("session token: ", token);

  return (
    <div className="blog-post">
      <Link
        title="Kembali"
        onClick={() => {
          navigate("/");
        }}
      />
      <p className="title">{isUpdate ? "Update" : "Create"} New Blog Post</p>
      <Input
        label="Post Title"
        value={title}
        onChange={(e) => dispatch(setForm("title", e.target.value))}
      />
      <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
      <TextArea
        value={body}
        onChange={(e) => dispatch(setForm("body", e.target.value))}
      />
      <Gap height={20} />
      <div className="button-action">
        <Button title={isUpdate ? "Update" : "Simpan"} onClick={onSubmit} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default CreateBlog;
