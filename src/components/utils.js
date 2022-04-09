const NUMBER="NUMBER";
const OPERATOR="OPERATOR";

export const reg=/[+\-/*](.*?)([+\-/*])/i
export const reg2=/\b(.*?)[+\-/*]/
export const reg3=/.*[+\-/*](.*)/

class Button{
    constructor(name, role, valueToDisplay="",color=""){
        //If the name is empty string, then that command will outpout nothing when we tap on
        this.name=name;
        this.role=role;
        this.color=color;
        this.valueToDisplay=valueToDisplay;
    }
}

const line1=[
    new Button("", "POWER"),
    new Button("", "MEMORY_CLEAR", "MC"),   
    new Button("Ans", "ANS"),   
]

const line2=[
    new Button("", "AC","AC", "rgb(145, 0, 0)"),
    new Button("", "C", "C","rgb(145, 0, 0)"),
    new Button("","CHANGE_SIGN","±"),
    new Button("","PERCENTAGE" ,"%"),   
]

const line3=[
    new Button("7", NUMBER),
    new Button("8", NUMBER),
    new Button("9", NUMBER),
    new Button("÷", OPERATOR)
]
const line4=[
    new Button("4", NUMBER),
    new Button("5", NUMBER),
    new Button("6", NUMBER),
    new Button("×", OPERATOR)
]

const line5=[

    new Button("1", NUMBER),
    new Button("2", NUMBER),
    new Button("3", NUMBER),
    new Button("+", OPERATOR)
]

const line6=[
    new Button("0", NUMBER),
    new Button(".", "COMMAN"),
    new Button("", "EQUAL", "="),
    new Button("-", OPERATOR),
]

export const lines =[line1, line2, line3, line4, line5, line6]

export function formateCalc(str){

    const reg=/√[^.]*?\)/i
    const match=reg.exec(str)
    if(match){
        const tmp= match.slice(1,)
        return str.replace(match, Math.sqrt(eval(tmp))) 
    }
    // return str.replace(str.match(reg), "Math.sqrt()")
    return str
}


export function reversedString(str){
    return str.split("").reverse().join("")
}

export function formattedString(calculExpression, str){
    let str2=reversedString(calculExpression+str);
    let definitiveStr=calculExpression+str;
    let isReversed=true;
    console.log(str2);
    let lastNumbers=str2.match(reg);
    if(!lastNumbers){
      isReversed=false
      str2=calculExpression+str
      lastNumbers=str2.match(reg2);

      //On retourne juste l'expression de depart si aucune correpondance n'est trouvée
      if(!lastNumbers)
        return calculExpression;
    }

    // str="*"
    

    if (lastNumbers && lastNumbers[1]){
        let tmp=lastNumbers[1]
        if (isReversed)
            tmp=reversedString(tmp)

        let fTmp=parseFloat(tmp);

      
        if(isNaN(tmp)){
            return calculExpression
        }
        console.log(definitiveStr);
        definitiveStr=definitiveStr.replace(tmp, fTmp.toString());
        return definitiveStr
      
    } 
}