export interface IUserInfo {
    "UserInfoInfoGeneral": IUserInfoGeneral,
    "UserWorkingStatusAndProfessionInformation": IUserWorkingStatusAndProfessionInformation,
    "UserEducationLevelAndCompetencyInformation": IUserEducationLevelAndCompetencyInformation,
};
export interface IUserInfoGeneral {
    "fullName": string,
    "country": string,
    "city": string,
    "identityNumber": string,
    "phoneNumber": string,
    "birthDate": Date,
    "gender": string,
    "kvkkApproval": boolean,
};
export interface IUserWorkingStatusAndProfessionInformation {
    "WorkingStatus": string,
    "Profession": string,
};
export interface IUserEducationLevelAndCompetencyInformation {
    "EducationLevel": string,
    "SchoolName": string,
    "Department": string,
    "GraduationYear": string,
    Competencies: ICompetency[]; // Yetkinlikler dizisi
};
export interface ICompetency {
    id: number; // Her yetkinlik için benzersiz bir ID
    skill: string; // Yetkinlik alanı
    level: string; // Derece ya da yetkinlik seviyesi
}