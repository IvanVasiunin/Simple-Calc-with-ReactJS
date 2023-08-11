import {useState, useRef} from 'react';

function Calculator() {
    const [firstNum, setFirstNum] = useState("");
    const [secondNum, setSecondNum] = useState("");
    const [operation, setOperation] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const inputRef = useRef(null);

    function numClick(e) {
        e.preventDefault();
        if(!operation && inputRef.current.value.length >= 15) {
            return;
        } else if (firstNum && inputRef.current.value.length >= 17) {
            return;
        } else if(!operation) {
            setFirstNum((prevFirstNum) => prevFirstNum + (prevFirstNum === "0"? "" : e.target.value) );
        } else if (operation) {
            setSecondNum((prevSecondNum) => prevSecondNum + (prevSecondNum === "0" ? "" : e.target.value));
        }
    }

    function operationClick(e) {
        e.preventDefault();
        if (!firstNum) {
            return
        }
        else if (!secondNum) {
            setOperation(e.target.value);
        } else {
            equalClick();
            setOperation(e.target.value);
        }
        
    }

    function equalClick() {
        if(firstNum && operation && secondNum) {
            let result;
            switch(operation) {
                case "+":
                    result = +firstNum + +secondNum;
                    break;
                case "-":
                    result = +firstNum - +secondNum;
                    break;
                case "*":
                    result = +firstNum * +secondNum;
                    break;
                case "/":
                    if (+secondNum !== 0) {
                        result = +firstNum / +secondNum;
                    } else {
                        setErrorMsg("You can't divide by 0");
                    }      
                    break; 
                    default:
                        break;             
            }
            setFirstNum(result);
            setSecondNum("");
            setOperation("");
        }
    }

    function resetClick() {
        setErrorMsg("");
        setFirstNum("");
        setSecondNum("");
        setOperation("");       
    }

    return (
        <div className="calc">
            <input ref={inputRef} value={errorMsg || firstNum+operation+secondNum} className="display" readOnly></input>
            <div className="buttons">
                <div className="btnRow">
                    <button onClick={numClick} value="7">7</button>
                    <button onClick={numClick} value="8">8</button>
                    <button onClick={numClick} value="9">9</button>
                    <button className="operation" onClick={operationClick} value="+">+</button>
                </div>
                <div className="btnRow">
                    <button onClick={numClick} value="4">4</button>
                    <button onClick={numClick} value="5">5</button>
                    <button onClick={numClick} value="6">6</button>
                    <button className="operation" onClick={operationClick} value="-">-</button>
                </div>
                <div className="btnRow">
                    <button onClick={numClick} value="1">1</button>
                    <button onClick={numClick} value="2">2</button>
                    <button onClick={numClick} value="3">3</button>
                    <button className="operation multi" onClick={operationClick} value="*">*</button>
                </div>
                <div className="btnRow">
                    <button onClick={resetClick} className="reset" value="C">C</button>
                    <button onClick={numClick} value="0">0</button>
                    <button className="operation" onClick={equalClick} value="=">=</button>
                    <button className="operation" onClick={operationClick} value="/">/</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;