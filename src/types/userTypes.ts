export interface UserGeneralInfo {
    fullName: string;
    country: string;
    city: string;
    identityNumber: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    kvkkApproval: boolean;
    selectedImage: string | null;
}

export interface EducationAndSkills {
    educationLevel: string;
    schoolName: string;
    department: string;
    graduationYear: string;
    competencies: Competency[];
}

export interface Competency {
    id: number;
    skill: string;
    level: string;
}

export interface WorkingStatusAndProfession {
    workingStatus: string;
    profession: string;
}

export interface CVAndProjects {
    cv: string | null;
    projects: Project[];
}

export interface Project {
    id: number;
    title: string;
    description: string;
}

export interface UserState {
    userGeneralInfo: UserGeneralInfo;
    userEducationAndSkills: EducationAndSkills;
    userWorkingStatusAndProfession: WorkingStatusAndProfession;
    userCVAndProjects: CVAndProjects;
}
