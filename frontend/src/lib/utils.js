export function formatMessageTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Format time
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // If less than 24 hours old, just show time
  if (diffInSeconds < 24 * 60 * 60 && date.getDate() === now.getDate()) {
    return timeStr;
  }

  // If yesterday, show "Yesterday"
  if (date.getDate() === yesterday.getDate() && 
      date.getMonth() === yesterday.getMonth() && 
      date.getFullYear() === yesterday.getFullYear()) {
    return `Yesterday ${timeStr}`;
  }

  // If within the last 7 days, show day name
  if (diffInSeconds < 7 * 24 * 60 * 60) {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return `${dayName} ${timeStr}`;
  }

  // If within the current year, show month and day
  if (date.getFullYear() === now.getFullYear()) {
    const monthDay = date.toLocaleDateString("en-US", { 
      month: "short",
      day: "numeric"
    });
    return `${monthDay} ${timeStr}`;
  }

  // For older messages, show full date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) + " " + timeStr;
}
