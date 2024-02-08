import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { colors, dWidth } from '@/constants';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Table, Row } from 'react-native-table-component';
import translateImage from '@/assets/images/translate.png';
import technicalSupportImage from '@/assets/images/technical-support.png';
import guideBookImage from '@/assets/images/guide-book.png';
import optionsImage from '@/assets/images/options.png';
import { StorageService } from '@/utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserGeneralInfo, setUserWorkingStatusAndProfession, setUserEducationAndSkills, setUserCVAndProjects } from '@/store/reducers';
import { RootState } from "@/store"
import { UserState } from '@/types/userTypes';
import moment from 'moment';
import Icon from '@/components/shared/Icons';
import FileViewer from 'react-native-file-viewer';


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
        employmentInfo: false,
        educationSkills: false,
        cvProjects: false,
    });
    // her bir sekmeye uygun ikonlar
    const sectionIcons = {
        employmentInfo: 'briefcase',
        educationSkills: 'book-education',
        cvProjects: 'file',
    };

    // Açılır sekmenin durumunu değiştir
    const toggleSection = (section: keyof typeof collapsedSections) => {
        setCollapsedSections(prevState => ({ ...prevState, [section]: !prevState[section] }));
    };

    // Açılır sekme için bir bölüm oluştur
    const renderCollapsibleSection = (title: string, content: JSX.Element, sectionKey: keyof typeof collapsedSections) => (
        <GenericView marginTop={dWidth * .025}>
            <GenericTouchableOpacity onPress={() => toggleSection(sectionKey)} flexDirection='row' backgroundColor="rgba(28, 116, 232, 0.2)" borderLeftWidth={5} borderLeftColor={collapsedSections[sectionKey] ? colors.secondary : colors.primary} style={{ position: "relative" }}>
                <Icon name={sectionIcons[sectionKey]} size={30} color={collapsedSections[sectionKey] ? colors.secondary : colors.primary} style={{ left: 5, top: 5 }} />
                <GenericText bold padding={dWidth * .035} fontSize={15}>{title}</GenericText>
                <Icon name={collapsedSections[sectionKey] ? "chevron-down" : "chevron-up"} size={30} color={collapsedSections[sectionKey] ? colors.secondary : colors.primary} style={{ position: "absolute", right: 5, top: 5 }} />
            </GenericTouchableOpacity>
            <Collapsible collapsed={!collapsedSections[sectionKey]}>
                {content}
            </Collapsible>
        </GenericView>
    );

    const cardList = [
        {
            id: 1,
            title: 'Dil Seçimi',
            image: translateImage,
            textColor: "#1c74e8",
            backgroundColor: "rgba(28, 116, 232, 0.2)",
            onPress: () => { }
        },
        {
            id: 2,
            title: 'Destek Ekranı',
            image: technicalSupportImage,
            textColor: "#27f19d",
            backgroundColor: "rgba(39, 241, 157, 0.2)",
            onPress: () => { }
        },
        {
            id: 3,
            title: 'Kullanıcı Klavuzu',
            image: guideBookImage,
            textColor: "#be53ff",
            backgroundColor: "rgba(190, 83, 255, 0.2)",
            onPress: () => { }
        },
        {
            id: 4,
            title: 'Seçenekler',
            image: optionsImage,
            textColor: "#e7aa40",
            backgroundColor: "rgba(231, 170, 64, 0.2)",
            onPress: () => { }
        },
    ];
    useEffect(() => {
        loadData();
    }, []);

    const onPressBack = () => {
        navigation.goBack();
    }

    const dispatch = useDispatch();
    const userInfo: UserState = useSelector((state: RootState) => state.userInfoReducer);

    // Yetkinlikler ve projeler için dinamik veri oluşturma
    const skillsTableData = userInfo.userEducationAndSkills.competencies.map((comp) => [comp.skill, comp.level]);
    const projectsTableData = userInfo.userCVAndProjects.projects.map((proj) => [proj.title, proj.description]);

    const loadData = async () => {
        const data = await StorageService.getItem('userInfo');
        const parsedData: UserState = data ? JSON.parse(data) : {};
        console.log('parsedData', JSON.stringify(parsedData, null, 4));
        dispatch(setUserGeneralInfo(parsedData.userGeneralInfo));
        dispatch(setUserWorkingStatusAndProfession(parsedData.userWorkingStatusAndProfession));
        dispatch(setUserEducationAndSkills(parsedData.userEducationAndSkills));
        dispatch(setUserCVAndProjects(parsedData.userCVAndProjects));
    }

    // CV'yi açma fonksiyonu
    const openCV = async (cvPath: string | null) => {
        try {
            // Dosyanın yolunu kontrol edin
            if (!cvPath) {
                alert('CV dosyası bulunamadı.');
                return;
            }

            // Dosyayı aç
            await FileViewer.open(cvPath, { showOpenWithDialog: true });
        } catch (error) {
            console.error(error);
            alert('CV açılırken bir hata oluştu.');
        }
    };
    return (
        <SafeAreaWrapper>
            <AppHeader title="Dashboard" back onPressBack={onPressBack} />
            <ScrollView style={styles.container}>
                <GenericView flexDirection='row' marginBottom={dWidth * .025}>
                    <GenericView flex={1}>
                        <GenericView center>
                            <GenericImage
                                source={userInfo.userGeneralInfo.selectedImage ? { uri: userInfo.userGeneralInfo.selectedImage } : undefined}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                        </GenericView>
                        <GenericView paddingRight={dWidth * .025} paddingLeft={dWidth * .025}>
                            <GenericView marginTop={dWidth * .025}>
                                <GenericTouchableOpacity padding={dWidth * .025} borderWidth={1} borderColor={colors.primary} borderRadius={5} flexDirection='row'>
                                    <Icon name="settings" size={20} color={colors.secondary} type='Ionicons' />
                                    <GenericText marginLeft={dWidth * .01} fontSize={15} bold color={colors.primary}>Ayarlar</GenericText>
                                </GenericTouchableOpacity>
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <GenericTouchableOpacity padding={dWidth * .025} borderRadius={5} flexDirection='row' backgroundColor={colors.primary}>
                                    <Icon name="summarize" size={20} color={colors.secondary} type='MaterialIcons' />
                                    <GenericText marginLeft={dWidth * .01} fontSize={15} bold color={colors.white}>Özet</GenericText>
                                </GenericTouchableOpacity>
                            </GenericView>
                        </GenericView>
                    </GenericView>
                    <GenericView flex={2}>
                        <GenericView flexDirection='row'>
                            <GenericView center marginRight={dWidth * .02}>
                                <Icon name="person" size={20} color={colors.primary} type='Ionicons' />
                            </GenericView>
                            <GenericView center>
                                <GenericText fontSize={15} bold>{userInfo.userGeneralInfo.fullName}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView flexDirection='row' marginTop={dWidth * .025}>
                            <GenericView center marginRight={dWidth * .02}>
                                <Icon name="earth" size={20} color={colors.primary} />
                            </GenericView>
                            <GenericView center>
                                <GenericText>{userInfo.userGeneralInfo.country}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView flexDirection='row' marginTop={dWidth * .025}>
                            <GenericView center marginRight={dWidth * .02}>
                                <Icon name="city" size={20} color={colors.primary} />
                            </GenericView>
                            <GenericView center>
                                <GenericText>{userInfo.userGeneralInfo.city}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView flexDirection='row' marginTop={dWidth * .025}>
                            <GenericView center marginRight={dWidth * .02}>
                                <Icon name="account-key" size={20} color={colors.primary} />
                            </GenericView>
                            <GenericView center>
                                <GenericText>{userInfo.userGeneralInfo.identityNumber}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView flexDirection='row' marginTop={dWidth * .025}>
                            <GenericView center marginRight={dWidth * .02}>
                                <Icon name="phone" size={20} color={colors.primary} />
                            </GenericView>
                            <GenericView center>
                                <GenericText>{userInfo.userGeneralInfo.phoneNumber}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView flexDirection='row' marginTop={dWidth * .025}>
                            <GenericView center marginRight={dWidth * .02}>
                                <Icon name="date" size={20} color={colors.primary} type='Fontisto' />
                            </GenericView>
                            <GenericView center>
                                <GenericText>{moment(userInfo.userGeneralInfo.birthDate).format('DD/MM/YYYY')}</GenericText>
                            </GenericView>
                        </GenericView>
                        <GenericView flexDirection='row' marginTop={dWidth * .025}>
                            <GenericView center marginRight={dWidth * .03}>
                                <Icon name="genderless" size={20} color={colors.primary} type='FontAwesome6' />
                            </GenericView>
                            <GenericView center>
                                <GenericText>{userInfo.userGeneralInfo.gender}</GenericText>
                            </GenericView>
                        </GenericView>
                    </GenericView>
                </GenericView>

                {renderCollapsibleSection('Çalışma Durumu ve Meslek Bilgileri', (
                    <GenericView padding={dWidth * .025}>
                        <GenericView>
                            <GenericText>Çalışma Durumu: {userInfo.userWorkingStatusAndProfession.workingStatus}</GenericText>
                        </GenericView>
                        <GenericView marginTop={dWidth * .025}>
                            <GenericText>Meslek: {userInfo.userWorkingStatusAndProfession.profession}</GenericText>
                        </GenericView>

                    </GenericView>
                ), 'employmentInfo')}

                {renderCollapsibleSection('Eğitim Seviyesi ve Yetkinlik Bilgileri', (
                    <GenericView padding={dWidth * .025}>
                        <GenericView>
                            <GenericText>Eğitim Seviyesi: {userInfo.userEducationAndSkills.educationLevel}</GenericText>
                        </GenericView>
                        <GenericView marginTop={dWidth * .025}>
                            <GenericText>Okul Adı: {userInfo.userEducationAndSkills.schoolName}</GenericText>
                        </GenericView>
                        <GenericView marginTop={dWidth * .025}>
                            <GenericText>Bölüm: {userInfo.userEducationAndSkills.department}</GenericText>
                        </GenericView>
                        <GenericView marginTop={dWidth * .025} marginBottom={dWidth * .025}>
                            <GenericText>Mezuniyet Yılı: {userInfo.userEducationAndSkills.graduationYear}</GenericText>
                        </GenericView>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={skillsData.tableHead} style={styles.head} textStyle={styles.text} />
                            {skillsTableData.map((rowData, index) => (
                                <Row key={index} data={rowData} textStyle={styles.text} />
                            ))}
                            {/* {skillsData.tableData.map((rowData, index) => (
                                <Row key={index} data={rowData} textStyle={styles.text} />
                            ))} */}
                        </Table>
                    </GenericView>
                ), 'educationSkills')}

                {renderCollapsibleSection('CV ve Proje Alanı', (
                    <GenericView padding={dWidth * .025}>
                        <GenericView flexDirection="row" alignItems="center" marginBottom={dWidth * .025}>
                            <Icon name="file-pdf" size={30} color="#D32F2F" type='FontAwesome5' />
                            <GenericText marginLeft={dWidth * .01}>CV: </GenericText>
                            <TouchableOpacity onPress={() => {
                                openCV(userInfo.userCVAndProjects.cv)
                            }}>
                                <GenericText color="#1c74e8" textDecorationLine="underline">
                                    {userInfo.userCVAndProjects.cv ? userInfo.userCVAndProjects.cv.split('/').pop() : 'CV yüklenmedi'}
                                </GenericText>
                            </TouchableOpacity>
                        </GenericView>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={projectsData.tableHead} style={styles.head} textStyle={styles.text} />
                            {projectsTableData.map((rowData, index) => (
                                <Row key={index} data={rowData} textStyle={styles.text} />
                            ))}
                            {/* {projectsData.tableData.map((rowData, index) => (
                                <Row key={index} data={rowData} textStyle={styles.text} />
                            ))} */}
                        </Table>
                    </GenericView>
                ), 'cvProjects')}

                <GenericView marginTop={dWidth * .05}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {cardList.map((item, index) => (
                            <GenericTouchableOpacity
                                key={index}
                                onPress={() => {
                                }}
                                flex={1}
                                backgroundColor={item.backgroundColor}
                                marginRight={dWidth * .05}
                                height={dWidth * .4}
                                width={dWidth * .4}
                                borderRadius={20}
                            >
                                <GenericView flex={1} flexDirection="column">
                                    <GenericView flex={4} center>
                                        <GenericImage
                                            source={item.image}
                                            height={dWidth * .15}
                                            width={dWidth * .15}
                                            resizeMode="contain"
                                        />
                                    </GenericView>
                                    <GenericView flex={2} center>
                                        <GenericText fontSize={15} bold textAlign="center" color={item.textColor}>{item.title}</GenericText>
                                    </GenericView>
                                </GenericView>
                            </GenericTouchableOpacity>
                        ))}
                    </ScrollView>
                </GenericView>
            </ScrollView>
        </SafeAreaWrapper >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: dWidth * .025, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
});

export default DashboardScreen;
