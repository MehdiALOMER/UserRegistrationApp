import React, { useState } from 'react';
import { ScrollView, Button, View, TextInput, StyleSheet } from 'react-native';
import { GenericText, GenericView } from '@/assets/css';
import { dWidth } from '@/constants';
import CustomPicker from '../shared/CustomPicker';
import CustomInput from '../shared/CustomInput';
import { IUserEducationLevelAndCompetencyInformation } from '@/types/dataTypes';

const EducationAndSkills = () => {
    const [userEducationAndSkills, setUserEducationAndSkills] = useState<IUserEducationLevelAndCompetencyInformation>({
        EducationLevel: "",
        SchoolName: "",
        Department: "",
        GraduationYear: "",
        Competencies: [{ id: Math.random(), skill: "", level: "" }],
    });

    const educationLevelOptions = [
        { label: 'Lise', value: 'High School' },
        { label: 'Ön Lisans', value: 'Associate Degree' },
        { label: 'Lisans', value: 'Bachelor Degree' },
        { label: 'Yüksek Lisans', value: 'Master Degree' },
        { label: 'Doktora', value: 'Doctorate Degree' },
    ];

    const handleChange = (key: string, value: string | any[]) => {
        setUserEducationAndSkills(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleCompetencyChange = (index: number, key: string, value: string) => {
        const updatedCompetencies = [...userEducationAndSkills.Competencies];
        updatedCompetencies[index] = {
            ...updatedCompetencies[index],
            [key]: value,
        };
        handleChange('Competencies', updatedCompetencies);
    };

    const addCompetency = () => {
        handleChange('Competencies', [
            ...userEducationAndSkills.Competencies,
            { id: Math.random(), skill: "", level: "" },
        ]);
    };

    const removeCompetency = (index: number) => {
        const filteredCompetencies = userEducationAndSkills.Competencies.filter((_, idx) => idx !== index);
        handleChange('Competencies', filteredCompetencies);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: dWidth * 0.025 }} style={[{ width: dWidth }]}>
            <GenericView center marginTop={dWidth * 0.05}>
                <GenericText bold>Eğitim Seviyesi ve Yetkinlik Bilgileri</GenericText>
            </GenericView>
            <GenericView marginTop={dWidth * 0.05}>
                <CustomPicker
                    value={userEducationAndSkills.EducationLevel}
                    items={educationLevelOptions}
                    onValueChange={(value) => handleChange('EducationLevel', value)}
                    placeholder={{ label: 'Eğitime seviyesi seçin...', value: null }}
                />
            </GenericView>
            <GenericView marginTop={dWidth * .05}>
                <CustomInput
                    label="Okul Adı"
                    value={userEducationAndSkills.SchoolName}
                    onChangeText={(text) => handleChange('SchoolName', text)}
                />
            </GenericView>
            <GenericView marginTop={dWidth * .05}>
                <CustomInput
                    label="Bölüm"
                    value={userEducationAndSkills.Department}
                    onChangeText={(text) => handleChange('Department', text)}
                />
            </GenericView>
            <GenericView marginTop={dWidth * .05}>
                <CustomInput
                    label="Mezuniyet Yılı"
                    value={userEducationAndSkills.GraduationYear}
                    onChangeText={(text) => handleChange('GraduationYear', text)}
                />
            </GenericView>

            {userEducationAndSkills.Competencies.map((competency, index) => (
                <View key={competency.id}>
                    <CustomInput
                        label="Yetkinlik"
                        value={competency.skill}
                        onChangeText={(text) => handleCompetencyChange(index, 'skill', text)}
                    />
                    <CustomInput
                        label="Derece"
                        value={competency.level}
                        onChangeText={(text) => handleCompetencyChange(index, 'level', text)}
                    />
                    <Button title="Yetkinliği Kaldır" onPress={() => removeCompetency(index)} />
                </View>
            ))}
            <Button title="Yetkinlik Ekle" onPress={addCompetency} />
        </ScrollView>
    );
};

export default EducationAndSkills;

