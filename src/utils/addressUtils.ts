import { utils } from 'ethers';

/*
 * Check if the given address is legit or not. 
 */
function isLegitAddress(address: string) {
    return utils.isAddress(address);
}

/*
 * The Genie API (https://v2.api.genie.xyz/assets) seems to suport lowercase address.
 * API does not support following values, but they should be convereted into lower case address with hex value (0x).
 * - Non-hex contract value such as 497a9a79e82e6fc0ff10a16f6f75e6fcd5ae65a8
 * - Checksumed address such as 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
 */
function converToAPIFriendlyAddress(address: string) {
    if (!isLegitAddress(address)) {
        throw Error('Wrong address format');
    }

    let convertedStr = address;
    if (!utils.isHexString(convertedStr)) {
        convertedStr = `0x${convertedStr}`;
    }

    return convertedStr.toLowerCase();
}

export { isLegitAddress, converToAPIFriendlyAddress };