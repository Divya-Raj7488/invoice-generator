import axios from "axios";
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
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);
  const [genInvoice, setGenInvoice] = useState(false);

  const addMore = () => {
    const newProduct: Product = {
      productName: productName,
      productQuantity: productQuantity,
      productRate: productRate,
      total: parseInt(productRate) * parseInt(productQuantity),
      totalWithGST: parseInt(productRate) * parseInt(productQuantity) * 1.18,
    };
    console.log(DataColleted);
    setDataCollected((prev: Product[]) => [...prev, newProduct]);
    setproductName("");
    setProductQuantity("");
    setProductRate("");
    console.log(DataColleted);
    return true;
  };

  const EnableDownload = async () => {
    const updateData = addMore();
    if (updateData) {
      //enable download btn
      setGenInvoice(true);
    } else {
      console.log("error occured while updating DataCollected state");
    }
  };
  const generateInvoice = async () => {
    try {
      console.log(DataColleted);
      const response = await axios({
        method: "POST",
        data: DataColleted,
        url: "http://localhost:3000/create-product",
        withCredentials: true,
      });
      if (response) {
        // extract pdf from response and show it.
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
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
            onClick={EnableDownload}
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
          {genInvoice && (
            <button
              className="w-32 h-10 rounded-lg bg-yellow-500 text-lg text-slate-800 font-medium"
              onClick={generateInvoice}
            >
              Generate pdf
            </button>
          )}
        </div>
        <div>
          {/* {DataColleted.length > 0 && DataColleted.map(() =>{})} */}
        </div>
      </div>
      {isPdfGenerated === true && (
        <div className="w-80 h-96 flex flex-col justify-center items-center rounded-3xl gap-3 loginForm">
          {/* show generated pdf here */}
          <div></div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
