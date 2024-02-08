import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserGeneralInfo, EducationAndSkills, WorkingStatusAndProfession, CVAndProjects, Project, Competency } from '@/types/userTypes';

const initialState: UserState = {
    userGeneralInfo: {
        fullName: '',
        country: '',
        city: '',
        identityNumber: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        kvkkApproval: false,
        selectedImage: null,
    },
    userEducationAndSkills: {
        educationLevel: '',
        schoolName: '',
        department: '',
        graduationYear: '',
        competencies: [],
    },
    userWorkingStatusAndProfession: {
        workingStatus: '',
        profession: '',
    },
    userCVAndProjects: {
        cv: null,
        projects: [],
    }
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserGeneralInfo: (state, action: PayloadAction<UserGeneralInfo>) => {
            state.userGeneralInfo = { ...state.userGeneralInfo, ...action.payload };
        },
        setUserEducationAndSkills: (state, action: PayloadAction<EducationAndSkills>) => {
            state.userEducationAndSkills = { ...state.userEducationAndSkills, ...action.payload };
        },
        setUserWorkingStatusAndProfession: (state, action: PayloadAction<WorkingStatusAndProfession>) => {
            state.userWorkingStatusAndProfession = { ...state.userWorkingStatusAndProfession, ...action.payload };
        },
        setUserCVAndProjects: (state, action: PayloadAction<CVAndProjects>) => {
            state.userCVAndProjects = { ...state.userCVAndProjects, ...action.payload };
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.userCVAndProjects.projects.push(action.payload);
        },
        removeProject: (state, action: PayloadAction<number>) => {
            state.userCVAndProjects.projects = state.userCVAndProjects.projects.filter(project => project.id !== action.payload);
        },
        addCompetency: (state, action: PayloadAction<Competency>) => {
            state.userEducationAndSkills.competencies.push(action.payload);
        },
        removeCompetency: (state, action: PayloadAction<number>) => {
            state.userEducationAndSkills.competencies = state.userEducationAndSkills.competencies.filter(comp => comp.id !== action.payload);
        },
    },
});

export const {
    setUserGeneralInfo,
    setUserEducationAndSkills,
    setUserWorkingStatusAndProfession,
    setUserCVAndProjects,
    addProject,
    removeProject,
    addCompetency,
    removeCompetency
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
