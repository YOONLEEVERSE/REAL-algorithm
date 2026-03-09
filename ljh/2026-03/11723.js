// 입출력 공부 11시 5N분에 시작해서 11시 59분에 끝. 12시부터 문제 풀이 시작

// const io = () => {
//   return new Promise(() => {
//     const readline = require("readline");

//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     const iterNum = -1;
//     const input = [];

//     rl.on("line", (line) => {
//       input.push(line);
//     });

//     rl.on("close", () => {
//       resolve(input);
//     });
//   });
// };

const fs = require("fs");
const [num, ...instructions] = fs.readFileSync(0).toString().trim().split("\n");

const set = (() => {
  let set = new Set();

  const methods = {
    add: (arg) => set.add(arg),
    remove: (arg) => set.delete(arg),
    check: (arg) => {
      const hasArg = set.has(arg) ? 1 : 0;
      console.log(hasArg);

      return hasArg;
    },
    toggle: (arg) => {
      if (methods.check(arg)) {
        methods.remove(arg);
      } else methods.add(arg);
    },
    all: () => {
      set = new Set([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ]);
    },
    empty: () => set.clear(),
  };
  return methods;
})();

for (let i = 0; i < +num; i++) {
  const [opcode, operand] = instructions[i].split(" ");
  //   console.log(opcode);
  set[opcode](parseInt(operand));
}
