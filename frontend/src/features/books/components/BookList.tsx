import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Book, Category } from '../../../app/models';
import { BookCard } from '../index';
import { useGetBooksQuery } from '../api/bookApi';
import { setBook } from '../../../storage/redux/bookSlice';
import { Loading } from '../../../app/layout';
import { RootState } from '../../../storage/redux/store';
import { useGetCategoriesQuery } from '../../categories/api/categoryApi';
import { SortTypes } from '../../../utility';

const BookList = () => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { data, isLoading } = useGetBooksQuery(null);
  const { data: categoryList } = useGetCategoriesQuery(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortName, setSortName] = useState(SortTypes.NAME_A_Z);
  // Sort options
  const sortOptions: Array<SortTypes> = [
    SortTypes.NAME_A_Z,
    SortTypes.NAME_Z_A,
    SortTypes.PRICE_HIGH_LOW,
    SortTypes.PRICE_LOW_HIGH,
  ];
  // Get search value
  const searchValue = useSelector((state: RootState) => state.bookStore.search);

  useEffect(() => {
    if (data) {
      const tempArray = handleFilters(sortName, selectedCategory, searchValue);
      setBooks(tempArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data));
      setBooks(data);
      const tempCategoryList = ['All'];
      categoryList.forEach((item: Category) => {
        // If the temp array does not contain the category, add it
        if (tempCategoryList.indexOf(item.name) === -1) {
          tempCategoryList.push(item.name);
        }
      });
      setCategories(tempCategoryList);
    }
  }, [isLoading]);
  // Handle user choose sorting type
  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setBooks(tempArray);
  };
  // Handle user choose category name
  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll('.custom-buttons');
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add('active');
        if (index === 0) {
          localCategory = 'All';
        } else {
          localCategory = categories[index];
          setSelectedCategory(localCategory);
          const tempArray = handleFilters(sortName, localCategory, searchValue);
          setBooks(tempArray);
        }
      } else {
        button.classList.remove('active');
      }
    });
  };

  const handleFilters = (
    sortType: SortTypes,
    category: string,
    search: string
  ) => {
    // if category is "All" => return all books
    // else return book filters with category
    let tempArray =
      category === 'All'
        ? [...data]
        : data.filter(
            (item: Book) =>
              item.category.name.toLowerCase() === category.toLowerCase()
          );

    // search
    if (search) {
      const tempSearchBooks = [...tempArray];
      tempArray = tempSearchBooks.filter((item: Book) =>
        item.title.toUpperCase().includes(search.toUpperCase())
      );
    }
    // Sort
    if (sortType === SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: Book, b: Book) => a.unitPrice - b.unitPrice);
    }
    if (sortType === SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: Book, b: Book) => b.unitPrice - a.unitPrice);
    }
    if (sortType === SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: Book, b: Book) =>
          a.title.toUpperCase().charCodeAt(0) -
          b.title.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: Book, b: Book) =>
          b.title.toUpperCase().charCodeAt(0) -
          a.title.toUpperCase().charCodeAt(0)
      );
    }
    return tempArray;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categories.map((categoryName: string, index: number) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && 'active'
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: 'auto' }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType: string, index: number) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {books != null &&
        books.length > 0 &&
        books?.map((book: Book, index: number) => (
          <BookCard book={book} key={index} />
        ))}
    </div>
  );
};

export default BookList;
