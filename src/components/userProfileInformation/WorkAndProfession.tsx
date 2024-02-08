import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenericView, GenericText } from '@/assets/css';
import CustomPicker from '../shared/CustomPicker';
import { RootState } from "@/store"
import { dWidth } from '@/constants';
import { setUserWorkingStatusAndProfession } from '@/store/reducers';

const WorkAndProfession: React.FC = () => {
    const dispatch = useDispatch();
    const userWorkAndProfession = useSelector((state: RootState) => state.userInfoReducer.userWorkingStatusAndProfession);

    const workStatusOptions = [
        { label: 'Çalışıyor', value: 'Çalışıyor' },
        { label: 'Öğrenci', value: 'Öğrenci' },
        { label: 'İşsiz', value: 'İşsiz' },
        { label: 'Emekli', value: 'Emekli' },
    ];
    const professionOptions = [
        { label: 'Yazılımcı', value: 'Yazılımcı' },
        { label: 'Doktor', value: 'Doktor' },
        { label: 'Mühendis', value: 'Mühendis' },
        { label: 'Öğretmen', value: 'Öğretmen' },
    ];

    const handleChange = (key: keyof typeof userWorkAndProfession, value: string) => {
        dispatch(setUserWorkingStatusAndProfession({ ...userWorkAndProfession, [key]: value }));
    };

    return (
        <GenericView width={dWidth} padding={dWidth * 0.025} flex={1}>
            <GenericView center marginTop={dWidth * 0.05}>
                <GenericText bold>Çalışma Durumu ve Meslek Bilgileri</GenericText>
            </GenericView>
            <GenericView marginTop={dWidth * 0.05}>
                <CustomPicker
                    value={userWorkAndProfession.workingStatus}
                    onValueChange={(value) => handleChange('workingStatus', value)}
                    items={workStatusOptions}
                    placeholder={{ label: 'Çalışma durumu seçin...', value: '' }}
                />
            </GenericView>
            <GenericView marginTop={dWidth * 0.05}>
                <CustomPicker
                    value={userWorkAndProfession.profession}
                    onValueChange={(value) => handleChange('profession', value)}
                    items={professionOptions}
                    placeholder={{ label: 'Meslek seçin...', value: '' }}
                />
            </GenericView>
        </GenericView>
    );
};

export default WorkAndProfession;

