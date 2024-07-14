import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
//  const externalContracts = {
//     {
//         TOKEN: {
//             address: "0x808456652fdb597867f38412077A9182bf77359F",
//             abi: [],
//         },
//     },
//  } as const;
const externalContracts = {} as const;

export default externalContracts satisfies GenericContractsDeclaration;
