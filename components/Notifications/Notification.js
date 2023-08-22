import { NotificationContainer } from "./Notification.styled";

export default function Notification({ message, type }) {
  return <NotificationContainer type={type}>{message}</NotificationContainer>;
}
