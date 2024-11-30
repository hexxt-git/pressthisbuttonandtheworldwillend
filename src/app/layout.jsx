export default function ({ children }) {
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
                {children}
            </body>
        </html>
    );
}
