import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';


const DrawerScreen: React.FC = ({ navigation }: any) => {

    return (
        <SafeAreaWrapper>
            <AppHeader title="DrawerScreen" />
            <GenericView flex={1}>
                <GenericText>DrawerScreen</GenericText>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default DrawerScreen; 