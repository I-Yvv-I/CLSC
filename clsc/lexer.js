const keywords = ["feature", "letter", "rule"]
const symbols = ["=","{","}","[","]"]

function lex(script) {
    let fl = script.split("\n");
    let tokens = [];

    let tok = "";
    let type = ""

    let i = 0;
    for (let line of fl) {
        i += 1;
        let j = 0;
        for (let char of line.split("")) {
            j += 1;
            tok = tok + char;
            //console.log(tok);
            if (char == ' ') {
                if (type == "" && keywords.includes(tok.slice(0, -1))) {
                    tokens.push("KEY:" + tok.slice(0, -1));
                    type = tok.slice(0, -1)
                } else if (type == "feature") {
                    if (tok.slice(0, -1) == "=") {
                        tokens.push("VLS:" + line.slice(j));
                        type = ""
                        continue;
                    } else if (tok.slice(0, -1).length < 2) {
                        return "Line " + i + ", Character " + j + ": '" + tok.slice(0, -1) + "' must be more then one character long.";
                    } else {
                        tokens.push("VAR:" + tok.slice(0, -1));
                    }
                } else if (type = "letter") {
                    if (tok.slice(0, -1) == "=") {
                        tokens.push("VLS:" + line.slice(j));
                        type = ""
                        continue;
                    } else {
                        tokens.push("LET:" + tok.slice(0, -1));
                    }
                }
                tok = "";
            }
        }
        tok = "";
        console.log(tokens);
    }
//mewo
    console.log(tokens);
    return tokens;
}
