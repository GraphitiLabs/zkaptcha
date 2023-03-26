from pymerkle import MerkleProof, MerkleTree
from web3 import Web3
from hashlib import sha256

def remove_0x_prefix(s):
    return s[2:]

data: bytes = b"ab"
commitment: bytes = Web3.soliditySha3(['bytes32', 'bytes32'], [b'3ac225168df54212a25c1c01fd35bebfea408fdac2e31ddd6f80a4bbf9a5f1cb', b'b5553de315e0edf504d9150af82dafa5c4667fa618ed0a6f19c69b41166c5510'])
print(remove_0x_prefix(commitment.hex()))

sha256 = sha256()
sha256.update(b'')
hex_digest = sha256.hexdigest()
print(f"{hex_digest=}")

mt = MerkleTree(algorithm="keccak256", security=False)

preimages = [b'a', b'b', b'c', b'd']
for p in preimages:
	res = mt.append_entry(p)
	print(f"{p}: = {res}")

# mt.build_proof(2,
# mt.generate_inclusion_path(res)
a = mt.prove_inclusion(b'c').serialize()
print(a)
