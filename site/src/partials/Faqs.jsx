import React from 'react';

function Faqs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 md:pb-20">
            <h2 className="h2 font-hkgrotesk">FAQs</h2>
          </div>
          {/* Columns */}
          <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-hkgrotesk font-medium">Won’t this be expensive to put in my smart contract? Who pays for it and how much extra gas will my contract incur?</h4>
                <p className="text-slate-500">
                Usage in your smart contracts will cost a tiny bit extra per transaction. Either you (the Dapp owner) or your user can absorb that cost. If that small increment in usage costs is an issue for you, then you can consider using SybilRank which will give you a score of how likely your user is a bot. However, note that SybilRank only knows about past users of ZKaptcha. We are working on a SaaS model where you can get a set number of requests for a fixed price.

                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-hkgrotesk font-medium">Why not just use web2 CAPTCHAs and Midpoint or consensus-based solutions like Chainlink?</h4>
                <p className="text-slate-500">
                Midpoint doesn’t get off-chain data through consensus which is risky. Midpoint is also fully centralized and works on a callback model which introduces big delays especially if you are blocking a function call with it. Fully consensus-based mechanisms like Chainlink are very expensive and not scalable if every KAPTCHA verification has to be done multiple times.
                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-hkgrotesk font-medium">Isn’t there a race condition when new Merkle roots get issued? What if Alice gets a KAPTCHA from MerkleTree0 and in the time it takes her to solve it, MerkleTree1 is now the valid tree in the verifier?</h4>
                <p className="text-slate-500">
                Yes, but we have enabled a sliding window of the 3 most recent Merkle roots to be valid so that the probability of this happening is very very small. For example, when the one currently active Merkle root has few unique KAPTCHAs remaining, a second Merkle root also becomes available. One the first one gets exhausted, the second will be valid. Then the pattern repeats. The probability of a race condition becomes very, very small and in the worst case, they just redo the KAPTCHA.
                </p>
              </div>
            </div>
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-hkgrotesk font-medium"> Can’t attackers outsource their KAPTCHAs using services like 2Captcha, Anti-Captcha, Anycaptcha, or DeathByCaptcha?</h4>
                <p className="text-slate-500">
                Yes, this is possible. These services are for very determined attackers and currently don’t pose an existential threat to web2 CAPTCHAs. Unfortunately, solving the problem of outsourcing CAPTCHAs is very difficult by definition. If the test is designed to distinguish a human and a bot, sending the challenge to another human to be completed still satisfies the requirements. We plan to upgrade our captcha challenges by using zero knowledge machine learning. This will let us use mouse tracking classifiers and browser data to produce more accurate judgements.
                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-hkgrotesk font-medium"> Doesn’t this kill automation? Isn’t some automation on blockchains good?</h4>
                <p className="text-slate-500">
                Yes, but only when the dApp wants to kill automation. The smart contract can always turn off the KAPTCHA verification after a certain period of time (ex. after the first k blocks once a token is listed on an exchange, or can be manually turned on or off by the contract owner).
                </p>
                </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-hkgrotesk font-medium">Why use ZK? Why not use PolygonID, Secure3, or Candy Machine V3 (Civic)?</h4>
                <p className="text-slate-500">
                These products are still very early. Candy machine uses a very centralized model and relies on web2 captchas. Typically other systems will verify a user and issue them an identifier token, but these are either easily sidestepped and exploited by bots, or so slow that they hinder functionality. The hiding property of ZK combined with the merkle proofs as nullifiers means that these transactions can’t be replayed or frontrun. Building the system using ZK also allows us to scale easily to more complex captcha systems, because verification costs are nearly constant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faqs;
