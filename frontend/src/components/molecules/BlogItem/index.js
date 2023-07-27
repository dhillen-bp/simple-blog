/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Gap } from "../../atoms";
import "./blogItem.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../utils/firebase_config";
import { onAuthStateChanged } from "firebase/auth";

const BlogItem = (props) => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user onAuth: ", user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  console.log("user login: ", auth.currentUser);
  const isAuthenticated = useSelector((state) => {
    return auth.currentUser !== null;
  });

  const { image, title, name, date, body, _id, onDelete } = props;

  return (
    <div className="blog-item">
      <img className="image-thumb" src={image} alt="blog-img" />
      <div className="content-detail">
        <div className="title-wrapper">
          <p className="title">{title}</p>

          <div className="edit-wrapper">
            {isAuthenticated && (
              <>
                <p
                  className="edit"
                  onClick={() => {
                    navigate(`/create-blog/${_id}`);
                  }}
                >
                  Edit
                </p>{" "}
                |{" "}
                <p className="delete" onClick={() => onDelete(_id)}>
                  Delete
                </p>
              </>
            )}
          </div>
        </div>

        <p className="author">
          {name} - {date}
        </p>
        <p className="body">{body}</p>
        <Gap height={20} />
        <Button
          title="Read More"
          onClick={() => {
            navigate(`/detail-blog/${_id}`);
          }}
        />
      </div>
    </div>
  );
};

export default BlogItem;
