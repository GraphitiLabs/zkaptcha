import hashlib


def sha256(byte_array):
    # Create a SHA-256 hash object
    sha256 = hashlib.sha256()

    # Update the hash object with the byte array
    sha256.update(byte_array)

    # Get the hexadecimal representation of the hash value
    hex_digest = sha256.hexdigest()

    # Return the hash value as a string
    return hex_digest


# UNSAFE. DO NOT USE IN PROD.
if __name__ == "__main__":
    print("PROGRAM IS UNSAFE.")
    a = input("hex bytearray (ex: 6fa3): ")
    new_string = r"\x"
    for i in range(0, len(a), 2):
        new_string += a[i:i+2] + r"\x"

    # Remove the trailing "-" character from the new string
    new_string = new_string[:-2]
    new_string = "b\"" + new_string + "\""
    h = sha256(eval(new_string))

    print(h)
