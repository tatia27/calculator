let firstNum = '';
let secondNum = '';
let sign = '';
let res = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['/', '-', '*', '+', '√', '%', '🡐', '1/x', 'x²', 'log', 'log2'];

const out = document.querySelector('.viewer');

function clearAll() {
    firstNum = '';
    secondNum = '';
    sign = '';
    res = false;
    out.textContent = 0;
}

function deleteSymbol() {
    if (typeof (firstNum) === String) {
        firstNum = firstNum.slice(0, -1);
    }
    else {
        firstNum = (String(firstNum).slice(0, -1));
    }
    firstNum.length > 0 ? out.textContent = firstNum : out.textContent = 0;
}

document.querySelector('.clear-all').onclick = clearAll;

document.querySelector('.btn-all').onclick = (event) => {
    if (!event.target.classList.contains('num')) return; // нажата не кнопка
    if (event.target.classList.contains('clear-all')) return;

    out.textContent = '';

    const key = event.target.textContent;
    if (digit.includes(key)) {

        if (secondNum === '' && sign === '') {
            firstNum += key;
            out.textContent = firstNum;
        }
        else if (firstNum !== '' && secondNum !== '' && res) {
            secondNum = key;
            res = false;
            out.textContent = secondNum;
        }
        else {
            secondNum += key;
            out.textContent = secondNum;
        }
        console.table(firstNum, secondNum, sign)
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(firstNum, secondNum, sign);
        return;
    }

    if (sign === '🡐') {
        deleteSymbol();
        return;
    }

    if (key === '=') {
        if (secondNum === '') {
            secondNum = firstNum;
        }
        switch (sign) {
            case "+":
                firstNum = (+firstNum) + (+secondNum);
                break;
            case "-":
                firstNum = firstNum - secondNum;
                break;
            case "*":
                firstNum = firstNum * secondNum;
                break;
            case "/":
                if (secondNum === '0') {
                    out.textContent = "На 0 делить нельзя!";
                    firstNum = '';
                    secondNum = '';
                    sign = '';
                    return;
                }
                firstNum = firstNum / secondNum;
                break;
            case "%":
                firstNum = firstNum % secondNum;
                break;
            case "√":
                firstNum = Math.sqrt(firstNum);
                break;
            case "x²":
                firstNum = Math.pow(firstNum, 2);
                break;
            case "log":
                firstNum = Math.log10(firstNum);
                break;
            case "log2":
                firstNum = Math.log2(firstNum);
                break;
            case "1/x":
                firstNum = 1 / firstNum;
                break;
        }

        res = true;
        out.textContent = firstNum;
        console.table(firstNum, secondNum, sign)
    }

    res = true;
    out.textContent = firstNum;
    console.table(firstNum, secondNum, sign);
}