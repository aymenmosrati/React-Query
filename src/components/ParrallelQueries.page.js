import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSupreHeroes = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const fetchFriends = (heroId) => {
  return axios.get(`http://localhost:4000/friends`);
};

export const ParrallelQueriesPage = () => {
  const { data: superHero } = useQuery("super-heroes", fetchSupreHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  return <div>ParrallelQueriesPage</div>;
};
