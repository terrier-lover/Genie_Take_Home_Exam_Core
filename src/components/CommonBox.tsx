import { Box, LinkBox, LinkOverlay } from "@chakra-ui/react";

const COMMON_PROPS = {
    width: "100%",
    rounded: "lg",
    boxShadow: "2xl",
};

function CommonBox({
    children,
    href,
}: {
    children: React.ReactNode
    href?: string,
}) {
    if (href == null) {
        return <Box {...COMMON_PROPS}>{children}</Box>
    }

    return (
        <LinkBox
            {...COMMON_PROPS}
            position="relative"
        >
            <LinkOverlay href={href} isExternal={true}>
                {children}
            </LinkOverlay>
        </LinkBox>
    );
}

export default CommonBox;