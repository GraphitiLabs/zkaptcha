
use dep::std;

fn main(a: [u8; 32]) {
    let h = std::hash::sha256(a);
    constain h == h;
}
