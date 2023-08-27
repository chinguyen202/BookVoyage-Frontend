import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { withAdmin } from '../../../HOC';
import { inputHelper, toastNotify } from '../../../utility';
import { useGetCategoriesQuery } from '../../categories/api/categoryApi';
import { useGetAuthorsQuery } from '../../authors/api/authorApi';
import { Author, Category } from '../../../app/models';
import { useCreateBookMutation, useGetBookByIdQuery } from '../api/bookApi';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../../../app/layout';
import AuthorMultiSelect from '../components/AuthorSelect';

const bookData: {
  title: string;
  isbn: string;
  unitPrice: string;
  unitInStock: string;
  summary: string;
  yearOfPublished: string;
  categoryId: string;
  authorIds: string[];
} = {
  title: '',
  isbn: '',
  unitPrice: '',
  unitInStock: '',
  summary: '',
  yearOfPublished: '',
  categoryId: '',
  authorIds: [],
};

const UpsertBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);
  const [imageToBeStore, setImageToBeStore] = useState<any>();
  const [imageToBeDisplay, setImageToBeDisplay] = useState<any>();
  const [bookInputs, setBookInputs] = useState(bookData);
  const [loading, setLoading] = useState(false);
  const { data: categoryList } = useGetCategoriesQuery(null);
  const { data: authorList } = useGetAuthorsQuery(null);
  const [createBook] = useCreateBookMutation();
  const { data } = useGetBookByIdQuery(bookId);

  useEffect(() => {
    if (data) {
      const tempData = {
        title: data.title,
        isbn: data.isbn,
        unitPrice: data.unitPrice,
        unitInStock: data.unitInStock,
        summary: data.summary,
        yearOfPublished: data.yearOfPublished,
        categoryId: data.category.id,
        authorIds: data.authors.map((author: Author) => author.id), // Assuming authors is an array of Author objects
      };
      setBookInputs(tempData);
    }
  }, [data]);
  const handleAuthorSelectionChange = (selectedIds: string[]) => {
    setSelectedAuthorIds(selectedIds);
    console.log(selectedAuthorIds);
  };
  // Handle the user's input
  const handleDataInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const tempData = inputHelper(e, bookInputs);
    setBookInputs(tempData);
    console.log(bookInputs);
  };

  // Function to handle image upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //Get the first file
    const file = e.target.files && e.target.files[0];
    // validate the file
    if (file) {
      const imageType = file.type.split('/')[1];
      const validImgTypes = ['jpeg', 'jpg', 'png', 'wepb'];
      // Validate image types
      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imageType;
      });
      // Validate file size & types
      if (file.size > 1000 * 1024) {
        setImageToBeStore('');
        toastNotify('File must be less than 1 MB', 'error');
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToBeStore('');
        toastNotify('File must be in jpeg, jpg, wepb or png', 'error');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToBeDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToBeStore) {
      toastNotify('Please upload an image', 'error');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('Id', '');
    formData.append('Title', bookInputs.title);
    formData.append('ISBN', bookInputs.isbn);
    formData.append('UnitPrice', bookInputs.unitPrice);
    formData.append('UnitInStock', bookInputs.unitInStock);
    formData.append('Summary', bookInputs.summary);
    formData.append('YearOfPublished', bookInputs.yearOfPublished);
    formData.append('File', imageToBeStore);
    formData.append('CategoryId', bookInputs.categoryId);
    // formData.append('AuthorIds', bookInputs.authorIds);
    const response: any = await createBook(formData);
    console.log(response);
    if ('data' in response) {
      setLoading(false);
      navigate('/books/bookList');
    } else {
      toastNotify(response.data.title, 'error');
    }
    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <Loading />}
      <h3 className=" px-2 text-dark">Add book</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              required
              name="title"
              value={bookInputs.title}
              onChange={handleDataInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter book summary"
              rows={10}
              name="summary"
              value={bookInputs.summary}
              onChange={handleDataInput}
            ></textarea>
            <input
              type="text"
              className="form-control"
              placeholder="Enter price per book"
              required
              name="unitPrice"
              value={bookInputs.unitPrice}
              onChange={handleDataInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter number of books in stock"
              required
              name="unitInStock"
              value={bookInputs.unitInStock}
              onChange={handleDataInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter ISBN"
              required
              name="isbn"
              value={bookInputs.isbn}
              onChange={handleDataInput}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter year of published"
              required
              name="yearOfPublished"
              value={bookInputs.yearOfPublished}
              onChange={handleDataInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            {categoryList != null && (
              <select
                className="form-control form-select"
                required
                value={bookInputs.categoryId}
                name="categoryId"
                onChange={handleDataInput}
              >
                <option value=""> --Select category --</option>
                {categoryList?.map((category: Category, index: number) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            {/* create a select display to get an array of */}
            {authorList != null && (
              <select
                className="form-control form-select mt-3"
                multiple
                value={selectedAuthorIds}
                name="authorIds"
                onChange={handleDataInput}
              >
                {authorList?.map((author: Author, index: number) => (
                  <option value={author.id} key={index}>
                    {author.fullName}
                  </option>
                ))}
              </select>
            )}
            <div className="row">
              <div className="text-center">
                <button
                  type="submit"
                  style={{ width: '50%' }}
                  className="btn btn-dark mt-5"
                >
                  Submit
                </button>
              </div>
              <div>
                <a
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary form-control mt-3"
                >
                  Previous page
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToBeDisplay ?? 'https://placehold.co/400'}
              style={{ width: '100%', borderRadius: '30px' }}
              alt="placeholder"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default withAdmin(UpsertBook);
