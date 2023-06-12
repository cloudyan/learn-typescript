

// useState()
// 我们可以用尖括号来声明状态变量的类型。如果我们省略了尖括号，TypeScript 会默认推断 cash 是一个数字。因此，如果想让它也为空，我们必须指定：
const Person: React.FC<Props> = ({ name, age }) => {
  const [cash, setCash] = useState<number | null>(1);

  setCash(null);

  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};


// useRef()
// useRef 返回一个可变对象，该对象在组件的生命周期内都是持久的。我们可以告诉 TypeScript ref 对象应该指向什么：
const Person: React.FC = () => {
  // Initialise .current property to null
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type='text' ref={inputRef} />
    </div>
  );
};
