import hashlib
import sys


def sha256(byte_array):
    # Create a SHA-256 hash object
    sha256 = hashlib.sha256()

    # Update the hash object with the byte array
    sha256.update(byte_array)

    # Get the hexadecimal representation of the hash value
    hex_digest = sha256.hexdigest()

    # Return the hash value as a string
    return hex_digest

def pederson(byte_array):
    # todo: implement pederson hash for testing
    ...

PROGRAM_NAME = "test_hash.py"

if __name__ == "__main__":
    # note: doesn't work with empty inputs.
    if len(sys.argv) == 1:
        a = input("hex bytearray (ex: 6fa3): ")
    elif len(sys.argv) == 2:
        a = sys.argv[1]
        # todo: check if it is string for ease of use
        # if "\"" in a:
        #     a = a[1:-1]
        #     print(sha256([elem.encode("hex") for elem in a]))
        #     sys.exit(0)
    else:
        print(f"usage: python3 {PROGRAM_NAME} or python3 {PROGRAM_NAME} <hex>")

    if len(a) % 2 != 0:
        print("invalid hex input")
        exit(1)

    # parse if real hex value
    hx = int(a, 16)
    hx_hex = hex(hx)
    # trick. converts to string which is prepended with "0x". Need to remove the
    # first two chars.
    h = sha256(bytearray.fromhex(hx_hex[2:]))

    print(h)
