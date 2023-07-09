import{ useState } from 'react';
import { DataService } from '../../services/DataService';

interface AddProductProps {
  dataService: DataService;
}

const AddProduct: React.FC<AddProductProps> = ({ dataService }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [submitResult, setSubmitResult] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && price) {
      const id=dataService?.addProduct(title, parseFloat(price), image || undefined);
      setSubmitResult(` product created with id ${id}`);

      setTitle('');
      setPrice('');
      setImage(null);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="border rounded p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          className="border rounded p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-4">
        Create Product
      </button>
    </form>
    {submitResult? <h3>{submitResult}</h3>: undefined}
    </>
  );
};

export default AddProduct;
