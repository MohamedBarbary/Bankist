'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const operationType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--deposit">${
      i + 1
    } ${operationType}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaylBalance = function (account) {
  const movements = account.movements;
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  console.log(balance);
  account.balance = balance;
  labelBalance.textContent = `${balance}€`;
};
const clacDisplaySummary = function (account) {
  const movments = account.movements;
  const incomes = movments
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const output = movments
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(output)}€`;
  const interest = movments
    .filter(mov => mov > 0)
    .map(dep => dep * (account.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// const user = 'Steven Thomas Williams';
const createuserNames = function (users) {
  users.forEach(function (user) {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(char => char[0])
      .join('');
  });
};

createuserNames(accounts);
const updateUi = function (acc) {
  // movments
  displayMovements(acc.movements);
  // balance
  calcDisplaylBalance(acc);
  //summary
  clacDisplaySummary(acc);
};
// event handler
let curAccount;
btnLogin.addEventListener('click', function (e) {
  // prevnet form from sumititing
  e.preventDefault();
  curAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(curAccount);
  if (curAccount?.pin === Number(inputLoginPin.value)) {
    // clear input pins
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // remove focus from any
    // sooooooooooooooooooooooooooo imprtant
    //  optional chaining
    // diplay ui & massage
    labelWelcome.textContent = `Welcome back ${curAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUi(curAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    curAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount?.username !== curAccount.username
  ) {
    console.log('valid');
    curAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUi(curAccount);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && curAccount.movements.some(mov => mov >= amount / 10)) {
    // add movments
    curAccount.movements.push(amount);
    // update ui
    updateUi(curAccount);
  }
  inputLoanAmount.value;
});
// can use findIndex with splice slice to delete etc
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === curAccount.username &&
    Number(inputClosePin.value) === curAccount.pin
  ) {
    // find && findindx is ES6
    const indexDeleted = accounts.findIndex(
      acc => acc.username === curAccount.username
    );
    containerApp.style.opacity = 0;
    accounts.splice(indexDeleted, 1);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(curAccount.movements, sorted);
});
// create html ele ? templete ``
//containerMovements.insertAdjacentHTML('afterbegin', html);
// textContent change text only & innerHTMl change every thing include content in div athoer divs
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// let arr = [2, 3, 4, 6];
// console.log(arr.slice(2, 3));
// console.log(arr.slice(0, -2));
// console.log(arr.slice());
// console.log([...arr]);

// console.log(arr);

// arr.slice (2,3) // slice don't include end
// arr.splice (2,3) // end is n of el want to delete
// you can use splice to delete
// slice don't change its arr &splice change its arr
// console.log(arr.splice(0, 2));
// console.log(arr);
// console.log(arr.reverse());
// const letter = arr.concat([44, 44, 99]);
// console.log(letter);

// console.log(letter.join(' - ')); //44 - 44 - 99;
// help make method chaining
// let arr = [2, 3, 4, 6];
// console.log(arr.at(0));
// console.log('mohamed'.at(0));
// console.log(arr.at(-1)); // reutun ele not array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const [i, m] of movements.entries()) {
//   if (m > 0) {
//     console.log(` i == ${i}you deposite ${m}`);
//   } else {
//     console.log(`  i == ${i} you widthrew ${Math.abs(m)}`);
//   }
// }
// console.log('-----------------------------');
// movements.forEach(function (mov, index, array) {
//   if (mov > 0) {
//     console.log(`${index}you deposite ${mov}`);
//   } else {
//     console.log(`${index}you widthrew ${Math.abs(mov)}`);
//   }
//   // console.log(array);
// });
// we use callback function what anthor what should it do
// fun(200)
// fun(450)
// fun(-400)

// you cannot use break & continue in foreach
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key, map) {
//   console.log(key, value);
// });

// const currenciesu = new Set([1, 23, 45]);
// currenciesu.forEach(function (value, key, map) {
//   console.log(key, value); // key===value in Set
// });
//

//
// coding 1
// const dogsKate = function (arr1, arr2) {
//   const shallowArray = arr1.slice(1, -2);
//   // console.log(shallowArray);
//   const arr3 = [...shallowArray, ...arr2];
//   arr3.forEach(function (dog, i) {
//     const type = dog >= 3 ? 'adult' : 'puppy';
//     if (type === 'puppy') {
//       console.log(`${i + 1} is still ${type} , his year is ${dog}`);
//     } else {
//       console.log(`${i + 1} become ${type} , his year is ${dog}`);
//     }
//   });
// };
//
// dogsKate([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// const uroToUsd = 1.1;
// const movementsUsd = movements.map(mov => mov * uroToUsd);
// console.log(movementsUsd);

// const movmentsDescription = movements.map(
//   (mov, i) =>
//     `movment ${i + 1} you ${mov > 0 ? 'deposit' : 'withdrawal'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movmentsDescription);
// const fl = movements.filter(ele => ele <= 200);
// console.log(fl);
// const balance = movements.reduce(acc =  cur, i, arr =>  acc + cur, 0); // intial value
// console.log(balance);
//
// const movements = [4000, 200, 450, -400, 3000, -650, -130, 70, 1300];
// const maxEle = movements.reduce(function (acc, val) {
//   return acc > val ? acc : val;
// }, 0);
// console.log(maxEle);

// console.log(calcAverageHumanAge(ages));
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const total = movements
//   .filter(mov => mov > 0)
//   .map((mp, i, arr) => {
//     return mp * 1.1;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(total);
// const firstwithdrawal = movements.find(mov => mov < 0);
// return first array is true which is -400
// find return ele not an array

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// let val;
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     val = acc;
//     break;
//   }
// }
// console.log(val);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const isFoundPostive = movements.some(mov => mov > 0); //if any value >0
// const isGreater = movements.some(mov => mov > 4000); //if any value 4000
// console.log(isFoundPostive); // out => true

// // if every ele pass the test
// console.log(movements.every(mov => mov > 0)); // false
// // seperate callback
// const deposit = mov => mov > 0;
// console.log(movements.every(deposit)); // false

// // ES2018 flat and flatmap
// const arr = [
//   [1, 2, 3],
//   [4, 5],
//   [6, 8, 9],
// ];
// console.log(arr.flat()); // no array inside it
// const arrDeep = [1, 2, [2, 33, [444, 9]]];
// console.log(arrDeep.flat(2)); // two layers of flating
// const accountMovements = accounts.map(acc => acc.movements);
// const allMov = accountMovements.flat();
// const overAllBalance = allMov.reduce((acc, mov) => acc + mov, 0);

// //faltMap collect map and flat
// const overAll2 = accounts.flatMap(acc => acc.movements);
// console.log(overAll2);
// // ****************
// // sort is very strange here sort depednet on strings !
// const array = [33, 44, 1, 234, -1, -2, 555];
// console.log(owners.sort()); // random out depednet on strings
// // soluation use compare
// // ascending order
// movements.sort((a, b) => {
//   if (a > b) {
//     // means = a-b >0
//     return 1; // n>0  // switch order
//   }
//   if (a < b) {
//     // means  a-b<0
//     return -1; // keep order
//   }
// });
// means = a-b >0
// means  a-b<0

// movements.sort((a, b) => a - b);

// const c = new Array([4]); //create array with one ele
// const x = new Array(4); // create emtpy array 4 places
// x.fill(2);
// console.log(x); // all array = 2;
// x.fill(4, 1, 3); // fill from 1 to 3

// //

// const arr = Array.from({ length: 7 }, () => 1);
// const g = Array.from({ length: 6 }, (_, i) => i + 1); // create array from 1 - 6
// // array from so important to convert nodeList to array
// const movUi = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movUi.map(el => Number(el.textContent.replace('€', ''))));
// const bankDpSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(acc => acc.movements)
//   .reduce((sum, mov) => sum + mov, 0);
// // 2.
// const numsDp1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((cnt, cur) => (cur > 1000 ? (cnt += 1) : cnt), 0);
// console.log(numsDp1000);
// //
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, cur) => {
//       cur > 0 ? (sum.deposite += cur) : (sum.withdrawal += cur);
//       return sum;
//     },
//     { deposite: 0, withdrawal: 0 }
//   );
// console.log(sums);
// const arr = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, cur) => {
//       cur > 0 ? sum.push(cur) : sum;
//       return sum;
//     },
//     [1, 24, 5]
//   );
// console.log(arr);
// //4.
// //
// const convertTitleCase = function (title) {
//   const ex = ['a', 'an', 'the', 'but', 'or', 'on', 'in'];
//   const titelCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       ex.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');

//   return titelCase;
// };
// console.log(convertTitleCase('this is a long title but not too long'));
// console.log(
//   convertTitleCase('this is a special ot app but not an only in math')
// );
// (a===a++) &(++a > a) after compilation in JS
//
// coding 4
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// // 1.
// dogs.forEach(function (dog) {
//   dog.food = Math.trunc(dog.weight ** 0.75 * 28);
// });
// //2.
// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   `sarah dog eats to ${sarahDog.curFood > sarahDog.food ? 'much' : 'little'}`
// );
// //3.
// const eatMuch = dogs
//   .filter(dog => dog.curFood > dog.food)
//   .flatMap(dog => dog.owners);
// console.log(eatMuch);
// const little = dogs
//   .filter(dog => dog.curFood < dog.food)
//   .flatMap(dog => dog.owners);
// console.log(eatMuch);
// console.log(`${eatMuch.join(' and ')} eating to much`);
// console.log(`${little.join(' and ')} eating to little`);
// console.log(dogs.some(dog => dog.curFood === dog.food));

//
// coding 1
// const dogsKate = function (arr1, arr2) {
//   const shallowArray = arr1.slice(1, -2);
//   // console.log(shallowArray);
//   const arr3 = [...shallowArray, ...arr2];
//   arr3.forEach(function (dog, i) {
//     const type = dog >= 3 ? 'adult' : 'puppy';
//     if (type === 'puppy') {
//       console.log(`${i + 1} is still ${type} , his year is ${dog}`);
//     } else {
//       console.log(`${i + 1} become ${type} , his year is ${dog}`);
//     }
//   });
// };
//
// coding 2
// const ages = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function (val) {
//     if (val <= 2) {
//       return val * 2;
//     } else {
//       return 16 + val * 4;
//     }
//   });
//   const ageExclude = humanAges.filter(val => val >= 18);
//   const finalValue = ageExclude.reduce((acc, val) => acc + val, 0);
//   return finalValue / ageExclude.length;
// };

// coding 3
// const ages = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages
//     .map(val => {
//       return val <= 2 ? val * 2 : 16 + val * 4;
//     })
//     .filter(val => val >= 18)
//     .reduce((acc, val, i, arr) => acc + val / arr.length, 0);
//   return humanAges;
// };
// console.log(calcAverageHumanAge(ages));
