import React from 'react';
import { ScrollView, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GenericText, GenericView } from '@/assets/css';
import CustomPicker from '../shared/CustomPicker';
import CustomInput from '../shared/CustomInput';
import { setUserEducationAndSkills, addCompetency, removeCompetency } from '@/store/reducers';
import { RootState } from "@/store"
import { Competency } from '@/types/userTypes';
import { dWidth } from '@/constants';

const EducationAndSkills: React.FC = () => {
    const dispatch = useDispatch();
    const userEducationAndSkills = useSelector((state: RootState) => state.userInfoReducer.userEducationAndSkills);

    const educationLevelOptions = [
        { label: 'Lise', value: 'Lise' },
        { label: 'Ön Lisans', value: 'Ön Lisans' },
        { label: 'Lisans', value: 'Lisans' },
        { label: 'Yüksek Lisans', value: 'Yüksek Lisans' },
        { label: 'Doktora', value: 'Doktora' },
    ];

    const handleChange = <T extends keyof typeof userEducationAndSkills>(key: T, value: typeof userEducationAndSkills[T]) => {
        dispatch(setUserEducationAndSkills({ ...userEducationAndSkills, [key]: value }));
    };

    const handleCompetencyChange = (index: number, key: keyof Competency, value: string) => {
        const updatedCompetencies = [...userEducationAndSkills.competencies];
        updatedCompetencies[index] = { ...updatedCompetencies[index], [key]: value };
        handleChange('competencies', updatedCompetencies);
    };

    const handleAddCompetency = () => {
        dispatch(addCompetency({ id: Date.now(), skill: "", level: "" })); // `id` için `Date.now()` kullanarak basit bir benzersiz değer ürettik
    };

    const handleRemoveCompetency = (index: number) => {
        dispatch(removeCompetency(userEducationAndSkills.competencies[index].id));
    };

    return (
        <ScrollView contentContainerStyle={{ padding: dWidth * 0.025 }} style={[{ width: dWidth }]}>
            <GenericView center marginTop={dWidth * 0.05}>
                <GenericText bold>Eğitim Seviyesi ve Yetkinlik Bilgileri</GenericText>
            </GenericView>
            <GenericView marginTop={dWidth * 0.05}>
                <CustomPicker
                    value={userEducationAndSkills.educationLevel}
                    onValueChange={(value) => handleChange('educationLevel', value)}
                    items={educationLevelOptions}
                    placeholder={{ label: 'Eğitim seviyesi seçin...', value: '' }}
                />
            </GenericView>
            <GenericView marginTop={dWidth * .05}>
                <CustomInput
                    label="Okul Adı"
                    value={userEducationAndSkills.schoolName}
                    onChangeText={(text) => handleChange('schoolName', text)}
                />
            </GenericView>
            <GenericView marginTop={dWidth * .05}>
                <CustomInput
                    label="Bölüm"
                    value={userEducationAndSkills.department}
                    onChangeText={(text) => handleChange('department', text)}
                />
            </GenericView>
            <GenericView marginTop={dWidth * .05}>
                <CustomInput
                    label="Mezuniyet Yılı"
                    value={userEducationAndSkills.graduationYear}
                    onChangeText={(text) => handleChange('graduationYear', text)}
                />
            </GenericView>
            {userEducationAndSkills.competencies.map((competency, index) => (
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
                    <Button title="Yetkinliği Kaldır" onPress={() => handleRemoveCompetency(index)} />
                </View>
            ))}
            <Button title="Yetkinlik Ekle" onPress={handleAddCompetency} />
        </ScrollView>
    );
};

export default EducationAndSkills;
