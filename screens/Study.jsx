import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Card, Text, Avatar } from "react-native-paper";
import NavBar from "../components/layout/NavBar";

const TestQuestion = "What is Einsten's energy-mass equation?"
const TestAnswer = "e = m x (c^2)"


const StudyText = ({ children }) => {
    return <Text variant = "bodyLarge" style = {styles.StudyText}>{ children }</Text>
}

const nextQuestion = (setShowAnswer, setAnswerShowed) => {
    /**
     * En produccion cogeremos la siguiente carta a estudiar
     */
    setShowAnswer(false);
    setAnswerShowed(false);
}

const styles = StyleSheet.create({
    CardContainer: {
        flex: 6,
        flexDirection: "column",
        height: "100%",
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
    Main: {
        height: "100%"
    }


})




const DifficultyPrompt = ({ setShowAnswer, setAnswerShowed}) => {
    const styles = StyleSheet.create({
        Container: {
            height: 70,
            marginTop: 15,

            // justifyContent: "center",
        },
        Container2: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "65%",
            backgroundColor: 'rgba(230,230,230,0.3)',
            borderRadius: 59,

        },
        Text: {
            fontSize: 30,
        }, 
    })
    const sendValue = (difficulty) => {
        alert(`Your difficulty was: ${difficulty}`);
        nextQuestion(setShowAnswer, setAnswerShowed);
    }
    return (
    <View style = {styles.Container}>
        <Text variant = "bodyLarge" style = {{textAlign:"center", fontWeight: "bold"}}>Difficulty of recall</Text>
        <View style = {styles.Container2 }>
            <TouchableOpacity><Text style = {styles.Text} onPress = {() => {sendValue(1)}}>🥴</Text></TouchableOpacity>
            <TouchableOpacity><Text style = {styles.Text} onPress = {() => {sendValue(2)}}>😪</Text></TouchableOpacity>
            <TouchableOpacity><Text style = {styles.Text} onPress = {() => {sendValue(3)}}>😐</Text></TouchableOpacity>
            <TouchableOpacity><Text style = {styles.Text} onPress = {() => {sendValue(4)}}>🤗</Text></TouchableOpacity>
            <TouchableOpacity><Text style = {styles.Text} onPress = {() => {sendValue(5)}}>😛</Text></TouchableOpacity>
        </View>
    </View>
    )
}

const Study = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerShowed, setAnswerShowed] = useState(false);


    const ShowOtherSide = () => {
        const localStyles = StyleSheet.create({
            FlexContainer: {
                width: "100%",
                height: 15,
                margin: 0
            },
            TouchableContainer: {
                flex: 1,
                flexDirection: "row",
                textAlign: "right",
                justifyContent: "flex-end",
                borderColor: "red",
                bottom: 10,
                left: 10
            }
        })
        return (
            <View style = {localStyles.FlexContainer}>
            <View style = {localStyles.TouchableContainer}>
                <TouchableOpacity onPress = {() => {setShowAnswer(!showAnswer)}} style = {styles.ShowOtherSide} >
                    <Avatar.Icon size = {24} icon = {showAnswer ? "arrow-u-down-left-bold": "arrow-u-down-right-bold"} />
                </TouchableOpacity>
            </View>
            </View>
        )
    }
    
    return (
    <ScrollView contentContainerStyle = {styles.Main}>
        <NavBar />
        <View style = {styles.CardContainer}>

                <Card style = {styles.StudyCard}>
                    <Card.Content>
                        <View>
                            { answerShowed && <ShowOtherSide /> }
                            <StudyText>{ showAnswer ? TestAnswer : TestQuestion }</StudyText>
                        </View>
                    </Card.Content>
                </Card>
                {answerShowed && <DifficultyPrompt setShowAnswer = {setShowAnswer} setAnswerShowed = {setAnswerShowed} />}

                {!answerShowed && <Button mode = "contained" style = {styles.Button} 
                    onPress = {() => {setAnswerShowed(true); setShowAnswer(true)}}
                >Show Answer</Button>}


        </View>
    </ScrollView>)
}

export default Study;