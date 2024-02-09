import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../shared/CustomInput';
import { RootState } from "@/store"
import { setUserCVAndProjects, addProject, removeProject } from '@/store/reducers';
import { colors, dWidth } from '@/constants';
import { Project } from '@/types/userTypes';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FileViewer from 'react-native-file-viewer';

const CVAndProjects: React.FC = () => {
    const dispatch = useDispatch();
    const userCVAndProjects = useSelector((state: RootState) => state.userInfoReducer.userCVAndProjects);

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            console.log(
                res[0].uri,
                res[0].type, // mime type
                res[0].name,
                res[0].size
            );

            // CV'nin URI'sini Redux store'a kaydet
            handleChange('cv', res[0].uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Kullanıcı seçim işlemini iptal etti.');
            } else {
                throw err;
            }
        }
    };



    const handleChange = <T extends keyof typeof userCVAndProjects>(key: T, value: typeof userCVAndProjects[T]) => {
        dispatch(setUserCVAndProjects({ ...userCVAndProjects, [key]: value }));
    };

    const handleProjectChange = (index: number, key: keyof Project, value: string) => {
        const updatedProjects = [...userCVAndProjects.projects];
        updatedProjects[index] = { ...updatedProjects[index], [key]: value };
        handleChange('projects', updatedProjects);
    };

    const handleAddProject = () => {
        dispatch(addProject({ id: Date.now(), title: "", description: "" })); // `id` için `Date.now()` kullanarak basit bir benzersiz değer ürettik
    };

    const handleRemoveProject = (index: number) => {
        dispatch(removeProject(userCVAndProjects.projects[index].id));
    };
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
        <ScrollView style={styles.container}>
            <GenericView center marginTop={dWidth * 0.05} marginBottom={dWidth * 0.05}>
                <GenericText bold fontSize={16}>CV ve Projeler</GenericText>
            </GenericView>
            <GenericView flexDirection='row'>
                <GenericTouchableOpacity
                    onPress={pickDocument}
                    center
                >
                    <GenericText bold color="#1c74e8" >CV Yükle: </GenericText>
                </GenericTouchableOpacity>
                <TouchableOpacity onPress={() => {
                    openCV(userCVAndProjects.cv)
                }}>
                    <GenericText color="#1c74e8" textDecorationLine="underline">
                        {userCVAndProjects.cv ? userCVAndProjects.cv.split('/').pop() : 'CV yüklenmedi'}
                    </GenericText>
                </TouchableOpacity>
            </GenericView>

            <GenericView alignItems='flex-end' padding={dWidth * .025} borderBottomWidth={1} borderBottomColor='#cccccc'>
                <GenericTouchableOpacity
                    onPress={handleAddProject}
                    center
                    padding={dWidth * .025}
                    backgroundColor={colors.primary}
                    borderRadius={10}
                >
                    <GenericText fontSize={15} color={colors.white} bold>Proje Ekle</GenericText>
                </GenericTouchableOpacity>
            </GenericView>

            {userCVAndProjects.projects.map((project, index) => (
                <GenericView key={project.id} padding={dWidth * .025} borderBottomWidth={1} borderBottomColor="#cccccc">
                    <CustomInput
                        label="Proje Başlığı"
                        value={project.title}
                        onChangeText={(text) => handleProjectChange(index, 'title', text)}
                    />
                    <CustomInput
                        label="Porje Açıklaması"
                        value={project.description}
                        onChangeText={(text) => handleProjectChange(index, 'description', text)}
                    />
                    <GenericView center marginTop={dWidth * .025}>
                        <GenericTouchableOpacity
                            onPress={() => handleRemoveProject(index)}
                            backgroundColor={'red'}
                            center
                            padding={dWidth * .025}
                            borderRadius={10}
                        >
                            <GenericText color={colors.white} bold>Projeyi Sil</GenericText>
                        </GenericTouchableOpacity>
                    </GenericView>
                </GenericView>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: dWidth,
        padding: dWidth * 0.025,
    },
});

export default CVAndProjects;
