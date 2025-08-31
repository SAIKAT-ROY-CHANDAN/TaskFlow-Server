// AboutHomeKeyPoint type
export type TAboutHomeKeyPoint = {
  id: string;
  point: string;
  createdAt: Date;
  updatedAt: Date;
  aboutHomeId: string;
};

// AboutHome type
export type TAboutHome = {
  id: string;
  title: string;
  description: string;
  numberOfProjects?: number | null;
  numberOfClients?: number | null;
  sideImage1?: string | null;
  sideImage2?: string | null;
  createdAt: Date;
  updatedAt: Date;
  keyPoints: TAboutHomeKeyPoint[];
};
