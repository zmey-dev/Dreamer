export const isImage = (filename) => {
  return ["jpeg", "png", "jpg", "gif", "svg"].includes(
    filename?.split(".").pop()
  );
};
