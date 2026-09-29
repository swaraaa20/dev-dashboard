import { useState, useEffect } from "react";
import { useGitHubUser } from "./hooks/useGitHubUser";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import Charts from "./components/Charts";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recent")) || []; }
    catch { return []; }
  });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { data, loading, error } = useGitHubUser(username);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = (name) => {
    setUsername(name);
    const updated = [name, ...recent.filter((r) => r !== name)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recent", JSON.stringify(updated));
  };

  return (
    <main className="container">
      <header>
  <div>
    <p className="eyebrow">GITHUB ANALYTICS</p>
    <h1>Developer Dashboard</h1>
    <p className="subtitle">
      Explore GitHub profiles, repositories and developer activity.
    </p>
  </div>

  <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
  </button>
</header>

      <SearchBar onSearch={handleSearch} />

      {recent.length > 0 && (
        <div className="recent">
          Recent: {recent.map((r) => (
            <button key={r} className="chip" onClick={() => handleSearch(r)}>{r}</button>
          ))}
        </div>
      )}

      {loading && <p className="skeleton">Loading...</p>}
      {error && <p role="alert" className="error">{error}</p>}

      {data && (
        <>
          <ProfileCard user={data.user} />
          <Charts repos={data.repos} />
          <RepoList repos={data.repos} />
        </>
      )}
    </main>
  );
}