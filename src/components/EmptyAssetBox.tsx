import { AspectRatio, Skeleton } from "@chakra-ui/react";
import CommonBox from "./CommonBox";

function EmptyAssetBox() {
    return (
        <CommonBox>
            <AspectRatio ratio={1}>
                <Skeleton width="100%" rounded="lg" />
            </AspectRatio>
        </CommonBox>
    );
}

export default EmptyAssetBox;