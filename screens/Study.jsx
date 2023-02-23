import React, { useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const TestQuestion = "What is Einsten's energy-mass equation?"
const TestAnswer = "e = m x (c^2)"


const StudyText = ({ children }) => {
    return <Text variant = "bodyLarge">{ children }</Text>
const styles = StyleSheet.create({
    CardContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
    },
    StudyCard: {
        marginHorizontal: 13,
        textAlign: "center",
    }, 
    StudyText: {
        textAlign: "center"
    }, 
    Button: {
        marginTop: 15
    },


})
}

const Study = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    return (<View>
            <Card>
    const [answerShowed, setAnswerShowed] = useState(false);
                <Card.Content>
                    <StudyText>{ TestQuestion }</StudyText>
                </Card.Content>
            </Card>
        </View>)
}

export default Study;