/*const fruits = ["Apple", "Banana", "Orange"];
const vegetables = ["Cucumber", "Radish"];

//console.log([fruits, vegetables]); //does not concatenate the arrays
//copies the array data into a new array without saving old array structure
console.log([...fruits, ...vegetables]);
*/
/*
const developer = {
  salary: 100000,
  experience: 4.5,
  techStack: ["Vue", "HTML", "CSS"],
  lookingForWork: true,
  doubleSalary() {
    this.salary = this.salary * 2;
    this.lookingForWork = false;
  },
};
console.log(developer);
developer.doubleSalary();
console.log(developer);
*/

export const evenOrOdd = (number) => {
  if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
};
export const multiply = (num1, num2) => {
  return num1 * num2;
};
