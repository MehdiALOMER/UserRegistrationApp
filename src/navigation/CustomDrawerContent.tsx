import { useState } from 'react';
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { menuList } from '@/data/MenuList';
import { colors, dWidth } from '@/constants';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';


export default function CustomDrawerContent(props: any) {

    const [generalMenuList, setGeneralMenuList] = useState(menuList);

    return (
        <ScrollView>
            <GenericView flex={1}>
                <GenericView flex={1}>
                    <GenericView flexDirection="row" borderBottomWidth={1} borderBottomColor={colors.secondary}>
                        <GenericView flex={1} center>
                            {/*  <GenericImage
                                width={dWidth * .25}
                                height={dWidth * .25}
                                resizeMode="contain"
                                source={require("../assets/img/generic/logo.png")}
                            /> */}
                        </GenericView>
                    </GenericView>
                    <GenericView>
                        {
                            generalMenuList.map((item: any, index: number) => {
                                return (
                                    <GenericView
                                        key={index}
                                        marginTop={dWidth * .05} >
                                        <GenericTouchableOpacity
                                            onPress={() => {
                                                generalMenuList[index].isOpen = !generalMenuList[index].isOpen;
                                                setGeneralMenuList([...generalMenuList]);
                                            }}
                                        >
                                            <GenericView flexDirection="row" >
                                                <GenericView flex={1} center>
                                                    <MaterialCommunityIcons name={item.icon} size={25} color={item.isOpen ? colors.secondary : colors.primary} />
                                                </GenericView>
                                                <GenericView flex={4} justifyContent="center">
                                                    <GenericText fontSize={15} bold>{item.name}</GenericText>
                                                </GenericView>
                                                <GenericView flex={1} justifyContent="center">
                                                    <MaterialCommunityIcons name={item.isOpen ? "chevron-down" : "chevron-right"} size={25} color={item.isOpen ? colors.secondary : colors.primary} />
                                                </GenericView>
                                            </GenericView>
                                        </GenericTouchableOpacity>
                                        {
                                            item.isOpen && item.submenuList?.map((submenuListItem: any, submenuIndex: number) => {
                                                return (
                                                    <GenericView key={submenuIndex} padding={dWidth * .025}>
                                                        <GenericTouchableOpacity
                                                            onPress={() => {
                                                                if (submenuListItem.submenuList) {
                                                                    generalMenuList[index].submenuList[submenuIndex].isOpen = !generalMenuList[index].submenuList[submenuIndex].isOpen;
                                                                    setGeneralMenuList([...generalMenuList]);
                                                                }
                                                                else {
                                                                    props.navigation.navigate(submenuListItem.screen, { type: submenuListItem.type });
                                                                }
                                                            }}
                                                        >
                                                            <GenericView flexDirection="row" >
                                                                <GenericView flex={1} center>
                                                                    <MaterialCommunityIcons name={submenuListItem.icon} size={25} color={submenuListItem.isOpen ? colors.secondary : colors.primary} />
                                                                </GenericView>
                                                                <GenericView flex={4} justifyContent="center">
                                                                    <GenericText fontSize={15} bold>{submenuListItem.name}</GenericText>
                                                                </GenericView>
                                                                {
                                                                    submenuListItem.submenuList ?
                                                                        <GenericView flex={1} justifyContent="center">
                                                                            <MaterialCommunityIcons name={submenuListItem.isOpen ? "chevron-down" : "chevron-right"} size={25} color={submenuListItem.isOpen ? colors.secondary : colors.primary} />
                                                                        </GenericView>
                                                                        :
                                                                        <GenericView flex={1}></GenericView>
                                                                }

                                                            </GenericView>
                                                        </GenericTouchableOpacity>

                                                        {
                                                            submenuListItem.isOpen && submenuListItem.submenuList?.map((subSubmenuListItem: any, subSubmenuIndex: number) => {
                                                                return (
                                                                    <GenericTouchableOpacity
                                                                        onPress={() => {
                                                                            /* props.navigation.navigate(subSubmenuListItem.screen, { type: subSubmenuListItem.type }); */
                                                                        }}
                                                                        key={subSubmenuIndex} padding={dWidth * .025}
                                                                    >
                                                                        <GenericView flexDirection="row" >
                                                                            <GenericView flex={1} center>
                                                                                <Entypo name={"dot-single"} size={25} color={colors.primary} />
                                                                            </GenericView>
                                                                            <GenericView flex={4} justifyContent="center">
                                                                                <GenericText fontSize={15} bold>{subSubmenuListItem.name}</GenericText>
                                                                            </GenericView>
                                                                            <GenericView flex={1}></GenericView>
                                                                        </GenericView>
                                                                    </GenericTouchableOpacity>
                                                                )
                                                            })
                                                        }
                                                    </GenericView>
                                                )
                                            })
                                        }
                                    </GenericView>
                                )
                            })
                        }
                        <GenericTouchableOpacity
                            onPress={() => {
                            }}
                            flexDirection="row" marginTop={dWidth * .05} marginBottom={dWidth * .05} >
                            <Entypo name={"log-out"} size={25} color={colors.primary} />
                            <GenericView marginLeft={dWidth * .05} justifyContent="center">
                                <GenericText fontSize={15} bold>Çıkış</GenericText>
                            </GenericView>
                        </GenericTouchableOpacity>
                    </GenericView>
                </GenericView>
            </GenericView >
        </ScrollView>
    )
}