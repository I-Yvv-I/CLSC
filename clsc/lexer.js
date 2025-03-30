const keywords = ["feature", "letter", "rule"];
const symbols = ["//",">","/","_"];

function lex(script) {
    let fl = script.split("\n");
    let tokens = [];

    let inrule = false;
    let rule_contents = [];

    let i = 0;
    for (let line of fl) {
        let j = -1;
        let type = "";
        let inbracket = false;
        let bracket = [];
        for (let char of line.split(" ")) {
            j += 1;
            //console.log(type,inrule,char,line.split(" "));
            if (type == "" && inrule == false && keywords.includes(char)) {
                tokens.push("KEY:" + char);
                type = char;
            } else if (char == "#" || char.charAt(0) == '#') { // Comment
                break;
            } else if (type == "" && inrule == true) { // In-Rule
                //console.log(char.charAt(0),char.charAt(0) == "[" || inbracket,bracket)
                if (char == '}') {
                    tokens.push(rule_contents)
                    rule_contents = []
                } else if (char.length == 0) {
                    continue;
                } else if (symbols.includes(char)) {
                    rule_contents.push("SYM:" + char);
                } else if (char.charAt(0) == "[" || inbracket) {
                    inbracket = true
                    if (char.slice(1,-2).includes(',')) {
                        return "Line " + i + ": '" + char + "' cannot have a ','.";
                    }
                    bracket.push(char.slice(1,-1))
                    //console.log(bracket,char.charAt(char.length-1),char.slice(-1,-2))
                    if (char.charAt(char.length-1) == ']') {
                        rule_contents.push("BRA:" + bracket.join(','));
                        inbracket = false
                        bracket = []
                    }
                } else {
                    rule_contents.push("LET:" + char);
                }
            } else if (type == "feature") { // Feature
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "VAR") {
                        return "Line " + i + ": '" + char + "' cannot be there, you need a variable dummy.";
                    }
                    tokens.push("VLS:" + line.split(" ")[j+1]);
                    break;
                } else {
                    tokens.push("VAR:" + char);
                }
            } else if (type == "letter") { // Letter
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "LET") {
                        return "Line " + i + ": '" + char + "' cannot be there, you need a letter dummy.";
                    }
                    tokens.push("VLS:" + line.split(" ")[j+1]);
                    break;
                } else {
                    tokens.push("LET:" + char);
                }
            } else if (type == "rule") { // Rule
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "RUL") {
                        return "Line " + i + ": '" + char + "' cannot be there, you need a rule-name dummy.";
                    }
                    if (line.split(" ")[j+1] != "{") {
                        return "Line " + i + ": Wheres the open curly bracket?";
                    }
                    inrule = true;
                    break;
                } else {
                    tokens.push("RUL:" + char);
                }
            }
        }
        if (inrule) {
            bracket.push("NEWLINE")
        }
        //console.log(tokens.join(","));
        i += 1;
    }

    console.log(tokens);
    return tokens;
}