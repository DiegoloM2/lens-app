import React from "react";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from "react-native";
import ProgressBar from "./ProgressBar";
import { useNavigation } from "@react-navigation/native";
import { useCards } from "../../contexts/CardsContext";
import { clearStorage } from "../../store/storage";

const LeftContent = props => <Avatar.Icon {...props} color="white" icon="cards-outline" />




const ProgressBarCard = () => {
    const navigator = useNavigation();
    const { cardsToStudyToday, cardsStudiedToday } = useCards();
    const studyToday = cardsToStudyToday.length;
    const styles = StyleSheet.create({
        Card: {
            width: "87%",
            marginHorizontal: "6.5%",
            marginTop: 100
        },
        progBar: {
            alignSelf: "center",
            marginTop: 10
        },
        button: {
            marginTop: 10
        },
        buttonText: {
            fontSize: 18
        },
        cardSubtitle: {
            fontSize: 11,
            color: "rgba(150,150,150,1)"
        }
    })


    return (
        <Card style = {styles.Card}>
        <Card.Title 
            title= "Today" 
            subtitle = "remaining cards = objective - studied today"
            subtitleStyle = {styles.cardSubtitle}
            left={LeftContent} 
            titleVariant = "headlineSmall"/>
        <Card.Content>
                <ProgressBar style = {styles.progBar } size = {150} done = {studyToday == 0 ? 100: 100 * (cardsStudiedToday / studyToday)}/>
        </Card.Content>
        
        <Card.Actions>
            <TouchableOpacity onPress = {() => {navigator.navigate("Study")}}>
                <Button mode = "contained" style = {styles.button} labelStyle = {styles.buttonText}>Keep going</Button>
            </TouchableOpacity>
        </Card.Actions>
        </Card>
    )
    };
export default ProgressBarCard;