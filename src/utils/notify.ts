import { showNotification } from "@mantine/notifications";

/**
 * Displays a notification with a specified message and style based on the condition.
 *
 * @param {string} condition - The condition that determines the color of the notification.
 *                             Possible values are "success", "error", "warning", and "notify".
 * @param {string} message - The message to be displayed in the notification.
 */
const showNotify = (condition: string, message: string) => {
  showNotification({
    autoClose: 5000,
    message,
    color: `${
      condition === "success"
        ? "green"
        : condition === "error"
          ? "red"
          : condition === "warning"
            ? "yellow"
            : condition === "notify"
              ? "blue"
              : ""
    }`,
    style: {
      backgroundColor: "whitesmoke",
      height: "60px",
      color: "white",
    },
    loading: false,
  });
};

export default showNotify;
