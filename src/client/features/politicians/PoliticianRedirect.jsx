import React from "react";
import { useParams } from "react-router";
import { useGetPoliticianIdByNameQuery } from "./slices/politicianSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function PoliticianRedirect() {
  const { name, isloading: isloading2 } = useParams();
  if (isloading2) {
    return <h1 className="loading">redirecting</h1>;
  }
  const { data: politician, isloading } = useGetPoliticianIdByNameQuery(name);
  if (isloading) {
    return <h1>redirecting</h1>;
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (politician) {
      navigate(`/politicians/${politician?.id}`);
    }
  }, [politician, navigate]);
  return (
    <div className="politicians-redirect">
      We're sorry! Unfortunatetly the politician you are looking for is not in
      our database.
    </div>
  );
}
