import { useState, useEffect } from "react";
import axios from "axios";
import DataModel from "../models/user";

export default function Read() {
  const [readData, setreadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:5000/readfromserver")
          .then((datamodal) => setreadData(datamodal.data));
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        {readData.map((data) => {
          {
            return data.content;
          }
        })}
      </div>
    </>
  );
}
