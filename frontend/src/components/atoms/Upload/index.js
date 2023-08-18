import React from "react";

const Upload = ({ img, ...rest }) => {
  return (
    <>
      {img && (
        <img
          className="rounded-md shadow-md w-1/3 h-auto mb-2"
          src={img}
          alt="preview"
        />
      )}
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange="previewImage(event)"
        className="w-full px-4 py-2 rounded-full border border-orange-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
        {...rest}
      />
    </>
  );
};

export default Upload;
