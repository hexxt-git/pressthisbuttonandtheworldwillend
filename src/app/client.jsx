"use client";

import { useState } from "react";

export default function () {
    const [world, setWorld] = useState(true);

    return (
        <>
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
                    border: "solid red 4px",
                    color: "red",
                    background: "none",
                    cursor: "pointer",
                    opacity: world ? 1 : 0,
                    transition: "opacity 200ms ease-out",
                    borderRadius: 0,
                }}
                onClick={() => {
                    if(!world) return;
                    setWorld(false);
                    fetch("/api", { method: "post" });
                }}>
                Button
            </button>
        </>
    );
}
