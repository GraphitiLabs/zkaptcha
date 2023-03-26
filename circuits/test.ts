import { compile, acir_read_bytes } from '@noir-lang/noir_wasm';
import { setup_generic_prover_and_verifier, create_proof, verify_proof, create_proof_with_witness } from '@noir-lang/barretenberg/dest/client_proofs';
import { packed_witness_to_witness, serialise_public_inputs, compute_witnesses } from '@noir-lang/aztec_backend';

const compiled_program = compile("../circuits/src/main.nr");

let acir = compiled_program.circuit;
const abi = compiled_program.abi;

let [prover, verifier] = await setup_generic_prover_and_verifier(acir);

const proof = await create_proof(prover, acir, abi);

const verified = await verify_proof(verifier, proof);

expect(verified).eq(true);

// 1_mul.ts

// Imports
import { ethers } from "hardhat";
import { Contract, ContractFactory, utils } from 'ethers';

...

// Deploy verifier contract
let Verifier: ContractFactory;
let verifierContract: Contract;

before(async () => {
    Verifier = await ethers.getContractFactory("TurboVerifier");
    verifierContract = await Verifier.deploy();
});

...

// Verify proof
const sc_verified = await verifierContract.verify(proof);
expect(sc_verified).eq(true)







