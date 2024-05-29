export const handleFAQ = (event: React.MouseEvent) => {
  event.preventDefault();
  console.log(event);
};

export const handleHardMode = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event);
};