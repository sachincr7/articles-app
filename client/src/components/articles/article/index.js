import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearCurrentArticle } from "../../../store/actions";
import { getArticle } from "../../../store/actions/article_actions";
import Loader from "../../../utils/loader";
import ScoreCard from "../../../utils/scoreCard";

const Article = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { current } = useSelector((state) => state.articles);

  // console.log("current", current);

  useEffect(() => {
    dispatch(getArticle(id));

    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [dispatch, id]);

  return (
    <div>
      {current ? (
        <div className="article_container">
          <div
            style={{
              background: `url(https://picsum.photos/1920/1080)`,
            }}
            className="image"
          ></div>
          <h1>{current.title && current.title} </h1>
          <div className="mt-3 content">
            <div
              dangerouslySetInnerHTML={{
                __html: current.content ? current.content : "",
              }}
            ></div>
          </div>
          <ScoreCard current={current} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Article;
