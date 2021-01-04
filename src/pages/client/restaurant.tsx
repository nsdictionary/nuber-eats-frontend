import { RESTAURANT_FRAGMENT } from "../../fragments";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";
import { Helmet } from "react-helmet-async";
import React from "react";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(data: $input) {
      ok
      error
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: { input: { restaurantId: +id } },
    }
  );

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.results?.name || ""} | Nuber Eats</title>
      </Helmet>
      {!loading && (
        <div
          className=" bg-gray-800 bg-center bg-cover py-48"
          style={{
            backgroundImage: `url(${data?.restaurant.results?.coverImg})`,
          }}
        >
          <div className="bg-white w-3/12 py-8 pl-10 lg:pl-28">
            <h4 className="text-4xl mb-3">{data?.restaurant.results?.name}</h4>
            <Link to={`/category/${data?.restaurant.results?.category?.name}`}>
              <h5 className="text-sm font-light mb-2">
                {data?.restaurant.results?.category?.name}
              </h5>
            </Link>
            <h6 className="text-sm font-light">
              {data?.restaurant.results?.address}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
};
