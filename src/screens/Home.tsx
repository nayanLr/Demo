import React, { useState } from 'react';
import {View,Text, StyleSheet, FlatList, TouchableOpacity,Image} from 'react-native';
import { COLORS, FONT, images } from '../constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = () => {
    const [isOpenSheet,setIsOpenSheet] = useState(false);
    const [agentList,setAgentList] = useState([]);

    const renderAgent = (records:any) => {
        return(
            <View style={styles.agentContainer}>
                <View style={styles.innerTopContainer}>
                    <View style={styles.icons}>
                        <Image source={{uri:'https://cdn-icons-png.freepik.com/256/1077/1077114.png'}}
                        style={styles.imageStyles}/>
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.title}>{records?.item?.address}</Text>
                    </View>
                    <View style={styles.actionButton}>
                        <TouchableOpacity onPress={() => setIsOpenSheet(true)}>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.secendContainer}>
                    <Text style={styles.name}>{records?.item?.name}</Text>
                    <Text style={styles.name}>{records?.item?.number}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.deleteContainer}>
                    <TouchableOpacity style={styles.delete} onPress={() => console.log("Delete User")}>
                        <Text style={styles.deleteText}>Delete Agent</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    const emptyComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <Image source={images.empty} style={styles.imageEmpty}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Text style={styles.headingText}>Managed by Agent</Text>
            </View>
            <FlatList
             data={agentList}
             keyExtractor={(item:any) => item?.id}
             renderItem={renderAgent}
             ListEmptyComponent={emptyComponent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightWhite,
    },
    headContainer:{
        padding:wp(6)
    },
    headingText:{
        fontFamily:FONT.quickSandBold,
        fontSize: wp(6),
        color:COLORS.solidBlack
    },
    agentContainer:{
        borderColor:'#000',
        marginHorizontal:wp(4),
        borderRadius:wp(3),
        padding:wp(2),
        backgroundColor:COLORS.white
    },
    innerTopContainer:{
        flexDirection:'row',
    },
    icons:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    address:{
        flex:4
    },
    actionButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    editButton:{
        fontFamily:FONT.quickSandMedium,
        color:COLORS.blue,
        textDecorationLine:'underline',
        borderColor:COLORS.lightDark
    },
    title:{
        color:COLORS.solidBlack,
        fontSize:wp(4),
        fontFamily:FONT.quickSandBold
    },
    imageStyles:{
        height:wp(6),
        width:wp(6),
        tintColor:COLORS.blue
    },
    secendContainer:{
        marginTop:wp(2),
        marginHorizontal:wp(10),
    },
    name:{
        fontFamily:FONT.quickSandMedium,
        color:COLORS.solidBlack
    },
    divider:{
        borderBottomWidth:1,
        marginTop:wp(5),
        marginHorizontal:hp(4),
        borderColor:COLORS.gray,
    },
    deleteContainer:{
        marginTop:wp(2)
    },
    delete:{
        justifyContent:'center',
        alignItems:'center'
    },
    deleteText:{
        color:COLORS.danger,
        textDecorationLine:'underline',
        fontFamily:FONT.quickSandMedium
    },
    emptyContainer:{
        borderWidth:1,
        flex:1,
    },
    imageEmpty:{
        height:,
        width:wp(10)
    }
})

export default Home;