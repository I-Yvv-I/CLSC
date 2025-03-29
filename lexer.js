const keywords = ["ft", "lt", "rl"]

function lex(script) {
    let fl = script.split("\n");
    tokens = [];

    let tok = ""

    for (let line of fl) {
        for (let char of line.split("")) {
            tok = tok + char;
            console.log(tok);
            if (keywords.includes(tok)) {
                tokens.push("KEY:" + tok)
                tok = ""
            }
        }
        tok = ""
    }

    console.log(tokens);
    return tokens;
}
