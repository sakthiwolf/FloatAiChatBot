import styles from "../../styles/Sidebar.module.css";
import { useAuth } from "../../pages/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logochat.png";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const getDisplayName = () => {
    if (!user) return "User";
    return user.displayName || user.email || "User";
  };

  const getDefaultAvatar = () => {
    const name = getDisplayName();
    const initials =
      name
        .split("@")[0]
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("") || "U";
    return `https://ui-avatars.com/api/?background=1e293b&color=fff&name=${encodeURIComponent(
      initials
    )}`;
  };

  const avatarSrc = (user && user.photoURL) || getDefaultAvatar();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.brand}>
        <img src={logo} alt="Ocean Logo" className={styles.logo} />
        <h1 className={styles.brandName}>Ocean Chat</h1>
      </div>

      {/* User info */}
      {user && (
        <div className={styles.userCard}>
          <img
            className={styles.avatar}
            src={avatarSrc}
            alt={getDisplayName()}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getDefaultAvatar();
            }}
          />
          <div className={styles.userInfo}>
            <div className={styles.userName}>{getDisplayName()}</div>
            <div className={styles.userEmail} title={user.email}>
              {user.email}
            </div>
          </div>
        </div>
      )}

      {/* Logout button */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
