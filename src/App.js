import { useEffect, useState } from "react";

// styles
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClick = () => {
    const filterData = data?.products.filter((item) => {
      return item[search].toLowerCase().includes(input);
    });

    setData((prev) => ({
      ...prev,
      products: filterData,
    }));
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/products?limit=100");
      // convert data to json
      const json = await data.json();
      setData(json);
    };

    fetchData().catch(console.error());
  }, []);

  return (
    <div className="App">
      <br />
      <div className="header">
        <span>HUYNH</span>
        <select name="search" id="search" onChange={(e) => onChange(e)}>
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="brand">Brand</option>
          <option value="desc">Description</option>
        </select>
        <input type="search" onChange={(e) => onChangeInput(e)} />
        <button type="button" onClick={handleOnClick}>
          Search
        </button>
      </div>
      <br />
      <div className="table-list">
        <table>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
          </tr>
          {data?.products.map(
            ({ title, brand, description, price, rating, stock }, index) => (
              <tr>
                <td>{index}</td>
                <td>{title}</td>
                <td>{brand}</td>
                <td>{description}</td>
                <td>${price}</td>
                <td>{rating}</td>
                <td>{stock}</td>
              </tr>
            )
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
