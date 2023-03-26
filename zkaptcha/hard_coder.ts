import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

const hasha = "0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb";
const hashb = "0x8254c329a92850f6d539dd376f4816ee2764517da5e0235514af433164480d7a";

function fileToValues(path: string): string[][] {
	const fileData = fs.readFileSync(path, 'utf-8');
	const lines = fileData.split('\n');
	const nonEmptyLines = lines.filter((line) => line.trim() !== '');
	const lineArrays = nonEmptyLines.map((line) => [line]);
	return lineArrays;
}

// (1)
const values = fileToValues("hashes.txt");

// (2)
const tree = StandardMerkleTree.of(values, ["bytes32"]);

// (3)
console.log('Merkle Root:', tree.root);
// console.log(tree.getProof([process.argv[2]]))
values.map(v => console.log(JSON.stringify({[v.join('')]: tree.getProof(v)})));

// console.log(tree.getProof());



// (4)
// fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));