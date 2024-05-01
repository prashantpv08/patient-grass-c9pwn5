import React, { useState, useEffect } from "react";

export const useProduct = () => {
  const [products, setProducts] = useState({
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts((prevState) => ({
          ...prevState,
          data: res.products,
          loading: false,
        }));
      })
      .catch((e) => {
        console.error("Failed to fetch data", e);
        setProducts((prevState) => ({
          ...prevState,
          error: e.toString(),
          loading: false,
        }));
      });
  }, []);

  return products;
};
