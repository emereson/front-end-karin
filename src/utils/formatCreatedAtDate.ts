export const formatCreatedAtDate = (createdAt: string): string => {
  const createdAtDate = new Date(createdAt);

  const day = String(createdAtDate.getDate()).padStart(2, "0");
  const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
  const year = createdAtDate.getFullYear();

  const hours = String(createdAtDate.getHours()).padStart(2, "0");
  const minutes = String(createdAtDate.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDate = (dateInput: string) => {
  if (!dateInput) return;

  const separator = dateInput.includes("-") ? "-" : "/";
  const [year, month, day] = dateInput.split(separator).map(Number);

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}-${formattedMonth}-${formattedYear}`;
};

export const formatDateForInput = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};
