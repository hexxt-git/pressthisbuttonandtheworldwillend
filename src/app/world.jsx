"use client";

import { useEffect, useState, useRef } from "react";
import css from './style.module.css'

const titles = [
    "an angel, she looks happy...",
    "an angel, she's probably busy...",
    "an angel, does she know you...",
    "an angel, she's shy.",
    "an angel, she finished all her homework!",
    "an angel, she graduated 🎉",
    "an angel, she can't find a job.",
    "an angel, she tried...",
    "an angel, she misses her home.",
    "an angel, should be proud of herself",
    "an angel, graceful and kind",
    "an angel, angry and confused",
    "an angel, sad and lost",
    "an angel, complex and beautiful",
    "an angel, she's been depressed lately",
    "an angel, she brings ecstasy",
    "an angel, she's not strong enough on her own",
    "an angel, she's the sky...",
    "an angel, she can't keep going like this",
    "an angel, she can't do this for much longer",
    "an angel, she's my favorite",
    "an angel, I made here myself",
    "an angel, she fears not the button",
    "an angel, will you be her friend?",
    "an angel, can you watch over her?",
    "an angel, does anybody wants her",
    "an angel, she finds the world to be cruel",
    "an angel, mesmerized by the cosmos",
    "an angel, this one is different",
    "an angel, not many will see her",
    "a lovely angel, I wonder what she thinks of me",
    "she's no angel.",

    "an angel, she had a date 😳",
    "an angel, she's been working out",
    "an angel, she hasn't been eating well",
    "an angel, she's been sleeping a lot",

    "an angel, she's been having nightmares...",
    "an angel, she's been having dreams...",
    "an angel, she's been having visions...",

    "an angel, she can't remember her past",
    "an angel, she wants to forget her past",
    "an angel, she's been trying to remember",
    "an angel, she's been trying to forget",

    "an angel, she can't see the future",
    "an angel, she can't alter the past",
    "an angel, she can only live in the present",

    "an angel, she doesn't know what she wants",
    "an angel, she knows what she wants",

    "an angel, she could be anything",
    "an angel, she should have been something",
    "an angel, she's been everything",
    "an angel, she's been nothing",

    "an angel, she's been waiting for you",
    "an angel, she's been waiting for me",
    "an angel, she's been waiting for someone",
    "an angel, she's been waiting for something",
    "an angel, she's been waiting for nothing",
    
    "an angel, she has a secret",
    "an angel, she has wings",
    "an angel, she has horns",
    "an angel, she has a tail",
    "an angel, she has a halo",
    "an angel, she has a crown",
    "an angel, she has a sword",
    "an angel, she has a shield",
    "an angel, she has a staff",
    "an angel, she has a wand",
    "an angel, she has a book",

    "an angel, she's been reading a lot",
    "an angel, she's been writing a lot",
    "an angel, she's been drawing a lot",
    "an angel, she's been singing a lot",
    "an angel, she's been dancing a lot",

    "an angel, she's been playing games",
    "an angel, she's been making games",
    "an angel, she's been watching anime",
    "an angel, she's been watching cartoons",
    "an angel, she's been watching movies",
    "an angel, she's been listening to music",
    "an angel, she's been making music",
];
class Angel {
    constructor(
        top = Math.random() * window.innerHeight,
        left = Math.random() * window.innerWidth,
        direction = Math.random() * Math.PI * 2,
        title = "an angel, she's an error.",
        scale = 0.8 + Math.random() * 0.5
    ) {
        this.title = title;
        this.top = top;
        this.left = left;
        this.direction = direction;
        this.scale = scale;
    }

    update() {
        let speed = (Math.random() - 0.1) * 0.75;
        this.top += Math.sin(this.direction) * speed;
        this.left += Math.cos(this.direction) * speed;
        if (Math.random() < 0.05) this.direction = Math.random() * Math.PI * 2;

        if (this.top < -20) this.top = window.innerHeight + 20;
        if (this.top > window.innerHeight + 20) this.top = 20;
        if (this.left < -20) this.left = window.innerWidth + 20;
        if (this.left > window.innerWidth + 20) this.left = 20;

        return this;
    }
}

export default function World({ world }) {
    const angelsRef = useRef([]);
    const [renderTrigger, setRenderTrigger] = useState(0);

    const addAngel = () => {
        if (world && angelsRef.current.length < 6) {
            angelsRef.current.push(
                new Angel(
                    undefined,
                    undefined,
                    undefined,
                    titles[Math.floor(Math.random() * titles.length)] || "that's an error."
                )
            );
            setRenderTrigger((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setTimeout(addAngel, 3000)
        const interval = setInterval(addAngel, 9000);
        return () => clearInterval(interval);
    }, [world]);

    useEffect(() => {
        const interval = setInterval(() => {
            angelsRef.current = angelsRef.current.map((angel) => angel.update());
            setRenderTrigger((prev) => prev + 1);
        }, 1000 / 30);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!world)
            setTimeout(() => {
                console.log(`${angelsRef.current.length} angels died`);
            }, 1000);
    }, [world]);

    const handleClick = (index) => {
        console.log("an angel was killed");
        angelsRef.current = angelsRef.current.filter((_, i) => i !== index);
        setRenderTrigger((prev) => prev + 1);
    };

    return (
        <>
            {angelsRef.current.map((angel, index) => (
                <img
                    key={index}
                    className={css.angel}
                    src="/angel.webp"
                    alt={angel.title}
                    title={world ? angel.title : ""}
                    style={{
                        position: "absolute",
                        top: angel.top,
                        left: angel.left,
                        filter: "drop-shadow(0 0 50px #fff)",
                        opacity: world ? 0.8 : 0,
                        transition: `opacity 1500ms ${index * 400 + 600}ms ease-out, width 500ms ease-in-out`,
                        transform: `scale(${angel.scale}) translate(-50%, -50%)`,
                        mixBlendMode: "difference",
                    }}
                    onClick={() => handleClick(index)}
                />
            ))}
        </>
    );
}