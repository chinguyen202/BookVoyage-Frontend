import { BookList } from '../../../features/books';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
