import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";
import React, { useEffect, useState } from "react";
import { PAGE_OFFSET } from "../../constants";
import { Restaurant } from "../../components/restaurants";
import { Pagination } from "../../components/pagination";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(data: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  const [callQuery, { loading, data }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page,
          query,
          offset: PAGE_OFFSET,
        },
      },
    });
  }, [callQuery, history, location, page]);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <h2 className="mt-3 text-center text-2xl">Search page</h2>
          <div className="grid mt-10 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.searchRestaurant.results &&
              data?.searchRestaurant.results.map((restaurant) => (
                <Restaurant
                  id={restaurant.id.toString()}
                  key={restaurant.id}
                  coverImg={restaurant.coverImg}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              ))}
          </div>
          <Pagination
            page={page}
            totalPages={data?.searchRestaurant.totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};
