import { useState, useMemo } from "react";

export default function RepoList({ repos }) {
  const [sortBy, setSortBy] = useState("stars");
  const [language, setLanguage] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const languages = useMemo(
    () => ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  );

  const filtered = useMemo(() => {
    return repos
      .filter((r) => language === "All" || r.language === language)
      .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) =>
        sortBy === "stars"
          ? b.stargazers_count - a.stargazers_count
          : new Date(b.updated_at) - new Date(a.updated_at)
      );
  }, [repos, sortBy, language, query]);

  return (
    <section>
      <div className="controls">
        <input placeholder="Filter repos..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="stars">Most stars</option>
          <option value="updated">Recently updated</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div className="repo-grid">
        {filtered.slice(0, visible).map((repo) => (
          <a key={repo.id} className="card repo" href={repo.html_url} target="_blank" rel="noreferrer">
            <h3>{repo.name}</h3>
            <p>{repo.description || "No description"}</p>
            <small>{repo.language || "N/A"} · ★ {repo.stargazers_count} · ⑂ {repo.forks_count}</small>
          </a>
        ))}
      </div>

      {visible < filtered.length && (
        <button onClick={() => setVisible(visible + 6)}>Show more</button>
      )}
    </section>
  );
}