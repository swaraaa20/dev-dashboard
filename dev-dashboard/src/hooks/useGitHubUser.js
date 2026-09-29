import { useState, useEffect } from "react";

export function useGitHubUser(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      setData(null);
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { signal: controller.signal }),
        ]);
        if (userRes.status === 404) throw new Error("User not found");
        if (userRes.status === 403) throw new Error("Rate limit reached. Try again in an hour.");
        if (!userRes.ok || !repoRes.ok) throw new Error("Something went wrong");

        const user = await userRes.json();
        const repos = await repoRes.json();
        setData({ user, repos });
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  return { data, loading, error };
}