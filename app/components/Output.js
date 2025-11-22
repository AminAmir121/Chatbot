"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Loader from "./Loader";
import TypingEffect from "./TypingEffect";

export default function Output() {
  const { ApiText, loading, error, Prompt } = useSelector((state) => state.gemini);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ApiText, loading]);

  return (
    <div className="output">
      {error && <h2 className="error">Something Went Wrong! </h2>}

      <div className="chat-container">
        {/* Render all past chats */}
        {ApiText && ApiText.length > 0 && ApiText.map((item, index) => (
          <div key={index} className="chat-pair">
            {/* User Message */}
            <div className="Unip-bar">
              <Image
                src={"/images/agent-location.png"}
                alt="user"
                height={30}
                width={30}
              />
              <div className="Uinp">
                {/* <TypingEffect    key={item.prompt }   text={item.prompt}/> */}
                {item.prompt}
              </div>
            </div>

            {/* Bot Response */}
            <div className="response-bar">
              <Image
                src={"/images/logo.png"}
                alt="bot"
                height={30}
                width={30}
              />
              <div className="response">
                <TypingEffect text={item.response}/>
              </div>
            </div>
          </div>
        ))}

        {/* Loader shown after latest user input (before bot response) */}
        {loading && (
          <div className="chat-pair">
            <div className="Unip-bar">
              <Image
                src={"/images/agent-location.png"}
                alt="user"
                height={30}
                width={30}
              />
              <div className="Uinp">
                {Prompt}
             
              </div>
            </div>

            <div className="response-bar">
              <Image
                src={"/images/logo.png"}
                alt="bot"
                height={30}
                width={30}
              />
              <div className="response">
                <Loader />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
