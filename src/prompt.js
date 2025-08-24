function runScript() {
  const expression = prompt("Enter expression to be evaluated: ");
  const solution = calculate(expression);
  console.log(solution);
}

runScript();