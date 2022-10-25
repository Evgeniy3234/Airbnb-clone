import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Protected = () => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [content, setContent] = useState("You need to login");
const user = useSelector((store) => store.toolkit.user)

  useEffect(() => {
    async function fetchProtected() {
      const result = await axios.post(
        "http://localhost:3001/auth/protected",
        {},
        {
          withCredentials: true,
        }
      );
      if (result.data) 
      setContent(result.data.message);
    }
    fetchProtected();
  }, [user]);

  return <div>{content}</div>;
};

export default Protected;
