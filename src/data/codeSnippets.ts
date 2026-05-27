const codeSnippets = [
  `const sum = (a, b) => a + b;`,

  `function greet(name) {
  return "Hello " + name;
}`,

  `useEffect(() => {
  fetchUsers();
}, []);`,

  `if (isLoggedIn) {
  navigate("/dashboard");
}`,

  `body {
  margin: 0;
  padding: 0;
}`,

  `interface User {
  id: number;
  name: string;
}`,

  `try {
  const data = await response.json();
} catch (error) {
  console.log(error);
}`,

  `SELECT * FROM users
WHERE age > 18;`,
];

export default codeSnippets;