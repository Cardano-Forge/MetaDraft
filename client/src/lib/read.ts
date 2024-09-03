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
  return file?.name ?? "Project Name";
};
