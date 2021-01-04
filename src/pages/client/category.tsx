import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";
import { PAGE_OFFSET } from "../../constants";
import { Helmet } from "react-helmet-async";
import { Restaurant } from "../../components/restaurants";
import React, { useState } from "react";
import { Pagination } from "../../components/pagination";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(data: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  const { slug } = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug,
          offset: PAGE_OFFSET,
        },
      },
    }
  );

  return (
    <div>
      <Helmet>
        <title>{slug} | Nuber Eats</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <h2 className="mt-3 text-center text-2xl">{slug}</h2>
          <div className="grid mt-10 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.category.restaurants &&
              data.category.restaurants.map((restaurant) => (
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
            totalPages={data?.category.totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};
