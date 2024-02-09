import React from 'react';
import { ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import CustomPicker from '../shared/CustomPicker';
import CustomInput from '../shared/CustomInput';
import { setUserEducationAndSkills, addCompetency, removeCompetency } from '@/store/reducers';
import { RootState } from "@/store"
import { Competency } from '@/types/userTypes';
import { colors, dWidth } from '@/constants';

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
                <GenericText bold fontSize={16}>Eğitim Seviyesi ve Yetkinlik Bilgileri</GenericText>
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
            <GenericView alignItems='flex-end' padding={dWidth * .025} borderBottomWidth={1} borderBottomColor='#cccccc'>
                <GenericTouchableOpacity
                    onPress={handleAddCompetency}
                    center
                    padding={dWidth * .025}
                    backgroundColor={colors.primary}
                    borderRadius={10}
                >
                    <GenericText fontSize={15} color={colors.white} bold>Yetkinlik Ekle</GenericText>
                </GenericTouchableOpacity>
            </GenericView>
            {userEducationAndSkills.competencies.map((competency, index) => (
                <GenericView key={competency.id} padding={dWidth * .025} borderBottomWidth={1} borderBottomColor="#cccccc">
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
                    <GenericView center marginTop={dWidth * .025}>
                        <GenericTouchableOpacity
                            onPress={() => handleRemoveCompetency(index)}
                            backgroundColor={'red'}
                            center
                            padding={dWidth * .025}
                            borderRadius={10}
                        >
                            <GenericText color={colors.white} bold>Yetkinliği Sil</GenericText>
                        </GenericTouchableOpacity>
                    </GenericView>
                </GenericView>
            ))}
        </ScrollView>
    );
};

export default EducationAndSkills;
