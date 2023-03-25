import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

const hasha = "0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb";
const hashb = "0x3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d";

function fileToValues(path: string): string[][] {
	const fileData = fs.readFileSync(path, 'utf-8');
	const lines = fileData.split('\n');
	const nonEmptyLines = lines.filter((line) => line.trim() !== '');
	const lineArrays = nonEmptyLines.map((line) => [line]);
	return lineArrays;
}

// (1)
const values = fileToValues("test_inputs.txt");
console.log(values);

// (2)
const tree = StandardMerkleTree.of(values, ["bytes32"]);

// (3)
console.log('Merkle Root:', tree.root);
console.log(tree.getProof(["0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"]));
console.log(tree.getProof(["0x3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d"]));



// (4)
// fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));