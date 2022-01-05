type GetMulterConfigModel = {
  folder: "avatar" | "files";
  allowedMimes: string[];
  maxSize?: number;
};

export { GetMulterConfigModel };
