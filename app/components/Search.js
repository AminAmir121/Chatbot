"use client"
import Image from "next/image";
import { useRef } from "react";
import { useDispatch} from 'react-redux'
import { setPrompt, Fetch } from "../store/store";

export default function Search({ setshowVoice }) {

    const Input = useRef();
    const dispatch  = useDispatch();

    const Animation = ()=>{
        const intro = document.querySelector(".intro")
        const output = document.querySelector(".output")

        intro.classList.remove("fade-in");
        intro.classList.add("fade-out");

        intro.addEventListener("animationend", () => {
            intro.style.display = "none";
            output.style.display = "flex";
            output.classList.add("fade-in");

        }, { once: true });
}

    const Enter = (event) => {
    if (event.key === 'Enter') {
         Animation();
         const UserInput = Input.current.value;
         console.log("User Input : ", UserInput); 
        dispatch(Fetch({Inp:UserInput, type:"text"}))
        dispatch(setPrompt(UserInput))
        console.log("Passed to sore");
        Input.current.value =  " ";
    }
}


    return (
        <div className="search">
            <input type="text" id="Inp" placeholder="Ask Me Anything!" onKeyDown={Enter}  ref={Input}   />
            <button id="v-mode" onClick={()=>{setshowVoice(true)}}  >
                <Image
                    src={"/images/micrp.png"}
                    alt="mic"
                    height={30}
                    width={32}
                    priority={true}
                />
            </button>
        </div>
    );
}