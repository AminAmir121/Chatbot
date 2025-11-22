"use client"

import Search from "./Search";
import Image from "next/image";
import Output from "./Output";
import Voice from "./Voice";

import { useState } from "react";

export default function Container(){


    const [showVoice , setshowVoice] = useState(false)

    return(

        <div className="container">
        
            <div className="intro">
                <h2><span>Hello There!</span></h2>
                <h2><span>How May I Help You?</span></h2>

                <div className="services">
                    <div className="box">
                            <Image
                            src={"/images/book.png"}
                            height={130}
                            width={160}
                            alt="study"
                            priority={true}
                            />
                            <h3>Stuck In Studies? I am Here!</h3>
                    </div>

                    <div className="box">
                            <Image
                            src={"/images/logo.png"}
                            height={130}
                            width={160}
                            alt="study"
                            priority={true}
                            />
                            <h3>Need Assistant In Work?</h3>
                    </div>

                    <div className="box">
                           <Image
                            src={"/images/header.png"}
                            height={130}
                            width={160}
                            alt="study"
                            priority={true}
                            />
                            <h3>Want To Talk About Astronomy?</h3>
                    </div>

                    <div className="box">
                        <Image
                            src={"/images/coding.png"}
                            height={130}
                            width={150}
                            alt="study"
                            priority={true}
                            />
                            <h3>Stuck In Coding? I am Here!</h3>
                    </div>

                </div>

            </div>
            <Search  setshowVoice={setshowVoice}   ></Search>
            <Output></Output>

            {showVoice && (<Voice  onClose={()=>{setshowVoice(false)}} />)}
        </div>
    );
}