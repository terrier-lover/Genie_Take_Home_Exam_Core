import {
    Text,
    Image,
} from '@chakra-ui/react';
import { AssetDataType } from "../utils/useSwrAssets";
import CommonBox from "./CommonBox";

function AssetBox({ asset }: { asset: AssetDataType }) {
    return (
        <CommonBox href={asset.url}>
            <Image
                rounded="lg"
                src={asset.imageUrl}
                alt={`NFT ${asset.tokenId}`} // TODO: fill in
            />
            <Text 
                fontSize="x-small"
                rounded="md" 
                padding="4px" 
                color="black.400" 
                backgroundColor="whiteAlpha.400"
                top="6px"
                left="6px"
                position="absolute"
            >
                #{asset.tokenId}
            </Text>
        </CommonBox>
    );
}

export default AssetBox;