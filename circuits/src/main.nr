//
// zk circuits for zkaptcha
// Authors: Andrew Magid and Ketan Jog
// Company: Graphiti, Inc.
// License: Proprietary.
//

// imports
use dep::std;

// globals
// todo: change this later to whatever length captcha we decide
global KAPTCHA_LEN: comptime Field = 1;
global HASH_LEN: comptime Field = 32; // 32 * 8 == 256

// step1: pre-image of hash
fn main(preimage: [u8; KAPTCHA_LEN], hash: [u8; HASH_LEN]) {
    let hashed_pre = std::hash::sha256(preimage);

    // debug
    std::println(preimage);
    std::println(hashed_pre);

    // check that we know preimage of the hash
    constrain hashed_pre == hash;
}

// fn validate_preimage() {
// }