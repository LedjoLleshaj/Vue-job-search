export interface JobInterface {
  id: number;
  title: string;
  organization: string;
  degree: string;
  jobType: string;
  location: string[];
  minimumQualification: string[];
  preferredQualification: string[];
  description: string[];
  dateAdded: string;
}
