export default function ProfileCard({ user }) {
  return (
    <section className="card profile">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      <div>
        <h2>{user.name || user.login}</h2>
        <p>{user.bio || "No bio available"}</p>
        <p>{user.location}</p>
        <p>
          {user.followers} followers · {user.following} following · {user.public_repos} repos
        </p>
        <p>Joined {new Date(user.created_at).toLocaleDateString()}</p>
        <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
      </div>
    </section>
  );
}