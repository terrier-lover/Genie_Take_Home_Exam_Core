import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const TOAST_ID_PREFIX = 'TOAST_ID_PREFIX';

function ErrorToast({
    hasError,
    collectionName,
}: {
    hasError: boolean,
    collectionName: string,
}) {
    const toast = useToast();
    useEffect(() => {
        if (!hasError) {
            toast.closeAll();
            return;
        }

        toast({
            title: 'Loading failed',
            description: "Please scroll down again",
            status: 'error',
            duration: 5000,
            isClosable: true,
            id: `${TOAST_ID_PREFIX}-${collectionName}`,
        });
    }, [collectionName, hasError, toast]);

    // Intentionally return empty fragment
    return <></>;
}

export default ErrorToast;