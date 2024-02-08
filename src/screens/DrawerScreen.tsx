import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';


const DrawerScreen: React.FC = ({ navigation }: any) => {

    const onPressBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaWrapper>
            <AppHeader title="DrawerScreen" onPressBack={onPressBack} back />
            <GenericView flex={1}>
                <GenericText>DrawerScreen</GenericText>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default DrawerScreen; 