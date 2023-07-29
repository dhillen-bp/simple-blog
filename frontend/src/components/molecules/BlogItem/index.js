/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Gap } from "../../atoms";
import "./blogItem.scss";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../utils/firebase_config";
import { onAuthStateChanged } from "firebase/auth";

const BlogItem = (props) => {
  const navigate = useNavigate();
  const [userOnAuthChanged, setUserOnAuthChanged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserOnAuthChanged(true);
      } else {
        setUserOnAuthChanged(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const { image, title, name, date, body, _id, onDelete } = props;

  return (
    <div className="blog-item">
      <img className="image-thumb" src={image} alt="blog-img" />
      <div className="content-detail">
        <div className="title-wrapper">
          <p className="title">{title}</p>

          <div className="edit-wrapper">
            {userOnAuthChanged && (
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
