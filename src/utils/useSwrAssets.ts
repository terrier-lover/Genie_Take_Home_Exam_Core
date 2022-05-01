import useSWRInfinite from "swr/infinite";

// Note: The following types may not be correct, and not synced with backend api.
export type AssetDataType = {
  imageUrl: string,
  url: string,
  tokenId: string,
};

export type APIResponseType = {
  code: number,
  collection: { collectionSymbol: string },
  data: AssetDataType[],
  hasNext: boolean,
  status: string,
  totalCount: number,
};

type BodyDataType = {
  filters: {
    address: string,
    notForSale: boolean,
  },
  limit: number,
  offset: number,
};

const ASSETS_URL = "https://v2.api.genie.xyz/assets";
const DEFAULT_LIMIT = 25;
const REFETCH_INTERVAL = 60 * 60 * 1000; // Ser 1 hour for the refresh interval

async function assetsFetcher(
  url: string,
  bodyData: BodyDataType
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(bodyData),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

function getBodyData(
  address: string,
  limit: number,
  offset: number
): BodyDataType {
  return {
    filters: {
      address,
      notForSale: false,
    },
    limit,
    offset,
  };
}

function makeGetKey({
  address,
  limit,
}: {
  address: string | null,
  limit: number,
}) {
  const shouldFetch = address != null;
  return (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    return [
      shouldFetch ? ASSETS_URL : null,
      getBodyData(address as string, limit, DEFAULT_LIMIT * pageIndex)
    ];
  }
}

function useSwrAssets(
  {
    address,
    limit = DEFAULT_LIMIT,
  }: {
    address: string | null,
    limit?: number,
  }
): {
  responses: APIResponseType[],
  isLoading: boolean,
  isError: boolean,
  isValidating: boolean,
  size: number,
  setSize?: (size: number) => void,
} {
  const shouldFetch = address != null;

  const { data, error, isValidating, size, setSize } = useSWRInfinite<APIResponseType>(
    makeGetKey({ address, limit }),
    assetsFetcher,
    {
      revalidateOnFocus: false, // when focus changes, it should not revalidate query
      refreshInterval: REFETCH_INTERVAL,
    },
  );

  return shouldFetch ? {
    responses: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    isValidating,
    size,
    setSize,
  } : {
    responses: [],
    isLoading: false,
    isError: false,
    isValidating: false,
    size: 0,
    setSize,
  };
}

export default useSwrAssets;