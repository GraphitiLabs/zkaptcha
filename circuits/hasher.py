import hashlib
import sys
import json

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

def print_usage():
    print(
        f"usage: python3 {PROGRAM_NAME} [{EXPORT_AS_BYTEARRAY_FLAG}] [{INPUT_IS_STR}] [<hex>]")


PROGRAM_NAME = "test_hash.py"
EXPORT_AS_BYTEARRAY_FLAG = "-a"
INPUT_IS_STR = "-s"

if __name__ == "__main__":
    export_as_bytearray = False
    input_is_str = False
    if EXPORT_AS_BYTEARRAY_FLAG in sys.argv:
        export_as_bytearray = True
        sys.argv.remove(EXPORT_AS_BYTEARRAY_FLAG)

    if INPUT_IS_STR in sys.argv:
        input_is_str = True
        sys.argv.remove(INPUT_IS_STR)

    if "help" in sys.argv:
        print_usage()
        exit(0)

    if len(sys.argv) == 1:
        a = input("hex bytearray (ex: 6fa3): ")
    elif len(sys.argv) == 2:
        a = sys.argv[1]
    else:
        print_usage()

    if input_is_str:
        a = bytes(a.encode('ascii')).hex()

    if len(a) % 2 != 0:
        print("invalid hex input")
        exit(1)

    # parse if real hex value
    hx = int(a, 16)
    hx_hex = hex(hx)
    # omit the first two chars.
    h = sha256(bytearray.fromhex(hx_hex[2:]))

    # this makes it compatible with Prover.toml inputs
    if export_as_bytearray:
        hstr = h.__str__()
        ret = ['0x' + hstr[i] + hstr[i+1] for i in range(0, len(hstr), 2)]
        sys.stdout.write(json.dumps(ret))
    else:
        sys.stdout.write(h)
