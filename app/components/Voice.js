"use client"
import ListenLoader from "./ListenLoader";
import SpeakAnimation from "./SpeakAnimation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { Fetch } from "../store/store";


export default function Voice({ onClose }) {

    const {  loading} = useSelector(state => state.gemini);

    const dispatch = useDispatch();

    const voiceRef = useRef();
    const listenRef = useRef(null)
    const [ListenState, setListenState] = useState({
        isListening: false,
        isSpeaking: false,
    })
    const manuallyStop = useRef(false)

    useEffect(() => {
        const el = voiceRef.current;
        el.classList.add("fade-in");


        const Speak = (response) => {
            let speak = new SpeechSynthesisUtterance(response);
            speak.lang = 'en-US';
            speak.volume = 1;
            speak.pitch = 1;
            speak.rate = 1;


            window.speechSynthesis.speak(speak)

               listen.onspeechend = () => {
                setListenState({
                    isListening: false,
                    isSpeaking: false,
                })
            }
        }

        let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let listen = new speechRecognition();
        let restartTimer = null;
        listen.continuous = true;
        listen.lang = 'en-US'
        listenRef.current = listen;


        listen.onspeechstart = () => {
            setListenState({
                isListening: true,
                isSpeaking: false,
            })
        }

        listen.onspeechend = () => {
            setListenState({
                isListening: false,
                isSpeaking: false,
            })
        }

        listen.onresult = async (event) => {

            let transcript = event.results[event.results.length - 1][0].transcript;
            console.log("User said 👉", transcript);

          

            try {
                  const result = await dispatch(Fetch({ Inp: transcript, type: "voice" })).unwrap();
                  Speak(result.response);
                  setListenState({
                    isListening : false,
                    isSpeaking : true,
                  })
            } catch (error) {
                console.log("Error in OnResult Try Catch Block : ", error );
                Speak("Sorry, I did not get that. Please repeat")
                 setListenState({
                    isListening : false,
                    isSpeaking : true,
                  })
            }

        }

        listen.onerror = (event) => {
            console.log("Error Occured");
            setListenState({
                isListening: false,
                isSpeaking: false,
            })
            if (event.error === 'no-speech') {
                if (!manuallyStop.current) {
                    restartTimer = setTimeout(() => {
                        try {
                            listenRef.current?.start();
                        } catch (error) {
                            console.log("Error in  1st setTimeout in onError", error);

                        }
                    }, 1500)
                }
                return;
            }

            if (!manuallyStop.current) {
                listen.stop();
                restartTimer = setTimeout(() => {
                    try {
                        listenRef.current?.start();
                    } catch (error) {
                        console.log("Error in 2nd Timeout in OnError", error);

                    }
                })
            }

        }

        listen.onend = () => {
            setListenState({
                isListening: false,
                isSpeaking: false,
            })
            if (!manuallyStop.current) {
                restartTimer = setTimeout(() => {
                    try { listenRef.current?.start(); } catch (e) { console.warn(e); }
                }, 1000);
            }

        }

        listen.start();

    }, [])


    const Close = () => {
        const el = voiceRef.current;
        el.classList.remove("fade-in")
        el.classList.add("fade-out")
        el.addEventListener("animationend", () => {
            onClose();
        }, { once: true })

        manuallyStop.current = true;
        listenRef.current?.abort();
        window.speechSynthesis.cancel();
        listenRef.current = null;
    };


    return (
        <div className="voice" ref={voiceRef} >
            <div className="menu">
                <button onClick={() => {
                    Close();
                }} >
                    <Image
                        src={"/images/crs.png"}
                        alt="close"
                        height={20}
                        width={20}
                        priority={true}
                    />
                </button>
            </div>

            <div className="vmode"  >
                <div className="mic-img">
                    <Image
                        src={"/images/mic.png"}
                        alt="mic"
                        height={75}
                        width={75}
                        priority={true}
                    />
                </div>

                <div className="state">
                    {(!ListenState.isListening && !ListenState.isSpeaking && !loading) && <p>Ready To Listen!</p>}
                    {loading && <Loader />}
                    {(ListenState.isListening && !loading) && <ListenLoader />}
                    {(ListenState.isSpeaking && !loading) && <SpeakAnimation />}
                    
                </div>

            </div>

        </div>
    );
}