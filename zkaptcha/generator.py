"""
Graphiti Inc.

Product Zkaptcha

Script to generate new captcha images and their corresponding hashes for each user

Written by Ketan Jog and Andrew Magid
"""

# Imports

import numpy as np
import random
from PIL import ImageFont, ImageDraw, Image, ImageFilter
import cv2
import glob
import string
from web3 import Web3
import yaml
import os
import shutil
from pathlib import Path
from hashlib import sha256

# Configure all paths

ROOT_PATH = Path(__file__).parent.parent
CONFIG_PATH = os.path.join(ROOT_PATH, "paths.yaml")
with open(CONFIG_PATH, "r") as file:
    paths = yaml.safe_load(file)

YAML_PATH = paths["YAML_PATH"]
COMMITMENTS_PATH = paths["COMMITMENTS_PATH"]
OUTPUT_FOLDER = paths["OUTPUT_FOLDER"]

# Hash Function
class Hash:
    def __init__(self, salt):
        self.salt = salt

    def _hash(self, data):
        # commitment = Web3.soliditySha3(
        #     ["bytes32", "bytes32"], [bytes(data.encode()), bytes(self.salt.encode())]
        # )
        s = sha256()
        s.update(bytes(data.encode()) + bytes(self.salt.encode()))
        commitment = s.hexdigest()
        return commitment


# Helper functions (Convert to a class later)

# Generate a random text string given the length
def generate_text(length):
    text = "".join(
        random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase)
        for _ in range(length)
    )
    return text


names = [
    "buterin",
    "saylor",
    "zhao",
    "kulechov",
    "dorsey",
    "gensler",
    "armstrong",
    "altman",
    "fried",
    "benet",
]

# Given a numpy representation of an image, noise it
def noise_image(img, thresh):
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            rdn = random.random()
            if rdn < thresh:
                img[i][j] = random.randint(0, 123)  # dark pixels
            elif rdn > 1 - thresh:
                img[i][j] = random.randint(123, 255)  # bright pixels
    return img


# Given a numpy representation of an image, blur it
def blur_image(img, blur_kernel):
    img = cv2.blur(img, blur_kernel)
    return img

# Function to draw Bezier curves
def draw_bezier(draw, p0, p1, p2, p3, fill):
    steps = 100
    for i in range(steps):
        t = i / steps
        x = int(p0[0] * (1 - t) ** 3 + p1[0] * 3 * t * (1 - t) ** 2 + p2[0] * 3 * (1 - t) * t ** 2 + p3[0] * t ** 3)
        y = int(p0[1] * (1 - t) ** 3 + p1[1] * 3 * t * (1 - t) ** 2 + p2[1] * 3 * (1 - t) * t ** 2 + p3[1] * t ** 3)
        draw.point((x, y), fill=fill)

# Main function to generate a captcha image and create its corresponding hash text
def create_random_captcha(random_seed=42, savepath="bin", comm: Hash = None):
    # Set the random seed
    random.seed(a=random_seed, version=2)

    # Randomize all parameters
    size = random.randint(60, 85)
    font = "/Library/Fonts/Arial.ttf"  # TODO: We can add randomness is fonts by downloading a fonts lib.
    # length = random.randint(4, 8)
    length = 6
    thresh = random.randint(1, 5) / 100
    blur_kernel = (int(size / random.randint(5, 10)), int(size / random.randint(5, 10)))
    # font = random.choice(fonts)

    spacing = random.randint(0, 15)  # Adjust this value to control spacing range
    x_offset = 5
    main_img_width = (length * size) + (spacing * (length - 1)) + 10  # Adding extra width to prevent cutoff
    main_img_height = (size * 2) + 20  # Adding extra height to prevent cutoff


    # Create the image object
    img = np.zeros(((size * 2) + 5, main_img_width, 3), np.uint8)
    img_pil = Image.fromarray(img + 255)

    # Create the font and draw functions
    font = ImageFont.truetype(font, size)
    draw = ImageDraw.Draw(img_pil)

    # Get random text
    text = generate_text(length)

    for char in text:
        # Create a single-character image to apply transformations
        char_img = Image.new("RGBA", (size, (size * 2) + 5), (255, 255, 255, 0))
        char_draw = ImageDraw.Draw(char_img)
        char_draw.text((0, 10), char, font=font, fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))

        # Apply a random affine transformation to distort the letter
        skew_angle = random.randint(-15, 15)  # Adjust this value to control the distortion range
        matrix = (1, skew_angle / 100, 0, 0, 1, 0)
        transformed_char = char_img.transform(char_img.size, Image.AFFINE, matrix, resample=Image.BICUBIC)

        # Paste the transformed character onto the main image
        img_pil.paste(transformed_char, (x_offset, 10), transformed_char)
        x_offset += size + spacing

    # Add multiple lines with random start and end points
    num_lines = random.randint(2, 5)
    for _ in range(num_lines):
        draw.line(
            [
                (random.choice(range(main_img_width)), random.choice(range(main_img_height))),
                (random.choice(range(main_img_width)), random.choice(range(main_img_height))),
            ],
            width=random.randint(1, 3),
            fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)),
        )

    # Draw curves
    num_curves = random.randint(2, 5)
    for _ in range(num_curves):
        p0 = (random.choice(range(main_img_width)), random.choice(range(main_img_height)))
        p1 = (random.choice(range(main_img_width)), random.choice(range(main_img_height)))
        p2 = (random.choice(range(main_img_width)), random.choice(range(main_img_height)))
        p3 = (random.choice(range(main_img_width)), random.choice(range(main_img_height)))
        fill = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        draw_bezier(draw, p0, p1, p2, p3, fill=fill)

    # Apply noise
    noise_filter = ImageFilter.GaussianBlur(radius=random.randint(1, 3))
    img_pil = img_pil.filter(noise_filter)
    draw.line(
        [
            (random.choice(range(length * size)), random.choice(range((size * 2) + 5))),
            (random.choice(range(length * size)), random.choice(range((size * 2) + 5))),
        ],
        width=1,
        fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)),
    )
    draw.line(
        [
            (random.choice(range(length * size)), random.choice(range((size * 2) + 5))),
            (random.choice(range(length * size)), random.choice(range((size * 2) + 5))),
        ],
        width=1,
        fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)),
    )

    # Add noise and blur
    img = np.array(img_pil)
    img = noise_image(img, thresh)
    img = blur_image(img, blur_kernel)

    # Save the image
    folder = os.path.join(OUTPUT_FOLDER, savepath)
    filename = os.path.join(COMMITMENTS_PATH, savepath + ".txt")
    isExist = os.path.exists(folder)
    if not isExist:
        os.makedirs(folder)

    cv2.imwrite(f"{folder}/{text}.png", img)  # if you want to save the image

    # Save the hash
    with open(filename, "a+") as f:
        commitment = comm._hash(text)
        f.write(f"{text},")
        f.write(str(commitment))
        f.write("\n")


# Main function to generate a captcha image and create its corresponding hash text
def create_captcha_collection(index, random_seed=42, savepath="bin", comm: Hash = None):
    # Set the random seed
    random.seed(a=random_seed, version=2)

    # Randomize all parameters
    size = random.randint(45, 70)
    font = "/Library/Fonts/Arial.ttf"  # TODO: We can add randomness is fonts by downloading a fonts lib.
    # length = random.randint(4, 8)
    length = 6
    thresh = random.randint(1, 5) / 100
    blur_kernel = (int(size / random.randint(5, 10)), int(size / random.randint(5, 10)))
    # font = random.choice(fonts)

    # Create the image object
    img = np.zeros(((size * 2) + 5, length * size, 3), np.uint8)
    img_pil = Image.fromarray(img + 255)

    # Create the font and draw functions
    font = ImageFont.truetype(font, size)
    draw = ImageDraw.Draw(img_pil)

    # Get random text
    text = names[index]

    # Draw in the text and a random line
    draw.text(
        (5, 10),
        text,
        font=font,
        fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)),
    )
    draw.line(
        [
            (random.choice(range(length * size)), random.choice(range((size * 2) + 5))),
            (random.choice(range(length * size)), random.choice(range((size * 2) + 5))),
        ],
        width=1,
        fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)),
    )

    # Add noise and blur
    img = np.array(img_pil)
    img = noise_image(img, thresh)
    img = blur_image(img, blur_kernel)

    # Save the image
    folder = os.path.join(OUTPUT_FOLDER, savepath)
    filename = os.path.join(COMMITMENTS_PATH, savepath + ".txt")
    isExist = os.path.exists(folder)
    if not isExist:
        os.makedirs(folder)

    cv2.imwrite(f"{folder}/{text}.png", img)  # if you want to save the image

    # Save the hash
    with open(filename, "a+") as f:
        commitment = comm._hash(text)
        f.write(str(commitment))
        f.write("\n")


# Reads a user config file and refreshes their captchas and hashes
def refresh_user_captchas(config="demo_config.yaml"):
    # configure yaml data and hash function
    stream = open(YAML_PATH + config, "r")
    config = yaml.safe_load(stream)
    comm = Hash(config["salt"])

    # Delete old commitments
    commitments = os.path.join(COMMITMENTS_PATH, config["username"] + ".txt")
    if os.path.exists(commitments):
        os.remove(commitments)
    # Delete old captchas
    captcha_dir = Path(os.path.join(OUTPUT_FOLDER, config["username"]))
    if captcha_dir.exists() and captcha_dir.is_dir():
        shutil.rmtree(captcha_dir)

    seed_base = random.randint(0, config["num_captchas"])
    for i in range(config["num_captchas"]):
        seed = seed_base + i
        create_random_captcha(seed, config["username"], comm)


# Reads a user config file and refreshes their captchas and hashes
def refresh_collection_captchas(config="demo_config.yaml"):
    # configure yaml data and hash function
    stream = open(YAML_PATH + config, "r")
    config = yaml.safe_load(stream)
    comm = Hash(config["salt"])

    # Delete old commitments
    commitments = os.path.join(COMMITMENTS_PATH, config["username"] + ".txt")
    if os.path.exists(commitments):
        os.remove(commitments)
    # Delete old captchas
    captcha_dir = Path(os.path.join(OUTPUT_FOLDER, config["username"]))
    if captcha_dir.exists() and captcha_dir.is_dir():
        shutil.rmtree(captcha_dir)

    seed_base = random.randint(0, config["num_captchas"])
    for i in range(config["num_captchas"]):
        seed = seed_base + i
        create_captcha_collection(i, seed, config["username"], comm)


# UNCOMMENT TO RUN
# refresh_collection_captchas()
refresh_user_captchas()
