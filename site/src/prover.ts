import { BarretenbergWasm } from '@noir-lang/barretenberg/dest/wasm';
import { SinglePedersen } from '@noir-lang/barretenberg/dest/crypto/pedersen';
import { compile, acir_from_bytes } from '@noir-lang/noir_wasm';
import { setup_generic_prover_and_verifier, create_proof, verify_proof, StandardExampleProver, StandardExampleVerifier } from '@noir-lang/barretenberg/dest/client_proofs';
import { serialise_public_inputs } from '@noir-lang/aztec_backend';
const pathname = "../../circuits/src/main.nr"
import { resolve, join } from 'path';

console.log("test");

// 1_mul.ts
let p = resolve(__dirname, '../../circuits/src/main.nr');
console.log(p);
let compiled_program = compile(p);


