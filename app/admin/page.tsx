import ProtectedRoute from "../protected/page";

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <h1>Admin Panel</h1>
      <p>Bu yerga faqat admin kirishi mumkin</p>
    </ProtectedRoute>
  );
}
