(function () {
    'use strict';

    function get (id) {
        return document.getElementById(id);
    }
    
    let display = get('display');
    let displayVal = '';
    let currentOperator = null;
    let currentValue;
    let decimalPressed = false;
    let numberPressed = false;
    let operatorPressed = null;

    get('numbers').addEventListener('click', function (event) {
        //don't allow clicking on outer numbers div
        if (event.target.id === 'numbers' || (decimalPressed && event.target.innerHTML === '.') || currentOperator === '=') {
            return;
        }
        let num = event.target.innerHTML;
        displayVal = displayVal + num;
        display.innerHTML = displayVal;
        numberPressed = true;
        if (operatorPressed) {
            operatorPressed.style.backgroundColor = 'lightgreen';
            operatorPressed.style.color = 'black';
        }
        if (event.target.innerHTML === '.') {
            decimalPressed = true;
        }
    });

    get('operators').addEventListener('click', function (event) {
        //not to allow double pressing operators, besides pressing operators after equals
        if ((!numberPressed && currentOperator !== '=') || event.target.id === 'operators') {
            return;
        }
        let newNum = displayVal !== '' ? Number(displayVal) : currentValue;
        currentValue = currentOperator === '÷' ? currentValue/newNum :
                    currentOperator === '×' ? currentValue*newNum :
                    currentOperator === '-' ? currentValue-newNum :
                    currentOperator === '+' ? currentValue+newNum : 
                    newNum;
        display.innerHTML = currentValue;
        if (event.target.innerHTML !== '=') {    
            operatorPressed = event.target;
            operatorPressed.style.backgroundColor = 'green';
            operatorPressed.style.color = 'white';
        }
        currentOperator = event.target.innerHTML;
        displayVal = '';
        numberPressed = false;
        decimalPressed = false;
    });

    get('clear').addEventListener('click', function () {
        displayVal = '';
        currentOperator = null;
        currentValue = 0;
        numberPressed = false;
        decimalPressed = false;
        display.innerHTML = currentValue;
        if (operatorPressed) {
            operatorPressed.style.backgroundColor = 'lightgreen';
            operatorPressed.style.color = 'black';
        }
    });

    get('positiveNegative').addEventListener('click', function () {
        if (!numberPressed && currentOperator !== '=') {
            return;
        }
        displayVal = -display.innerHTML;
        display.innerHTML = displayVal;
    });

    get('percent').addEventListener('click', function () {
        if (!numberPressed && currentOperator !== '=') {
            return;
        }
        displayVal = display.innerHTML/100;
        display.innerHTML = displayVal;
    });


////////////////for ie support////////////////////////////////////////////////////////////////////////

    const clearNegativePercent = get('clearNegativePercent');
    const gridSupport = getComputedStyle(clearNegativePercent).getPropertyValue('grid-gap');
    const clear = get('clear');
    const positiveNegative = get('positiveNegative');
    const percent = get('percent');

    const n7 = get('n7');
    const n8 = get('n8');
    const n9 = get('n9');
    const n4 = get('n4');
    const n5 = get('n5');
    const n6 = get('n6');
    const n1 = get('n1');
    const n2 = get('n2');
    const n3 = get('n3');
    const zero = get('zero');
    const dot = get('dot');

    
    const divide = get('divide');
    const times = get('times');
    const minus = get('minus');
    const plus = get('plus');
    const equals = get('equals');

    const numbers = get('numbers');

    const operators = get('operators');

    if (!gridSupport) {
        clearNegativePercent.style.height = '9%';
        clearNegativePercent.style.marginTop = '5px';

        clear.style.width = '31%';
        clear.style.height = '100%';
        clear.style.display = 'inline-block';
        positiveNegative.style.width = '31%';
        positiveNegative.style.height = '100%';
        positiveNegative.style.display = 'inline-block';
        percent.style.width = '31%';
        percent.style.height = '100%';
        percent.style.display = 'inline-block';

        
        n7.style.width = '30%';
        n7.style.height = '25%';
        n7.style.display = 'inline-block';
        n8.style.width = '30%';
        n8.style.height = '25%';
        n8.style.display = 'inline-block';
        n9.style.width = '30%';
        n9.style.height = '25%';
        n9.style.display = 'inline-block';
        n4.style.width = '30%';
        n4.style.height = '25%';
        n4.style.display = 'inline-block';
        n5.style.width = '30%';
        n5.style.height = '25%';
        n5.style.display = 'inline-block';
        n6.style.width = '30%';
        n6.style.height = '25%';
        n6.style.display = 'inline-block';
        n1.style.width = '30%';
        n1.style.height = '25%';
        n1.style.display = 'inline-block';
        n2.style.width = '30%';
        n2.style.height = '25%';
        n2.style.display = 'inline-block';
        n3.style.width = '30%';
        n3.style.height = '25%';
        n3.style.display = 'inline-block';
        zero.style.width = '64%';
        zero.style.height = '25%';
        zero.style.display = 'inline-block';
        dot.style.width = '30%';
        dot.style.height = '25%';
        dot.style.display = 'inline-block';

        divide.style.width = '100%';
        divide.style.height = '20%';
        times.style.width = '100%';
        times.style.height = '20%';
        minus.style.width = '100%';
        minus.style.height = '20%';
        plus.style.width = '100%';
        plus.style.height = '20%';
        equals.style.width = '100%';
        equals.style.height = '20%';

        numbers.style.display = 'inline-block';
        numbers.style.marginTop = '5px';
        numbers.style.width = '65%';
        numbers.style.height = '65%';
        numbers.style.verticalAlign = 'top';

        operators.style.display = 'inline-block';
        operators.style.marginTop = '5px';
        operators.style.width = '30%';
        operators.style.height = '65%';
    }

}());