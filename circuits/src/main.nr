//
// zk circuits for zkaptcha
// Authors: Andrew Magid and Ketan Jog
// Company: Graphiti, Inc.
// License: Proprietary.
//

// imports
use dep::std;

// globals
global KAPTCHA_LEN: comptime Field = 6;     // todo: depends on length of kaptcha
// global MERKLE_DEPTH: comptime Field = 2;    // todo: depends on size of merkle tree ie. ceil(log2(n))
global HASH_LEN: comptime Field = 32;       // 32 * 8 == 256. DO NOT CHANGE.

// fn main(root : pub Field, index : Field, hash_path : [Field; 3], secret: Field, priv_key: Field) {
//     constrain index == index;

//     let pubkey = std::scalar_mul::fixed_base(priv_key);
//     let pubkey_x = pubkey[0];
//     let pubkey_y = pubkey[1];
//     let note_commitment = std::hash::pedersen([pubkey_x, pubkey_y, secret]);

//     let root = std::merkle::check_membership(root, note_commitment[0], index, hash_path);
//     std::println(root);

//     let z = root.to_le_bytes(4);
//     constrain z == z;
// }

// fn main(pkey: Field) {
//     let h = std::hash::pedersen([pkey])[0];
//     std::println(h);
// }

fn main(
    preimage: [u8; KAPTCHA_LEN],
    kaptcha_hash: [u8; HASH_LEN],
    // kaptcha_hash: Field,
    pkey:  Field
// ) -> [u64; 4] {
) {
    // let mut kh_buf: [u8; 32] = [0; 32];
    // let kh_bytes = kaptcha_hash.to_le_bytes(4);
    // std::println(kh_bytes);
    // for i in 0..32 {
    //     kh_buf[i] = kh_bytes[i];
    // }
    let hashed_pre = std::hash::sha256(preimage);
    constrain kaptcha_hash == hashed_pre;
    constrain pkey == pkey;
    // constrain hashed_pre == kh_buf;
    // constrain kh_bytes == kh_bytes;
    // let b: u64 = 2 ^ 0;
    // std::println(b);
    // let fa: Field = a2fa(kaptcha_hash);
    // let fa = a2f(kaptcha_hash);
    // let htf = std::hash::hash_to_field(fa);
    // htf
    // let mut buf: [u64; 4] = [0; 4];
    // for i in 0..4 {
    //     for j in 0..8 {
    //         buf[i] = buf[i] ^ ((kaptcha_hash[i*8 + j] as u64) << 8*(7-j as u64));
    //     }
    // }
    // buf
    // let mut b: u64 = 0;
    // b = b ^ kaptcha_hash[0] as u64;
    // b = b ^ ((kaptcha_hash[1] as u64) << 8);
    // std::println(b);
}

// fn a2fa(h: [u8; 32]) -> Field {
//     let mut res: u32 = 0;
//     for i in 0..32 {
//         res & 32;
//     }
// }

// fn main(
//     // preimage: [u8; KAPTCHA_LEN],
//     // kaptcha_hash: pub Field,
// ) {
//     std::println(a);
//     // constrain a == a;
// }

fn a2f (xs: [u8; 32]) -> [Field;32] {
    let mut res = [0; 32];
    for i in 0..32 {
        let a = xs[i] as Field;
        res[i] = xs[i] as Field;
        std::println(a);
    }
    res
}

// step1: pre-image of hash
// fn main(
//     preimage: [u8; KAPTCHA_LEN],    // todo: could this be a Field?
//     kaptcha_hash: [u8; HASH_LEN],   // todo: could this be a Field?
//     kaptcha_hash_as_field: Field,
//     root: pub Field, // pub bc need check in SC that merkle root is identical to the one stored
//     index: Field, // refers to the leaf node number when ordered 0 to n (left-to-right)
//     hash_path: [[u8; 32]; MERKLE_DEPTH],
//     ) {

//     let hashed_pre = std::hash::sha256(preimage);

//     // debug
//     std::println(preimage);
//     std::println(hashed_pre);

//     // preimage of the hash is known
//     constrain hashed_pre == kaptcha_hash;

//     // assume that leaf nodes hold hashes of the kaptchas
//     let is_member: bool = check_membership_in_noir_with_sha(root,
//         kaptcha_hash_as_field, index, hash_path) as bool;

//     // std::println(is_member);

//     constrain is_member == true;
// }

// fn main(preimage: [u8; KAPTCHA_LEN], kaptcha_hash: [u8; 32], root: [u8;32], leaf: [u8; 32], index: Field, hashpath: [u8; 32*MERKLE_DEPTH]) {
// fn main(preimage: [u8; KAPTCHA_LEN], kaptcha_hash: [u8; 32]) {
//     // let a = 4.to_le_bytes(4);
//     // let inp = 3;
//     // let b = std::hash::sha256([inp]);
//     // let c = 15002.to_le_bytes(4 as u32);
//     // let mut d: [u8; 32] = [0; 32];
//     // for i in 0..32 {
//     //     d[i] = c[i];
//     // }
//     // std::println(d);
//     // let a: [u8; 32] =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
//     // std::println(a);
//     // check_membership_in_noir_with_sha(1, 1, 0,
//     //     [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]);
//     std::println(preimage);
//     let h = std::hash::sha256(preimage);
//     // std::println(h);
//     constrain h == kaptcha_hash;
//     // std::println(hashpath);

//     // check_membership_in_noir_with_sha(root, leaf, index, hashpath);

// }

// fn slicer32(src: [u8], mut buf: [u8; 32]) -> [u8; 32] {
//     // will fail if len<32!
//     for i in 0..32{
//         buf[i] = src[i];
//     }
//     buf
// }

// what do we need.
// preimage -> string converted to bytearray [n length]
// kaptcha hash -> bytearray [32]
// root -> bytearray [32]
// index -> Field
// hash_path -> bytearray [32 * k]
// inputs: hashpath = array of [u8; 32]. Or, [u8; 32*depth].
// comparing sha is comparing arrays.


// fn check_membership_in_noir_with_sha(root : [u8; 32], leaf : [u8;32], index : Field, hashpath: [u8; HASH_LEN * MERKLE_DEPTH]) -> Field {
//     // let mut bf: [u8; 32] = [0; 32];
//     // let root_arr = root.to_le_bytes(4 as u32);
//     // for i in 0..32 {
//     //     bf[i] = root_arr[i];
//     // }
//     std::println(root);
//     std::println(leaf);
//     // std::println(index);
//     constrain index == 2;
//     std::println(hashpath);
//     // let root_bytearr: [u8; 32] =
//     (compute_root_from_leaf(leaf, index, hashpath) == root) as Field
// }

// fn compute_root_from_leaf(leaf : [u8; 32], index : Field, hash_path: [u8; HASH_LEN * MERKLE_DEPTH]) -> [u8; 32] {
//     let index_bits = index.to_le_bits(MERKLE_DEPTH as u32);
//     let mut current: [u8; 32] = leaf;
//     for i in 0..MERKLE_DEPTH {
//         let path_bit = index_bits[i] as bool;
//         let mut hash_buf: [u8; 64] = [0; 64];

//         if path_bit {

//         }
//         for j in 0..32 {
//             hash_buf[j] = hash_path[0];
//         }
//         current = std::hash::sha256(hash_buf);
//     };
//     current
//     // std::println(leaf);
//     // std::println(index);
//     // std::println(hash_path);
//     // // std::println(index_bits);
//     // [0; 32]
// }

// for every depth level, we extract the next hash, find out order to load them in


// fn create_merkle_test() {
//     // consider the following merkle tree
//     //                    g
//     //                 /     \
//     //                e       f
//     //               / \     / \
//     //              a   b   c   d

//     // the values found below were created with the commented out code (kept for reproducibility)
//     // -------------------------------------------------------------

//     // for i in 0..4 {
//     //     let chr = 97+i;
//     //     std::println(chr);
//     //     let h = std::hash::pedersen([chr])[0];
//     //     std::println(h);
//     // }
//     // let a = std::hash::pedersen([97])[0];
//     // let b = std::hash::pedersen([98])[0];
//     // let c = std::hash::pedersen([99])[0];
//     // let d = std::hash::pedersen([100])[0];
//     let a = 0x290d262c5790b55b3179b59c25c0888433f8f5b56d4f92a3c5a2cf313f200e5b; // char 'a'. pederson(97)
// 	let b = 0x0bce7168de67307d31b23a52be17a39d3a4374e843af1ca9a50d5bf83983ad61; // char 'b'. pederson(98)
// 	let c = 0x0705c3624b892ad011d193cf93cb82e6d11ec89a5b63e5cb981d381137d26aef; // char 'c'. pederson(99)
// 	let d = 0x258373c361852222598d899c506cd159ae7dbcbb4f4990900a68cd18f0e85aa3; // char 'd'. pederson(100)

//     // let e = std::hash::pedersen([a, b])[0];
//     // let f = std::hash::pedersen([c, d])[0];
//     // let g = std::hash::pedersen([e, f])[0];
//     let e = 0x06cfb9b19e932ca8e4ea945b2a23f922df4a6f1ce3630ff8ac77b038726bf89a;
//     let f = 0x058a70cb82165b6adf712dd7ae020e357a23721b0b653fd70ac9a9e74597257f;
//     let g = 0x2732935f581086e000fe0845d17f08f683c1b799ffe1014143aa5ca9ffb69f6a;

//     let hashes = [a, b, c, d, e, f, g];
//     for i in hashes {
//         std::println(i);
//     }
// }
