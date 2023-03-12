"""
Graphiti Inc.

Product Zkaptcha 

Script to generate new captcha images and their corresponding hashes for each user

Written by Ketan Jog and Andrew Magid
"""

# Imports

import numpy as np
import random
from PIL import ImageFont, ImageDraw, Image
import cv2
import glob
import string
from web3 import Web3
from yaml import load
import os
import shutil
from pathlib import Path

# Configure all paths

ROOT_DIR = ROOT_PATH = Path(__file__).parent.parent
CONFIG_PATH = os.path.join(ROOT_PATH, "paths.yaml")
paths = open(CONFIG_PATH, 'r')

YAML_PATH = paths['YAML_PATH']
COMMITMENTS_PATH = paths['COMMITMENTS_PATH']
OUTPUT_FOLDER = paths['OUTPUT_FOLDER']

# Hash Function
class Hash:
    def __init__(self, salt):
        self.salt = salt
        
    def _hash(self, data):
        commitment = Web3.soliditySha3(['bytes32','bytes32'], [bytes(data.encode()), bytes(self.salt.encode())]);
        return commitment

# Helper functions (Convert to a class later)

# Generate a random text string given the length
def generate_text(length):
    text = ''.join(
        random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) 
                   for _ in range(length))
    return text

# Given a numpy representation of an image, noise it
def noise_image(img, thresh):
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            rdn = random.random()
            if rdn < thresh:
                img[i][j] = random.randint(0,123) #dark pixels
            elif rdn > 1-thresh:
                img[i][j] = random.randint(123,255) #bright pixels
    return img

# Given a numpy representation of an image, blur it
def blur_image(img, blur_kernel):
    img = cv2.blur(img,blur_kernel)
    return img

# Main function to generate a captcha image and create its corresponding hash text
def create_random_captcha(random_seed=42, savepath="bin", comm: Hash = None):
    # Set the random seed
    random.seed(a=random_seed, version=2)

    # Randomize all parameters
    size = random.randint(45,70)
    font = '/Library/Fonts/Arial.ttf' # TODO: We can add randomness is fonts by downloading a fonts lib.
    length = random.randint(4,8)
    thresh = random.randint(1,5)/100
    blur_kernel = (int(size/random.randint(5,10)),int(size/random.randint(5,10)))
    # font = random.choice(fonts)

    # Create the image object 
    img = np.zeros(((size*2)+5, length*size, 3), np.uint8)
    img_pil = Image.fromarray(img+255)

    # Create the font and draw functions
    font = ImageFont.truetype(font, size)
    draw = ImageDraw.Draw(img_pil)

    # Get random text
    text = generate_text(length)

    # Draw in the text and a random line
    draw.text((5, 10), text, font=font, 
              fill=(random.randint(0,255), random.randint(0,255), random.randint(0,255)))
    draw.line([(random.choice(range(length*size)), random.choice(range((size*2)+5)))
               ,(random.choice(range(length*size)), random.choice(range((size*2)+5)))]
              , width=1, fill=(random.randint(0,255), random.randint(0,255), random.randint(0,255)))

    # Add noise and blur
    img = np.array(img_pil)
    img = noise_image(img,thresh)
    img = blur_image(img, blur_kernel)


    # Save the image
    folder = os.path.join(OUTPUT_FOLDER, savepath)
    filename = os.path.join(COMMITMENTS_PATH, savepath + ".txt")
    isExist = os.path.exists(folder)
    if not isExist:
        os.makedirs(folder)
    
    cv2.imwrite(f"{folder}/{text}.png", img) #if you want to save the image
    
    # Save the hash
    with open(filename, 'a+') as f:
        commitment = comm._hash(text)
        f.write(str(commitment))
        f.write("\n")
        
# Reads a user config file and refreshes their captchas and hashes
def refresh_user_captchas(config="demo_config.yaml"):
    # configure yaml data and hash function
    stream = open(YAML_PATH + config, 'r')
    config = yaml.safe_load(stream)
    comm = Hash(config['salt'])
    
    # Delete old commitments
    commitments = os.path.join(COMMITMENTS_PATH, config['username'] + ".txt")
    if os.path.exists(commitments):
        os.remove(commitments)
     # Delete old captchas
    captcha_dir = Path(os.path.join(OUTPUT_FOLDER, config['username']))
    if captcha_dir.exists() and captcha_dir.is_dir():
        shutil.rmtree(captcha_dir)
    
    seed_base = random.randint(0,config['num_captchas'])
    for i in range(config['num_captchas']):
        seed = seed_base + i
        create_random_captcha(seed, config['username'], comm)

# UNCOMMENT TO RUN
# refresh_user_captchas()


