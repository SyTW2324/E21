import React from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../pages/contentInfo/functions";

export default function Comments({ type, setContent, handleSubmit, setText }: { type: "movies" | "series", setContent: any, handleSubmit: any, setText: any }) {
  const [comments, getComment] = React.useState<any>([]);
  // Get the id from the URL
  const { id } = useParams() as { id: string };

  React.useEffect(() => {
    getComments(id, type, (error) => {}).then((data) => getComment(data));
  }, [type, id, setContent]);

  return (
  <section className="bg-gray-900 py-8 lg:py-16 antialiased">
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-white">
          Discussion
        </h2>
      </div>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg borde bg-gray-800 border-gray-700">
          <label className="sr-only">Your comment</label>
          <textarea
            id="comment"
            className="px-0 w-full text-sm text-white border-0 focus:ring-0 focus:outline-none placeholder-gray-400 bg-gray-800"
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
      {comments.map((comment: any, index: any) => (
        <article
          key={index}
          className="p-6 text-base rounded-lg bg-gray-900"
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                {comment.userName}
              </p>
            </div>
          </footer>
          <p className="text-gray-400">{comment.text}</p>
          <div className="flex items-center mt-4 space-x-4"></div>
        </article>
      ))}
    </div>
  </section>
  );
}