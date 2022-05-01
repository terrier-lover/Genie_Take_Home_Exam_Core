import { useCallback, useState } from 'react';
import { Button, Center, Input, Stack, Text, useToast } from '@chakra-ui/react';
import AssetsGrid from './AssetsGrid';
import useSwrAssets from '../utils/useSwrAssets';
import { converToAPIFriendlyAddress, isLegitAddress } from '../utils/addressUtils';

const TOAST_ID_ADDRESS_CHECKAST_ID = 'TOAST_ID_ADDRESS_CHECK';

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [targetAddress, setTargetAddress] = useState<string | null>(null);

  const {
    isLoading,
    isValidating,
  } = useSwrAssets({ address: targetAddress });
  const toast = useToast();

  const onButtonClick = useCallback(() => {
    if (!isLegitAddress(searchText)) {
      // In case wrong address is sent
      toast({
        title: 'Address is not legit',
        description: "Please specify valid address",
        status: 'error',
        duration: null,
        isClosable: true,
      });
      return;
    }

    setTargetAddress(converToAPIFriendlyAddress(searchText));
  }, [searchText, setTargetAddress, toast]);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // Check if the input value is legit. If it is not, show the warning.
    if (input.length > 0 && !isLegitAddress(input)) {
      if (!toast.isActive(TOAST_ID_ADDRESS_CHECKAST_ID)) {
        toast({
          title: 'Address is not right format',
          description: "Please use valid address",
          status: 'warning',
          duration: null,
          isClosable: true,
          id: TOAST_ID_ADDRESS_CHECKAST_ID,
        });
      }
    } else {
      toast.closeAll();
    }

    setSearchText(input);
  }, [toast]);

  return (
    <Center paddingTop="20px">
      <Stack direction="column" width="80%">
        <Stack direction="row">
          <Text fontSize="xl" fontWeight="bold">Genie</Text> <Text fontSize="xl" color="teal">powered search</Text>
        </Stack>
        <Stack direction="row" spacing={4} align="center">
          <Input
            placeholder="Search collection by contract address"
            onChange={onInputChange}
            maxWidth="500px"
          />
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={onButtonClick}
            disabled={!isLegitAddress(searchText) || isLoading || isValidating}
            isLoading={isLoading || isValidating}
          >
            Submit
          </Button>
        </Stack>
        <AssetsGrid address={targetAddress} />
      </Stack>
    </Center>
  );
}

export default App;
