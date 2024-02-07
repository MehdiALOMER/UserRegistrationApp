/* import React, { useEffect } from 'react';
import Lottie from 'lottie-react-native'
import { StorageService } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getProductsThunk, setCartData, setFavoriteData } from '@/store/reducers';
import { GenericText, GenericView } from '@/assets/css';


const StarterScreen: React.FC = ({ navigation }: any) => {




    return (
        <GenericView>
            <GenericText>Starter Screen</GenericText>
        </GenericView>
    );
};

export default StarterScreen;  */


import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import CVAndProjects from '@/components/userProfileInformation/CVAndProjects';
import EducationAndSkills from '@/components/userProfileInformation/EducationAndSkills';
import WorkAndProfession from '@/components/userProfileInformation/WorkAndProfession';
import { colors, dWidth } from '@/constants';
import React, { useState, useRef, ComponentType, ReactElement } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet, ListRenderItemInfo } from 'react-native';

interface TabDataItem {
    key: string;
    title: string;
    component: ComponentType<any>;
}

const data: TabDataItem[] = [
    { key: '1', title: 'İş/Meslek', component: WorkAndProfession },
    { key: '2', title: 'Eğitim/Yetenekler', component: EducationAndSkills },
    { key: '3', title: 'CV/Projeler', component: CVAndProjects },
];

const UserProfileInformationScreen: React.FC = ({ navigation }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList<TabDataItem>>(null);

    const onSelectTab = (index: number) => {
        setActiveIndex(index);
        // FlatList'i ilgili sekmenin index'ine kaydır
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    };

    const renderTab = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity
            style={[styles.tab, activeIndex === index && styles.activeTab]}
            onPress={() => onSelectTab(index)}
        >
            <Text style={styles.tabText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderContent = ({ item }: ListRenderItemInfo<TabDataItem>): ReactElement | null => {
        const Component = item.component;
        return <Component />;
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                <GenericView flexDirection='row'>
                    <FlatList
                        data={data}
                        renderItem={renderTab}
                        keyExtractor={(item) => item.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.tabsContainer}
                    />
                    <GenericView center>
                        <GenericTouchableOpacity onPress={() => navigation.navigate('DrawerNavigator')}>
                            <GenericView backgroundColor={colors.primary} padding={15} borderRadius={5} >
                                <GenericText color={colors.white} bold>Devam</GenericText>
                            </GenericView>
                        </GenericTouchableOpacity>
                    </GenericView>
                </GenericView>

                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderContent}
                    keyExtractor={(item) => item.key}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / dWidth);
                        setActiveIndex(index);
                    }}
                />
            </View>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabsContainer: {
        flexGrow: 0, // FlatList'in yüksekliğini içeriğine göre ayarlar
    },
    tab: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
    },
    tabText: {
        color: 'black',
    },
    contentContainer: {
        width: dWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        fontSize: 20,
    },
});

export default UserProfileInformationScreen;

