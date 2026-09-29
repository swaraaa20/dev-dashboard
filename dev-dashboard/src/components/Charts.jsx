import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const COLORS = ["#0078d4", "#50e6ff", "#8661c5", "#e3008c", "#ffb900", "#107c10"];

export default function Charts({ repos }) {
  const langCount = {};
  repos.forEach((r) => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
  });
  const langData = Object.entries(langCount).map(([name, value]) => ({ name, value }));

  const starData = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((r) => ({ name: r.name, stars: r.stargazers_count }));

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <section className="charts">
      <div className="stats">
        <div className="card">★ {totalStars} total stars</div>
        <div className="card">⑂ {totalForks} total forks</div>
      </div>

      <div className="card chart">
        <h3>Languages</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={langData} dataKey="value" nameKey="name" outerRadius={90} label>
              {langData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart">
        <h3>Top repos by stars</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={starData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="stars" fill="#0078d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}