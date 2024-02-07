import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { colors, dWidth } from '@/constants';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Table, Row } from 'react-native-table-component';
import translateImage from '@/assets/images/translate.png';
import technicalSupportImage from '@/assets/images/technical-support.png';
import guideBookImage from '@/assets/images/guide-book.png';
import optionsImage from '@/assets/images/options.png';


// Kullanıcı bilgileri ve tablo verileri için örnek veriler
const userInfo = {
    image: "https://media.licdn.com/dms/image/D5603AQGLJ9BKrT8Skw/profile-displayphoto-shrink_800_800/0/1690621530176?e=2147483647&v=beta&t=1g3fIPLmA3G6X61fyT6f0sM6xoZ3vlR7pdYOf9fB6I4",
    fullName: "Muhammed Mehdi ELÖMER",
    country: "Turkey",
    city: "Istanbul",
    uniqueId: "123456789",
    phone: "555-1234",
    birthDate: "1990-01-01",
    gender: "Erkek",
    employmentStatus: "Employed",
    profession: "Software Developer",
    educationLevel: "University",
    schoolInfo: "MIT, Computer Science, 2012",
};

const skillsData = {
    tableHead: ['Yetkinlik', 'Derece'],
    tableData: [
        ['React Native', 'İleri'],
        ['JavaScript', 'İleri'],
    ],
};

const projectsData = {
    tableHead: ['Proje', 'Açıklama'],
    tableData: [
        ['Proje 1', 'Bu bir proje açıklamasıdır.'],
        ['Proje 2', 'Bu başka bir proje açıklamasıdır.'],
    ],
};

const DashboardScreen: React.FC = ({ navigation }: any) => {
    const [collapsedSections, setCollapsedSections] = useState({
        personalInfo: false,
        employmentInfo: false,
        educationSkills: false,
        cvProjects: false,
    });

    // Açılır sekmenin durumunu değiştir
    const toggleSection = (section: keyof typeof collapsedSections) => {
        setCollapsedSections(prevState => ({ ...prevState, [section]: !prevState[section] }));
    };

    // Açılır sekme için bir bölüm oluştur
    const renderCollapsibleSection = (title: string, content: JSX.Element, sectionKey: keyof typeof collapsedSections) => (
        <GenericView>
            <GenericTouchableOpacity onPress={() => toggleSection(sectionKey)}>
                <Text style={styles.sectionHeader}>{title}</Text>
            </GenericTouchableOpacity>
            <Collapsible collapsed={!collapsedSections[sectionKey]}>
                {content}
            </Collapsible>
        </GenericView>
    );

    const onPressBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaWrapper>
            <AppHeader title="Dashboard" back onPressBack={onPressBack} />
            <ScrollView style={styles.container}>
                <GenericView padding={dWidth * .02} >
                    <GenericView center>
                        <GenericImage source={{ uri: userInfo.image }}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                    </GenericView>
                    <GenericView center marginTop={dWidth * .025}>
                        <GenericText fontSize={16} bold>{userInfo.fullName}</GenericText>
                    </GenericView>
                    {/* <GenericView flexDirection='row'>
                        <GenericView>
                            <GenericText>Ülke: {userInfo.country}</GenericText>
                            <GenericText>Kimlik No: {userInfo.uniqueId}</GenericText>
                            <GenericText>Doğum Tarihi: {userInfo.birthDate}</GenericText>
                        </GenericView>
                        <GenericView>
                            <GenericText>İl: {userInfo.city}</GenericText>
                            <GenericText>Telefon: {userInfo.phone}</GenericText>
                            <GenericText>Cinsiyet: {userInfo.gender}</GenericText>
                        </GenericView>
                    </GenericView> */}
                    <GenericView flexDirection='row' justifyContent='space-between' marginTop={dWidth * .025}>
                        <GenericText>Ülke: {userInfo.country}</GenericText>
                        <GenericText>İl: {userInfo.city}</GenericText>
                    </GenericView>
                    <GenericView flexDirection='row' justifyContent='space-between' marginTop={dWidth * .025}>
                        <GenericText>Kimlik No: {userInfo.uniqueId}</GenericText>
                        <GenericText>Telefon: {userInfo.phone}</GenericText>
                    </GenericView>
                    <GenericView flexDirection='row' justifyContent='space-between' marginTop={dWidth * .025}>
                        <GenericText>Doğum Tarihi: {userInfo.birthDate}</GenericText>
                        <GenericText>Cinsiyet: {userInfo.gender}</GenericText>
                    </GenericView>
                </GenericView>

                {renderCollapsibleSection('Çalışma Durumu ve Meslek Bilgileri', (
                    <View style={styles.sectionContent}>
                        <Text>Çalışma Durumu: {userInfo.employmentStatus}</Text>
                        <Text>Meslek: {userInfo.profession}</Text>
                    </View>
                ), 'employmentInfo')}

                {renderCollapsibleSection('Eğitim Seviyesi ve Yetkinlik Bilgileri', (
                    <View style={styles.sectionContent}>
                        <Text>Eğitim Seviyesi: {userInfo.educationLevel}</Text>
                        <Text>Okul Bilgileri: {userInfo.schoolInfo}</Text>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={skillsData.tableHead} style={styles.head} textStyle={styles.text} />
                            {skillsData.tableData.map((rowData, index) => (
                                <Row key={index} data={rowData} textStyle={styles.text} />
                            ))}
                        </Table>
                    </View>
                ), 'educationSkills')}

                {renderCollapsibleSection('CV ve Proje Alanı', (
                    <View style={styles.sectionContent}>
                        {/* CV ve Projeler için tablo veya içerik */}
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={projectsData.tableHead} style={styles.head} textStyle={styles.text} />
                            {projectsData.tableData.map((rowData, index) => (
                                <Row key={index} data={rowData} textStyle={styles.text} />
                            ))}
                        </Table>
                    </View>
                ), 'cvProjects')}

                <GenericView flexDirection="row" marginTop={dWidth * .025}>
                    <GenericTouchableOpacity
                        onPress={() => {
                        }}
                        flex={1} backgroundColor="rgba(28, 116, 232, 0.2)" marginRight={dWidth * .025} height={dWidth * .45} borderRadius={5}
                    >
                        <GenericView flex={1} flexDirection="column">
                            <GenericView flex={4} center>
                                <GenericImage
                                    source={translateImage}
                                    height={dWidth * .15}
                                    width={dWidth * .15}
                                    resizeMode="contain"
                                />
                            </GenericView>
                            <GenericView flex={2} center>
                                <GenericText fontSize={15} bold textAlign="center" color="#1c74e8 ">Dil Seçimi</GenericText>
                            </GenericView>
                        </GenericView>
                    </GenericTouchableOpacity>
                    <GenericTouchableOpacity
                        onPress={() => {
                        }}
                        flex={1} backgroundColor="rgba(39, 241, 157, 0.2)" height={dWidth * .45} borderRadius={5}
                    >
                        <GenericView flex={1} flexDirection="column">
                            <GenericView flex={4} center>
                                <GenericImage
                                    source={technicalSupportImage}
                                    height={dWidth * .15}
                                    width={dWidth * .15}
                                    resizeMode="contain"
                                />
                            </GenericView>
                            <GenericView flex={2} center>
                                <GenericText fontSize={15} bold textAlign="center" color="#27f19d">Destek Ekranı</GenericText>
                            </GenericView>
                        </GenericView>
                    </GenericTouchableOpacity>
                </GenericView>
                <GenericView flexDirection="row" marginTop={dWidth * .025}>
                    <GenericTouchableOpacity
                        onPress={() => {
                        }}
                        flex={1} backgroundColor="rgba(190, 83, 255, 0.2)" marginRight={dWidth * .025} height={dWidth * .45} borderRadius={5}
                    >
                        <GenericView flex={1} flexDirection="column">
                            <GenericView flex={4} center>
                                <GenericImage
                                    source={guideBookImage}
                                    height={dWidth * .15}
                                    width={dWidth * .15}
                                    resizeMode="contain"
                                />
                            </GenericView>
                            <GenericView flex={2} center>
                                <GenericText fontSize={15} bold textAlign="center" color="#be53ff">Kullanıcı Klavuzu</GenericText>
                            </GenericView>
                        </GenericView>
                    </GenericTouchableOpacity>
                    <GenericTouchableOpacity
                        onPress={() => {
                        }}
                        flex={1} backgroundColor="rgba(231, 170, 64, 0.2)" height={dWidth * .45} borderRadius={5}
                    >
                        <GenericView flex={1} flexDirection="column">
                            <GenericView flex={4} center>
                                <GenericImage
                                    source={optionsImage}
                                    height={dWidth * .15}
                                    width={dWidth * .15}
                                    resizeMode="contain"
                                />
                            </GenericView>
                            <GenericView flex={2} center>
                                <GenericText fontSize={15} bold textAlign="center" color="#e7aa40">Seçenekler</GenericText>
                            </GenericView>
                        </GenericView>
                    </GenericTouchableOpacity>
                </GenericView>
            </ScrollView>
        </SafeAreaWrapper >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: dWidth * .025, backgroundColor: '#fff' },
    sectionHeader: {
        padding: 10, fontWeight: 'bold', fontSize: 16,
        backgroundColor: "rgba(28, 116, 232, 0.2)"
    },
    sectionContent: { padding: 10 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default DashboardScreen;
