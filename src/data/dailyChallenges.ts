const dailyChallenges = [
  {
    title: "React Hooks",
    content: `useEffect(() => {
  fetchUsers();
}, []);`,
  },

  {
    title: "JavaScript Async",
    content: `async function getData() {
  const response = await fetch("/api");
  return response.json();
}`,
  },

  {
    title: "CSS Flexbox",
    content: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
  },

  {
    title: "SQL Query",
    content: `SELECT * FROM users
WHERE age > 18;`,
  },
];

export default dailyChallenges;