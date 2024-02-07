import React, { useState } from 'react';
import { dWidth } from '@/constants';
import { GenericText, GenericView } from '@/assets/css';
import CustomPicker from '../shared/CustomPicker';
import { IUserWorkingStatusAndProfessionInformation } from '@/types/dataTypes';

const WorkAndProfession = () => {
    const [userWorkAndProfession, setUserWorkAndProfession] = useState<IUserWorkingStatusAndProfessionInformation>({
        "WorkingStatus": "",
        "Profession": "",
    });

    const workStatusOptions = [
        { label: 'Çalışıyor', value: 'working' },
        { label: 'Öğrenci', value: 'student' },
        { label: 'İşsiz', value: 'unemployed' },
        { label: 'Emekli', value: 'retired' },
    ];
    const professionOptions = [
        { label: 'Yazılımcı', value: 'Software Developer' },
        { label: 'Doktor', value: 'Doctor' },
        { label: 'Mühendis', value: 'Engineer' },
        { label: 'Öğretmen', value: 'Teacher' },
    ];

    const handleChange = (key: string, value: string) => {
        setUserWorkAndProfession(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    return (
        <GenericView width={dWidth} padding={dWidth * 0.025} flex={1}>
            <GenericView center marginTop={dWidth * 0.05}>
                <GenericText bold>Çalışma Durumu ve Meslek Bilgileri</GenericText>
            </GenericView>
            <GenericView marginTop={dWidth * 0.05}>
                <CustomPicker
                    value={userWorkAndProfession.WorkingStatus}
                    items={workStatusOptions}
                    onValueChange={(value) => handleChange('Working Status', value)}
                    placeholder={{ label: 'Çalışma durumu seçin...', value: null }}
                />
            </GenericView>
            <GenericView marginTop={dWidth * 0.05}>
                <CustomPicker
                    value={userWorkAndProfession.Profession}
                    items={professionOptions}
                    onValueChange={(value) => handleChange('Profession', value)}
                    placeholder={{ label: 'Meslek seçin...', value: null }}
                />
            </GenericView>
        </GenericView>
    );
}

export default WorkAndProfession;
