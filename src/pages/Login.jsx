import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // ✅ Listen to auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created successfully!");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔓 Logout function
  const handleLogout = async () => {
    await signOut(auth);
    alert("👋 Logged out successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {user ? "Welcome 👋" : isLogin ? "Login to EduMentor" : "Register on EduMentor"}
        </h2>

        {user ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">Logged in as <strong>{user.email}</strong></p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              🔒 Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full border px-4 py-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="w-full border px-4 py-2 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            <p
              className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
