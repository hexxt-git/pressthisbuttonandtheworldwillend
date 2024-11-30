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
    "an angel, she's been depressed lately",
    "an angel, she brings ecstasy",
    "an angel, she's not strong enough on her own",
    "an angel, she's the sky...",
    "she's no angel.",
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
        let speed = (Math.random() - 0.1) * 0.6;
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