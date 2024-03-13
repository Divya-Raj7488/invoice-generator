import { useState } from "react";

interface Product {
  productName: string;
  productQuantity: string;
  productRate: string;
  total: Number;
  totalWithGST: Number;
}

const AddProduct: React.FC = () => {
  const [productName, setproductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productRate, setProductRate] = useState("");
  const [DataColleted, setDataCollected] = useState<Product[]>([]);

  const addMore = () => {
    const newProduct: Product = {
      productName: productName,
      productQuantity: productQuantity,
      productRate: productRate,
      total: parseInt(productRate) * parseInt(productQuantity),
      totalWithGST: parseInt(productRate) * parseInt(productQuantity) * 1.18,
    };
    setDataCollected((prev: Product[]) => [...prev, newProduct]);
    setproductName("");
    setProductQuantity("");
    setProductRate("");
  };
  const generateInvoice = () => {
    const newProduct: Product = {
      productName: productName,
      productQuantity: productQuantity,
      productRate: productRate,
      total: parseInt(productRate) * parseInt(productQuantity),
      totalWithGST: parseInt(productRate) * parseInt(productQuantity) * 1.18,
    };
    setDataCollected((prev: Product[]) => [...prev, newProduct]);
    //post request using axios
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-80 h-96 flex flex-col justify-center items-center rounded-3xl gap-3 loginForm">
        <h1 className="text-lg font-bold w-9/12 h-10 px-2">Add product</h1>
        <input
          type="text"
          placeholder="Name of the product"
          className="w-9/12 h-10 px-2 border"
          value={productName}
          onChange={(e) => setproductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity of product"
          className="w-9/12 h-10 px-2 border"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product rate"
          className="w-9/12 h-10 px-2 border"
          value={productRate}
          onChange={(e) => setProductRate(e.target.value)}
        />
        <div>
          <button
            className="w-28 h-10 bg-green-400 rounded-lg text-lg text-slate-800 font-medium"
            onClick={generateInvoice}
          >
            Next
          </button>{" "}
          <button
            className="w-28 h-10 rounded-lg bg-yellow-700 text-lg text-slate-800 font-medium"
            onClick={addMore}
          >
            Add More
          </button>
        </div>
        <div>
          {/* {DataColleted.length > 0 && DataColleted.map(() =>{})} */}
        </div>
      </div>
      {/* <h1>hello</h1> */}
    </div>
  );
};

export default AddProduct;
