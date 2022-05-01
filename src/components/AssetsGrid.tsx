import { Alert, AlertIcon } from '@chakra-ui/react';
import useSwrAssets from '../utils/useSwrAssets';
import EmptyAssetBox from './EmptyAssetBox';
import CommonGrid from './CommonGrid';
import ErrorToast from './ErrorToast';
import AssetBox from './AssetBox';
import InfiniteLoader from './InfiniteLoader';

const EMPTY_BOXES = Array.from(Array(20).keys()).map(
    key => <EmptyAssetBox key={`empty-asset-box-${key}`} />
);
// After API returns value, it is possible that it does not contain expected data.
// In this case, usually the code is not 200 (code=500 is observed so far)
const OK_RESPONSE_CODE = 200;

function CollectionAndAssetsGridLayout({ address }: { address: string | null }) {
    const {
        isLoading,
        isError,
        isValidating,
        responses,
        size,
        setSize,
    } = useSwrAssets({ address });

    if (address == null) {
        // Initial state. It does not show anything.
        return <></>;
    }

    const hasAssets = responses.some(
        response => (response.data?.length ?? 0) > 0
    );
    if (responses.length > 0 && !hasAssets) {
        return (
            <Alert status='info'>
                <AlertIcon /> No results available.
            </Alert>
        );
    }

    const boxes = responses.map((response, responseIdx) => {
        if (response.code !== OK_RESPONSE_CODE) {
            return [];
        }
        return response.data.map(
            (asset, assetIdx) => {
                return <AssetBox asset={asset} key={`asset-box-${responseIdx}-${assetIdx}`} />;
            },
        );
    }).flat();
    const lastAsset = responses.length > 0 ? responses[responses.length - 1] : null;
    const hasNext = lastAsset?.hasNext ?? false;
    const hasError = isError || (lastAsset != null && lastAsset.code !== OK_RESPONSE_CODE);
    const collectionName = lastAsset?.collection?.collectionSymbol ?? '';

    console.log('isLoading', isLoading);
 
    return (
        <>
            <ErrorToast
                hasError={hasError}
                collectionName={collectionName}
            />
            <CommonGrid paddingTop={4}>
                {boxes}
                {isLoading && !hasAssets && EMPTY_BOXES}
            </CommonGrid>
            {hasAssets &&
                <InfiniteLoader
                    currentSize={size}
                    setSize={setSize}
                    hasNext={hasNext}
                    isLoading={isLoading}
                    isValidating={isValidating}
                />
            }
        </>
    );
}

export default CollectionAndAssetsGridLayout;