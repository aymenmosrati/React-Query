import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState();
  const [alterEgo, setAlterEgo] = useState();
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const results = useSuperHeroesData(onSuccess, onError);

  // const results = useQuery("super-heroes", fetchSupreHeroes, {
  //   // cacheTime: 5000,
  //   // staleTime: 30000,
  //   // refetchOnMount: false, // or 'always' //  if true then send request for evry switch but false not supported
  //   // refetchOnWindowFocus: true, // or 'always' //if true is acitive when you have new update in the server but false it need to do refresh for get the new updates
  //   //refetchInterval: 2000, // false id the default value // this is the interval for fetching for evrery 2 seconds
  //   //refetchIntervalInBackground: false, // or false for
  //   // enabled: false,
  //   onSuccess,
  //   onError,
  //   select: (data) => {
  //     const superHeroNames = data.data.map((hero) => hero.name);
  //     return superHeroNames;
  //   },
  // });
  // console.log("isLoadingn", results.isLoading);
  // console.log("isFetching", results.isFetching);
  const { mutate: addHero, isLoading, isError, error } = useAddSuperHeroData();
  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };
  if (results.isLoading || results.isFetching) {
    return <h2>Loading...</h2>;
  }
  if (results.isError) {
    return <h2>{results.error.message}</h2>;
  }
  return (
    <div>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add hero</button>
      </div>
      <button onClick={results.refetch}>Fetch heroes</button>
      {results?.data?.data.map((result) => {
        return (
          <div key={result.name}>
            <Link to={`/rq-super-heroes/${result.id}`}>{result.name}</Link>
          </div>
        );
      })}

      {/* {results.data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </div>
  );
};
