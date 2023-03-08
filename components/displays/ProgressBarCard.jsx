import React from "react";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from "react-native";
import ProgressBar from "./ProgressBar";

const LeftContent = props => <Avatar.Icon {...props} color="white" icon="cards-outline" />




const ProgressBarCard = () => {
    const styles = StyleSheet.create({
        Card: {
            width: "87%",
            marginHorizontal: "6.5%",
            marginTop: 50
        },
        progBar: {
            alignSelf: "center",
        },
    })


    return (
        <Card style = {styles.Card}>
        <Card.Title title="Today" left={LeftContent} />
        <Card.Content>
                <ProgressBar style = {styles.progBar }/>
        </Card.Content>
        
        <Card.Actions>
            <TouchableOpacity>
                <Button mode = "contained">Keep going</Button>
            </TouchableOpacity>
        </Card.Actions>
        </Card>
    )
    };
export default ProgressBarCard;