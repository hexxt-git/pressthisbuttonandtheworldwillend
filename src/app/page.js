export const dynamic = "force-dynamic";

// import { useCallback, useState } from "react";
import { headers } from "next/headers";

const db = [];

const endWorld = () => {
    db[ip] = true;
};

export default function (req) {
    const ip = headers()["x-forwarded-for"] ?? 'localhost';
    const world = !db[ip];

    return (
        <html>
            <head>
                <title>pressthisbuttonandtheworldwillend</title>
            </head>
            <body
                style={{
                    background: "black",
                    minHeight: "85vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    margin: 0,
                    transition: "background 200ms ease-out",
                    fontFamily: "serif",
                    textAlign: "center",
                    padding: 10,
                    color: "red",
                    userSelect: "none",
                    textTransform: "capitalize",
                }}>
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
                    }}>
                    Button
                </button>
                {ip}
            </body>
        </html>
    );
}
