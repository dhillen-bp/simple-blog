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
    <div className="rounded-md shadow-lg overflow-hidden">
      <img src={image} alt="Blog-Img" className="aspect-video" />
      <div className="px-6 py-4 font-inter">
        <div className="font-semibold text-lg text-slate-700">{title}</div>
        <p className="text-sm text-slate-400 mb-2">
          {name} - {date}
        </p>
        <p className="text-md text-slate-600 mb-3">{body}</p>
        <p
          className="text-sm text-center underline cursor-pointer"
          onClick={() => {
            navigate(`/detail-blog/${_id}`);
          }}
        >
          Read More
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
