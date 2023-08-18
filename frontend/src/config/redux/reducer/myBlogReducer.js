const initialStateHome = {
  myDataBlogs: [],
  page: {
    currentPage: 1,
    totalPage: 1,
  },
};

const myBlogReducer = (state = initialStateHome, action) => {
  if (action.type === "UPDATE_MY_DATA_BLOG") {
    return {
      ...state,
      myDataBlogs: action.payload,
    };
  }
  if (action.type === "UPDATE_MY_PAGE") {
    return {
      ...state,
      page: action.payload,
    };
  }

  return state;
};

export default myBlogReducer;
