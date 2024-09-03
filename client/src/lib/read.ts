export const readFile = async (file: File | undefined) => {
  return new Promise<object>((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          return resolve(readJSON(e.target?.result?.toString()));
        } catch (err) {
          return reject(err);
        }
      };

      reader.onerror = (err) => {
        return reject(err);
      };

      reader.readAsText(file);
    }
  });
};

export const readJSON = (data: string | undefined): object => {
  if (!data) return {};
  try {
    return JSON.parse(data) as object;
  } catch (e) {
    return {};
  }
};

export const getFileName = (file: File | undefined) => {
  if (!file) return "Project Name";

  const lastDotIndex = file.name.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return file.name;
  }

  return file.name.slice(0, lastDotIndex);
};
