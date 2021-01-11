import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";
import { Dish } from "../../components/dish";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(data: $input) {
      ok
      error
      results {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(data: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams<IRestaurantParams>();
  const { data } = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: { input: { restaurantId: +id } },
  });

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };
  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name == option.name)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [option, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
  };
  console.log(orderItems);

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.results?.name || ""} | Nuber Eats</title>
      </Helmet>
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
      <div className="container pb-32 flex flex-col items-end mt-20">
        <button onClick={triggerStartOrder} className="btn px-10">
          {orderStarted ? "Ordering" : "Start Order"}
        </button>
        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.results?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <span
                  onClick={() =>
                    addOptionToItem
                      ? addOptionToItem(dish.id, {
                          name: option.name,
                        })
                      : null
                  }
                  className={`flex border items-center ${
                    isOptionSelected(dish.id, option.name)
                      ? "border-gray-800"
                      : ""
                  }`}
                  key={index}
                >
                  <h6 className="mr-2">{option.name}</h6>
                  <h6 className="text-sm opacity-75">(${option.extra})</h6>
                </span>
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
