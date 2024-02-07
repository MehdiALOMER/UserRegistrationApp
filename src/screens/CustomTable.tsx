/* import { StatusBar } from 'expo-status-bar'; */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, PermissionsAndroid } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import AppHeader from '@/components/shared/AppHeader';
import _ from "lodash"
import { FAB } from 'react-native-paper';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';



export var dWidth = Dimensions.get('screen').width;
export var dHeight = Dimensions.get('screen').height;



export default function CustomTable({ navigation }: any) {
    const [fabOpen, setFabOpen] = useState(false)
    const [columns, setColumns] = useState([
        {
            "label": "Proje ID",
            "value": ""
        },
        {
            "label": "Proje Adı",
            "value": ""
        },
        {
            "label": "Başlangıç Tarihi",
            "value": ""
        },
        {
            "label": "Bitiş Tarihi",
            "value": ""
        },
        {
            "label": "Proje Durumu",
            "value": ""
        },
        {
            "label": "Sorumlu Kişi",
            "value": ""
        },
        {
            "label": "Bütçe",
            "value": ""
        },
        {
            "label": "KDV Toplam",
            "value": ""
        },
        {
            "label": "Toplam Maliyet",
            "value": ""
        },
        {
            "label": "Proje Net",
            "value": ""
        },
        {
            "label": "Özel Kod",
            "value": ""
        }
    ]
    )
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [data, setData] = useState([
        {
            "Proje ID": "P001",
            "Proje Adı": "Web Uygulaması Geliştirme",
            "Başlangıç Tarihi": "01.02.2021",
            "Bitiş Tarihi": "01.08.2021",
            "Proje Durumu": "Tamamlandı",
            "Sorumlu Kişi": "Ahmet Yılmaz",
            "Bütçe": "50000",
            "KDV Toplam": "9000",
            "Toplam Maliyet": "59000",
            "Proje Net": "59000",
            "Özel Kod": "WP100"
        },
        {
            "Proje ID": "P002",
            "Proje Adı": "Mobil Uygulama Geliştirme",
            "Başlangıç Tarihi": "01.03.2021",
            "Bitiş Tarihi": "01.09.2021",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Merve Aslan",
            "Bütçe": "60000",
            "KDV Toplam": "10800",
            "Toplam Maliyet": "70800",
            "Proje Net": "70800",
            "Özel Kod": "MP200"
        },
        {
            "Proje ID": "P003",
            "Proje Adı": "Bulut Tabanlı Veri Analizi",
            "Başlangıç Tarihi": "01.04.2021",
            "Bitiş Tarihi": "01.10.2021",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "70000",
            "KDV Toplam": "12600",
            "Toplam Maliyet": "82600",
            "Proje Net": "82600",
            "Özel Kod": "DA300"
        },
        {
            "Proje ID": "P004",
            "Proje Adı": "Yapay Zeka Uygulamaları",
            "Başlangıç Tarihi": "01.05.2021",
            "Bitiş Tarihi": "01.11.2021",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Selin Yılmaz",
            "Bütçe": "80000",
            "KDV Toplam": "14400",
            "Toplam Maliyet": "94400",
            "Proje Net": "94400",
            "Özel Kod": "AI400"
        },
        {
            "Proje ID": "P005",
            "Proje Adı": "Yazılım Geliştirme",
            "Başlangıç Tarihi": "01.06.2021",
            "Bitiş Tarihi": "01.12.2021",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "90000",
            "KDV Toplam": "16200",
            "Toplam Maliyet": "106200",
            "Proje Net": "106200",
            "Özel Kod": "SW500"
        },
        {
            "Proje ID": "P006",
            "Proje Adı": "Yapay Zeka Uygulamaları",
            "Başlangıç Tarihi": "01.07.2021",
            "Bitiş Tarihi": "01.01.2022",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Selin Yılmaz",
            "Bütçe": "100000",
            "KDV Toplam": "18000",
            "Toplam Maliyet": "118000",
            "Proje Net": "118000",
            "Özel Kod": "AI600"
        },
        {
            "Proje ID": "P007",
            "Proje Adı": "Yazılım Geliştirme",
            "Başlangıç Tarihi": "01.08.2021",
            "Bitiş Tarihi": "01.02.2022",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "110000",
            "KDV Toplam": "19800",
            "Toplam Maliyet": "129800",
            "Proje Net": "129800",
            "Özel Kod": "SW700"
        },
        {
            "Proje ID": "P008",
            "Proje Adı": "Yapay Zeka Uygulamaları",
            "Başlangıç Tarihi": "01.09.2021",
            "Bitiş Tarihi": "01.03.2022",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Selin Yılmaz",
            "Bütçe": "120000",
            "KDV Toplam": "21600",
            "Toplam Maliyet": "141600",
            "Proje Net": "141600",
            "Özel Kod": "AI800"
        },
        {
            "Proje ID": "P009",
            "Proje Adı": "Yazılım Geliştirme",
            "Başlangıç Tarihi": "01.10.2021",
            "Bitiş Tarihi": "01.04.2022",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "130000",
            "KDV Toplam": "23400",
            "Toplam Maliyet": "153400",
            "Proje Net": "153400",
            "Özel Kod": "SW900"
        },
        {
            "Proje ID": "P010",
            "Proje Adı": "Yapay Zeka Uygulamaları",
            "Başlangıç Tarihi": "01.11.2021",
            "Bitiş Tarihi": "01.05.2022",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Selin Yılmaz",
            "Bütçe": "140000",
            "KDV Toplam": "25200",
            "Toplam Maliyet": "165200",
            "Proje Net": "165200",
            "Özel Kod": "AI1000"
        },
        {
            "Proje ID": "P011",
            "Proje Adı": "Yazılım Geliştirme",
            "Başlangıç Tarihi": "01.12.2021",
            "Bitiş Tarihi": "01.06.2022",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "150000",
            "KDV Toplam": "27000",
            "Toplam Maliyet": "177000",
            "Proje Net": "177000",
            "Özel Kod": "SW1100"
        },
        {
            "Proje ID": "P012",
            "Proje Adı": "Yapay Zeka Uygulamaları",
            "Başlangıç Tarihi": "01.01.2022",
            "Bitiş Tarihi": "01.07.2022",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Selin Yılmaz",
            "Bütçe": "160000",
            "KDV Toplam": "28800",
            "Toplam Maliyet": "188800",
            "Proje Net": "188800",
            "Özel Kod": "AI1200"
        },
        {
            "Proje ID": "P013",
            "Proje Adı": "Yazılım Geliştirme",
            "Başlangıç Tarihi": "01.02.2022",
            "Bitiş Tarihi": "01.08.2022",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "170000",
            "KDV Toplam": "30600",
            "Toplam Maliyet": "200600",
            "Proje Net": "200600",
            "Özel Kod": "SW1300"
        },
        {
            "Proje ID": "P014",
            "Proje Adı": "Yapay Zeka Uygulamaları",
            "Başlangıç Tarihi": "01.03.2022",
            "Bitiş Tarihi": "01.09.2022",
            "Proje Durumu": "Devam Ediyor",
            "Sorumlu Kişi": "Selin Yılmaz",
            "Bütçe": "180000",
            "KDV Toplam": "32400",
            "Toplam Maliyet": "212400",
            "Proje Net": "212400",
            "Özel Kod": "AI1400"
        },
        {
            "Proje ID": "P015",
            "Proje Adı": "Yazılım Geliştirme",
            "Başlangıç Tarihi": "01.04.2022",
            "Bitiş Tarihi": "01.10.2022",
            "Proje Durumu": "Planlama Aşamasında",
            "Sorumlu Kişi": "Kemal Sunal",
            "Bütçe": "190000",
            "KDV Toplam": "34200",
            "Toplam Maliyet": "224200",
            "Proje Net": "224200",
            "Özel Kod": "SW1500"
        }
    ]
    )
    const [usedData, setUsedData] = useState(data)  // data to be displayed


    const sortTable = (column: any) => {
        const newDirection: any = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(usedData, [column], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setUsedData(sortedData)
    }
    useEffect(() => {
        setUsedData(data);
    }, [])
    /* const handleClick = async () => {

        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {
                // Ask for permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel();
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }

    }; */
    const exportDataToExcel = () => {
        // Created Sample data
        let sample_data_to_export = usedData;

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)
        XLSX.utils.book_append_sheet(wb, ws, "Report")
        const file = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        // File path
        var path = RNFS.DownloadDirectoryPath + '/test1.csv';    // ios için RNFS.DocumentDirectoryPath + '/test.csv' kullanılabilir 
        // Write the file
        RNFS.writeFile(path, file, 'ascii')
            .then((success: any) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err: any) => {
                console.log(err.message);
            });
    }
    const tableHeader = () => (
        <View style={styles.tableHeader}>
            <View style={[{ flexDirection: "row", marginTop: dWidth * .025, marginBottom: dWidth * .025 }]}>
                {
                    columns.map((column, index) => {
                        {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.columnHeader}
                                    onPress={() => sortTable(column.label)}>
                                    <Text style={styles.columnHeaderTxt}>{column.label + " "}
                                        {selectedColumn === column.label && <MaterialCommunityIcons
                                            name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                                        />
                                        }
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </View>
        </View>
    )

    const openDrawer = () => {
        navigation.openDrawer();
    }
    const goDashboard = () => {
        navigation.navigate('DashboardScreen');
    }
    return (
        <SafeAreaWrapper>
            <AppHeader title="Custom Table" menu right="space-dashboard" onPressMenu={openDrawer} onRightPress={goDashboard} />
            <View>
                <View>
                    {/* {filterComponent()} */}
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={usedData}
                        /* style={{ width: "90%" }} */
                        keyExtractor={(item, index) => index + ""}
                        ListHeaderComponent={tableHeader}
                        stickyHeaderIndices={[0]}
                        renderItem={({ item, index }: any) => {
                            return (
                                <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#f7e5c5" : "white" }}>
                                    {
                                        columns.map((column, index) => {
                                            return (
                                                <Text style={{ ...styles.columnRowTxt }} key={index}>{item[column.label]}</Text>
                                            )
                                        })
                                    }
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </View>
            <FAB.Group
                open={fabOpen}
                visible
                icon={fabOpen ? 'close-thick' : 'dots-horizontal'}
                fabStyle={{ backgroundColor: "#5e5aa4" }}
                color={"#e7aa40"}
                style={[{}]}
                actions={[
                    /* {
                        icon: 'file-pdf-box',
                        color: "#fff",
                        style: { backgroundColor: "#d41a1a" },
                        label: 'PDF Kaydet',
                        labelStyle: { backgroundColor: "#d41a1a" },
                        labelTextColor: "#fff",
                        onPress: () => console.log('Pressed email'),
                    }, */
                    {
                        icon: 'file-excel',
                        color: "#fff",
                        style: { backgroundColor: "#1d6f41" },
                        label: 'Excel Kaydet',
                        labelStyle: { backgroundColor: "#1d6f41" },
                        labelTextColor: "#fff",
                        onPress: () => { /* handleClick()  */ },
                    },
                    {
                        icon: 'card-search',
                        color: "#fff",
                        style: { backgroundColor: "#459df5" },
                        label: 'Ara',
                        labelStyle: { backgroundColor: "#459df5" },
                        labelTextColor: "#fff",
                        onPress: () => { /* handleClick() */ },
                    },
                    /* {
                        icon: 'filter',
                        color: "#fff",
                        style: { backgroundColor: "#d40000" },
                        label: 'Filitre',
                        labelStyle: { backgroundColor: "#d40000" },
                        labelTextColor: "#fff",
                        onPress: () => { SheetManager.show("ActionSheetRef") },
                    }, */
                ]}
                onStateChange={({ open }) => setFabOpen(open)}
                onPress={() => {
                    if (fabOpen) {
                        // do something if the speed dial is open
                    }
                }}
            />
        </SafeAreaWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tableHeader: {
        backgroundColor: "#5e5aa4"
    },
    tableRow: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
    },
    columnHeader: {
        /* width: "20%", */
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
    },
    columnRowTxt: {
        /* width: "20%", */
        width: 100,
        textAlign: "center",
        color: "#5e5aa4",
    }
});