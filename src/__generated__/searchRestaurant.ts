/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchRestaurant_results_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurant_searchRestaurant_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: searchRestaurant_searchRestaurant_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: searchRestaurant_searchRestaurant_results[] | null;
}

export interface searchRestaurant {
  searchRestaurant: searchRestaurant_searchRestaurant;
}

export interface searchRestaurantVariables {
  input: SearchRestaurantInput;
}
