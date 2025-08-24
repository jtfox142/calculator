/*
  This calculator mostly works. It can only handle single digit numbers, cannot handle whitespace,
  and does not correctly output floats. It also cannot yet display in the browser. However,
  I am satisfied with what I was able to do in a short amount of time.

  TODO:
    * Host on browser
    * Handle multi-digit numbers like "25"
    * Enable the output of floats (like if an expr evaluates to 1/7)
*/
const calculate = (expression: string): number => {
   if(expression.length == 1)
    return parseInt(expression);
  else if(expression.length < 3) //Error: expressions must be solvable
    return -1;

  let solution: number;
  solution = solve(0, 2, expression);
  return solution;
}

const solve = (start: number, end: number, expression: string): number => {
  let solution: number;
  let operand:string = expression.at(start)!;
  let arg1:string = expression.at(start + 1)!;
  let arg2:string = expression.at(end)!;

  console.log(`${arg1} is a number: `, isNaN(Number(arg1)))
  if(isNaN(Number(arg1))) {
    const replace:number = solve(start + 1, end + 1, expression);
    expression = removeArgs(start + 2, end + 1, expression);
    arg1 = replace.toString();
  }

  console.log(`${arg2} is a number: `, isNaN(Number(arg2)))
  if(isNaN(Number(arg2))) {
    const replace:number = solve(end, end + 2, expression);
    expression = removeArgs(end + 1, start + 2, expression);
    arg2 = replace.toString();
  }

  const term1:number = Number(arg1);
  const term2:number = Number(arg2);

  switch(operand) {
    case '+':
      solution = term1 + term2;
      break;
    case '-':
      solution = term1 - term2;
      break;
    case '*':
      solution = term1 * term2;
      break;
    case '/':
      solution = term1 / term2;
      break;
    default:
      solution = 0;
      //Throw Error;
      break;
  }

  return solution;
}

const removeArgs = (startIndex:number, endIndex:number, originalString:string,):string => {
  // Get the part of the string before the specified range
  const partBefore = originalString.slice(0, startIndex);

  // Get the part of the string after the specified range
  const partAfter = originalString.slice(endIndex);

  // Concatenate the two parts to form the new string
  return partBefore + partAfter;
}