/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurant
// ====================================================

export interface restaurant_restaurant_results_category {
  __typename: "Category";
  name: string;
}

export interface restaurant_restaurant_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: restaurant_restaurant_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurant_restaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  results: restaurant_restaurant_results | null;
}

export interface restaurant {
  restaurant: restaurant_restaurant;
}

export interface restaurantVariables {
  input: RestaurantInput;
}
