import { Text, Center, Spinner } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

function InfiniteLoader({
    currentSize,
    setSize,
    hasNext,
    isLoading,
    isValidating,
}: {
    currentSize: number,
    setSize?: (size: number) => void,
    hasNext: boolean,
    isLoading: boolean,
    isValidating: boolean,
}) {
    const onChange = useCallback((inView: boolean, _entry: IntersectionObserverEntry) => {
        if (!inView || !hasNext) {
            return;
        }

        setSize && setSize(currentSize + 1);
    }, [currentSize, setSize, hasNext]);

    const [ref] = useInView({
        threshold: 0,
        onChange,
        trackVisibility: true,
        delay: 500,
    });

    let component = null;
    if (isLoading || isValidating) {
        component = <Spinner />;
    } else if (hasNext) {
        component = <Text fontSize="lg" color="gray.500">Scroll to load more NFTs...</Text>;
    }

    return (
        <Center ref={ref} width="100%" paddingTop={4} paddingBottom={4}>
            {component}
        </Center>
    );
}

export default InfiniteLoader;