import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedBooks } from "./../redux/features/booksSlice";
import { Loader } from "@/components";

const Recommendations = () => {
  const dispatch = useDispatch();
  const {
    books: recommendedBooks,
    loading,
    error,
  } = useSelector((state) => state.recommended);

  useEffect(() => {
    dispatch(fetchRecommendedBooks());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display first 5 recommended books
  const recommended = recommendedBooks.slice(0, 5);

  return (
    <div>
      <aside className="shadow-lg shadow-bunker-300 px-6 my-10 rounded-xl md:min-w-64 text-left">
        <h2 className="py-6 font-semibold text-lg">Recommended</h2>
        <div className="flex flex-col justify-items-center text-left gap-4 pb-6">
          {recommendedBooks.length === 0 ? (
            <p className="text-bunker-400">No recommended books</p>
          ) : (
            recommended.map((book, index) => (
              <div key={book.id} className="flex items-center gap-5">
                <img
                  src={book.cover_image_url}
                  className="w-12 md:w-16 max-h-15 md:max-h-20 object-cover"
                  alt={book.title}
                />
                <p className="font-bold">{index + 1}</p>{" "}
                <div className="text-bunker-400">
                  <p>{book.category.name}</p>
                  <p className="text-bunker-950 font-semibold">{book.title}</p>
                  <p className="text-sm">by {book.author.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};

export default Recommendations;
