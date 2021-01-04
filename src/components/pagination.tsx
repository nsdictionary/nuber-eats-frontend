import React, { Dispatch, SetStateAction } from "react";

interface IPaginationProps {
  page: number;
  totalPages: number | null | undefined;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: React.FC<IPaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
      {page > 1 ? (
        <button
          onClick={onPrevPageClick}
          className="focus:outline-none font-medium text-2xl"
        >
          &larr;
        </button>
      ) : (
        <div></div>
      )}
      <span>
        Page {page} of {totalPages}
      </span>
      {page !== totalPages ? (
        <button
          onClick={onNextPageClick}
          className="focus:outline-none font-medium text-2xl"
        >
          &rarr;
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
