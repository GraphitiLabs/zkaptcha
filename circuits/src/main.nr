// imports
use dep::std;

fn main(
    preimage: [u8; KAPTCHA_LEN],
    kaptcha_hash: [u8; HASH_LEN],
    pkey: Field
) {
    let hashed_pre = std::hash::sha256(preimage);
    constrain kaptcha_hash == hashed_pre;
    constrain pkey == pkey;
}