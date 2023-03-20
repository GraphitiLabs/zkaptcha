//
// zk circuits for zkaptcha
// Authors: Andrew Magid and Ketan Jog
// Company: Graphiti, Inc.
// License: Proprietary.
//

// imports
use dep::std;

// globals
global KAPTCHA_LEN: comptime Field = 1;     // todo: depends on length of kaptcha
global MERKLE_DEPTH: comptime Field = 2;    // todo: depends on size of merkle tree ie. ceil(log2(n))
global HASH_LEN: comptime Field = 32;       // 32 * 8 == 256. DO NOT CHANGE.

// step1: pre-image of hash
fn main(
    preimage: [u8; KAPTCHA_LEN],    // todo: could this be a Field?
    kaptcha_hash: [u8; HASH_LEN],   // todo: could this be a Field?
    kaptcha_hash_as_field: Field,
    root: pub Field, // pub bc need check in SC that merkle root is identical to the one stored
    index: Field, // refers to the leaf node number when ordered 0 to n (left-to-right)
    hash_path: [Field; MERKLE_DEPTH],
    ) {

    let hashed_pre = std::hash::sha256(preimage);

    // debug
    std::println(preimage);
    std::println(hashed_pre);

    // preimage of the hash is known
    constrain hashed_pre == kaptcha_hash;

    // assume that leaf nodes hold hashes of the kaptchas
    let is_member: bool = std::merkle::check_membership_in_noir(root, kaptcha_hash_as_field, index, hash_path) as bool;

    // std::println(is_member);

    constrain is_member == true;
}

fn create_merkle_test() {
    // consider the following merkle tree
    //                    g
    //                 /     \
    //                e       f
    //               / \     / \
    //              a   b   c   d

    // the values found below were created with the commented out code (kept for reproducibility)
    // -------------------------------------------------------------

    // for i in 0..4 {
    //     let chr = 97+i;
    //     std::println(chr);
    //     let h = std::hash::pedersen([chr])[0];
    //     std::println(h);
    // }
    // let a = std::hash::pedersen([97])[0];
    // let b = std::hash::pedersen([98])[0];
    // let c = std::hash::pedersen([99])[0];
    // let d = std::hash::pedersen([100])[0];
    let a = 0x290d262c5790b55b3179b59c25c0888433f8f5b56d4f92a3c5a2cf313f200e5b; // char 'a'. pederson(97)
	let b = 0x0bce7168de67307d31b23a52be17a39d3a4374e843af1ca9a50d5bf83983ad61; // char 'b'. pederson(98)
	let c = 0x0705c3624b892ad011d193cf93cb82e6d11ec89a5b63e5cb981d381137d26aef; // char 'c'. pederson(99)
	let d = 0x258373c361852222598d899c506cd159ae7dbcbb4f4990900a68cd18f0e85aa3; // char 'd'. pederson(100)

    // let e = std::hash::pedersen([a, b])[0];
    // let f = std::hash::pedersen([c, d])[0];
    // let g = std::hash::pedersen([e, f])[0];
    let e = 0x06cfb9b19e932ca8e4ea945b2a23f922df4a6f1ce3630ff8ac77b038726bf89a;
    let f = 0x058a70cb82165b6adf712dd7ae020e357a23721b0b653fd70ac9a9e74597257f;
    let g = 0x2732935f581086e000fe0845d17f08f683c1b799ffe1014143aa5ca9ffb69f6a;

    let hashes = [a, b, c, d, e, f, g];
    for i in hashes {
        std::println(i);
    }
}
