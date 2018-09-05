
export default function newProblem(operators, maxOperand, problem) {
    problem.operator = getOperator(operators);
    problem.operand1 = getOperand(null, maxOperand);
    problem.operand2 = getOperand(problem, maxOperand)
    problem.answer = getAnswer(problem);
    // showProblem();
}

function getOperator(operators) {
    return operators[Math.floor(Math.random() * operators.length)];
}

function getOperand(problem = null, maxOperand) {
    if (problem) {
    //care must be taken for subtraction and division problems
        if (problem.operator === '-') {
        //ensure non negative result
            return randomUpTo(problem.operand1);
        } else if (problem.operator === '&#247;') {
        //ensure no remainders or fractions
            let factors = getFactors(problem.operand1);
            let factorIndex = randomUpTo(factors.length-1)
            let op2 = null
            do {
                op2 = factors[factorIndex];
            } while (problem.operand1 % op2 != 0);
            return op2;
        }
    }
    //any number will do
    return randomUpTo(maxOperand);
}

function randomUpTo(upperLimit) {
    return Math.floor(Math.random() * upperLimit);
}

//when generating a new division problem - 
//ensures whole division (no remainders or fractions)
function getFactors(number) {
    let factors = []; 
    let index = 0
    for (index = 1; index <= number; index++) {
        if (number%index === 0) {
            factors.push(index);
        }        
    }
    return factors;
}

function getAnswer(problem) {
    switch (problem.operator) {
        case '+':
            return problem.operand1 + problem.operand2
            break;
        case '-':
            return problem.operand1 - problem.operand2
            break;
        case 'x':
            return problem.operand1 * problem.operand2
            break;
        case '&#247;':
            return problem.operand1 / problem.operand2
            break;    
        default://this should never happen
            break;
    }
}
