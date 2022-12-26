
// TypeScript 没办法像 JavaScript 那样访问 DOM。这意味着每当我们尝试访问 DOM 元素时，TypeScript 都无法确定它们是否真的存在。

const link = document.querySelector('a');

console.log(link.href); // ERROR: Object is possibly 'null'. TypeScript can't be sure the anchor tag exists, as it can't access the DOM


// 使用非空断言运算符 (!)，我们可以明确地告诉编译器一个表达式的值不是 null 或 undefined。当编译器无法准确地进行类型推断时，这可能很有用：

// 我们明确告诉 TS a 标签肯定存在
const link2 = document.querySelector('a')!;

console.log(link2.href); // conardli.top


// 这里我们没必要声明 link 变量的类型。这是因为 TypeScript 可以通过类型推断确认它的类型为 HTMLAnchorElement。
// 但是如果我们需要通过 class 或 id 来选择一个 DOM 元素呢？这时 TypeScript 就没办法推断类型了：

const form = document.getElementById('signup-form');

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.


// 我们需要告诉 TypeScript form 确定是存在的，并且我们知道它的类型是  HTMLFormElement。我们可以通过类型转换来做到这一点：
const form2 = document.getElementById('signup-form') as HTMLFormElement;

console.log(form2.method); // post



// TypeScript 还内置了一个 Event 对象。如果我们在表单中添加一个 submit 的事件侦听器，TypeScript 可以自动帮我们推断类型错误：
const form3 = document.getElementById('signup-form') as HTMLFormElement;

form3.addEventListener('submit', (e: Event) => {
  e.preventDefault(); // 阻止页面刷新

  console.log(e.target); // ERROR: Property 'tarrget' does not exist on type 'Event'. Did you mean 'target'?
});



