import { useState } from "react";

function SearchAssistant() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`
      );
      const data = await res.json();
      setResults(data.query.search);
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">🔎 Study Topic Assistant</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a topic (e.g., Operating System)"
          className="flex-1 border px-4 py-2 rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-500">🔄 Searching...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <ul className="space-y-4 mt-4">
          {results.map((item) => (
            <li key={item.pageid} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">{item.title}</h3>
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.snippet }}
              ></p>
              <a
                href={`https://en.wikipedia.org/?curid=${item.pageid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-500 underline"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchAssistant;
