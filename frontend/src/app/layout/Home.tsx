import { BookList } from '../../features/books';

const Home = () => {
  return (
    <div>
      <div className="container p-2">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
