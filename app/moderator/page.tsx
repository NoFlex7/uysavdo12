import ProtectedRoute from "../protected/page";

export default function ModeratorPage() {
  return (
    <ProtectedRoute role="moderator">
      <h1>Moderator Panel</h1>
      <p>Bu yerga faqat moderator kirishi mumkin</p>
    </ProtectedRoute>
  );
}
