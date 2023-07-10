import { useEffect, useState } from "react";
import axios from "../api/axios";

const useFetch = () => {
  const [data, setData] = useState({
    slug: "",
    results: [],
  });

  useEffect(() => {
    if (data.slug !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await axios.get(
              `/stations?` + new URLSearchParams({ station: data.slug })
            );
            setData({ ...data, results: res.data });
          } catch (err) {
            console.log(err);
          }
        };
        fetch();
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [data.slug]);

  return { data, setData };
};

export default useFetch;
