import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Illustration from '../images/hero-illustration.svg';
import HeroImage from '../images/hero-image.png';
// import ImageModal from '../utils/KaptchaModal';
// import Modal from "../utils/Modal";
// import ThreeDModel from '../utils/ThreeDModel';
import TerminalWindow from '../utils/TerminalWindow';
const codeString2 = "zkaptcha = ZKaptchaInterface.at(\"0xF988A798183058d830dEf45E592483E57Ef78002\"); \nfunction mint() {\n\tassert(zkaptcha.verifyCaptcha(params)); \n\t// ...\n}";
const codeString = "// implement ZKaptcha anti-bot in your smart contract\ninterface ZkaptchaInterface {\n\tfunction verifyCaptcha(\n\t\tbytes32[] memory merkleProof, address user, bytes32 _hash, bytes calldata zkProof\n\t) external view returns (bool);\n}"
+ "\n\n" + codeString2;
import SmartContractQuery from "../utils/SmartContractQuery";
import { WalletProvider, useWallet} from "../utils/WalletContext";
// const modelPath = "../spherebot.glb"



function DeveloperHero() {

  const { account, linkWallet } = useWallet();

  const handleLinkWallet = async () => {
    await linkWallet();
    // perform further actions with the user's wallet account
  };
  return (

    <section className="relative">
      {/* Illustration */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
        <img src={Illustration} className="max-w-none" width="1440" height="1265" alt="Hero Illustration" />
      </div>

      {/* <ThreeDModel modelUrl={modelPath} /> */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-40">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-hkgrotesk mb-6 text-white inline-block bg-gradient-to-r from-purple-800/75 via-teal-500/75 to-purple-800/75 px-4 py-1.5 rounded-lg"
              data-aos="fade-up"
            >
              Easy Integration and <br></br>Anti-Bot Reputation.
            </h1>
            <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">
              Add our interface to your smart contract to use the ZKaptcha verifier (deployed on Scroll).
            </p>
          </div>

          <div data-aos="fade-up"
            data-aos-delay="200">
            <TerminalWindow codeString={codeString} language={"solidity"}></TerminalWindow>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mt-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-hkgrotesk mb-6 text-white inline-block py-1.5 rounded-lg"
        >
          SybilRank
        </h1>
        <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">
        SybilRank is based on an account’s past interactions with ZKaptcha. SybilRank provides a score that allows dApp developers to set their own threshold for what they consider to be suspicious behavior, and take appropriate actions, such as blocking or challenging users, based on that score
        (built on Optimism).
        </p>
      </div>


      <div className='max-w-3xl mx-auto text-center mt-16 bg-gray-800 rounded-full' style={{ maxWidth: '30%' }}>
  <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">

  {account ?
  `${account.slice(0, 6)}...${account.slice(-4)}'s SybilRank:  ` :
  'Please link your wallet.'
}
{account && <span className='text-green-300'>100</span>}


</p>
</div>

    </section>
  );
}

export default DeveloperHero;
