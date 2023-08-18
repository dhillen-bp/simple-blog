import axios from "axios";

const token = sessionStorage.getItem("accessToken");

export const setMyDataBlog = (page) => (dispatch) => {
  axios
    .get(`http://localhost:4000/v1/blog/myposts?page=${page}&perPage=6`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      const responseAPI = result.data;

      dispatch({ type: "UPDATE_MY_DATA_BLOG", payload: responseAPI.data });
      dispatch({
        type: "UPDATE_MY_PAGE",
        payload: {
          currentPage: responseAPI.current_page,
          totalPage: Math.ceil(responseAPI.total_data / responseAPI.per_page),
        },
      });
    })
    .catch((err) => {
      console.log("error ", err);
    });
};
