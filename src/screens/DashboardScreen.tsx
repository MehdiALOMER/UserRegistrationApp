import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { dWidth } from '@/constants';



const DashboardScreen: React.FC = ({ navigation }: any) => {

    const onPressBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaWrapper>
            <AppHeader back onPressBack={onPressBack} title="Dashboard" />
            <GenericView padding={dWidth * .0125} flex={1}>
                <GenericText>DashboardScreen</GenericText>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default DashboardScreen; 