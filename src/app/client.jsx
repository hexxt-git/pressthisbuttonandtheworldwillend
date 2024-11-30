"use client";

import { useState } from "react";
import World from "./world";

export default function () {
    const [world, setWorld] = useState(true);
    const [worldFinal, setWorldFinal] = useState(true);

    return (
        worldFinal && (
            <>
                <div
                    style={{
                        maxWidth: "100vw",
                        maxHeight: "100vh",
                        overflow: "hidden",
                        position: "absolute",
                        inset: 0,
                    }}>
                    <World world={world} />
                </div>
                <h1
                    style={{
                        opacity: world ? 1 : 0,
                        transition: "opacity 200ms 100ms ease-out",
                    }}>
                    Press This Button And The World Will End
                </h1>
                <button
                    style={{
                        fontSize: "1.8rem",
                        fontFamily: "serif",
                        padding: "0.5rem 1rem",
                        border: "solid red 3px",
                        color: "red",
                        background: "none",
                        cursor: world ? "pointer" : "default",
                        opacity: world ? 1 : 0,
                        transition: "opacity 200ms ease-out",
                        borderRadius: 0,
                        zIndex: 1,
                    }}
                    onClick={() => {
                        if (!world) return;
                        setWorld(false);
                        setTimeout(() => setWorldFinal(false), 4000);
                        fetch("/api", { method: "post" });
                    }}>
                    Button
                </button>
            </>
        )
    );
}
