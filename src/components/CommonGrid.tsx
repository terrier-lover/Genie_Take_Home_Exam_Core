import { SimpleGrid } from "@chakra-ui/react";

function CommonGrid({ 
    paddingTop,
    children 
}: { 
    paddingTop?: number,
    children: React.ReactNode 
}) {
    return (
        <SimpleGrid columns={5} spacing={5} paddingTop={paddingTop}>
            {children}
        </SimpleGrid>
    );
}

export default CommonGrid;