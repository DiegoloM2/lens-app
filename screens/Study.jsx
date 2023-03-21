import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Card, Text, Avatar, Headline } from "react-native-paper";
import NavBar from "../components/layout/NavBar";
import {Slider} from '@miblanchard/react-native-slider';
import { useCards } from "../contexts/CardsContext";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
    createCardButton: {
        width: "100%",
        marginTop: 5,
    },
    noCardNav: {
        borderWidth: 1,
        alignSelf: "flex-start",
        width: "100%",
    },
    noCardContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    noCardText: {
        textAlign: "center",
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

const colors = [
    "#49DB42", //100%
    "#64D044",
    "#7FC546",
    "#9BBB48",
    "#D1A54C", 
    "#EC9A4E", //50%
    "#EF8142",
    "#F4502A",
    "#F7371D", 
    "#FC0505", //0% 

]
const trackMarkComponent = (value)=>{
    return (
        <Text style={{color:colors[value], marginBottom:"7.5%"}}>  {value+1+"\n"}</Text>
    )
}


const DifficultyPrompt = ({ setShowAnswer, setAnswerShowed, card}) => {
    const { cardsStudiedToday, setStudiedToday, cardsToStudyToday, setToStudyToday } = useCards();
    const styles = StyleSheet.create({
        Container: {
            height: 70,
            marginTop: 15,

            // justifyContent: "center",
        },
        Container2: {
            flex: 1,
            flexDirection: "row",
            width: "65%",
            alignItems: "center",
            paddingTop:"10%"
        },
        Text: {
            fontSize: 30,
        }, 
    })
    const [color, setColor] = useState(5);

    const sendValue = (difficulty) => {

        alert(`Your difficulty was: ${difficulty}`);
        
        setStudiedToday(cardsStudiedToday + 1);
        setToStudyToday(cardsToStudyToday.filter((compCard) => card != compCard));
        nextQuestion(setShowAnswer, setAnswerShowed);
    }
    return (
    <View style = {styles.Container}>
        <Text variant = "bodyLarge" style = {{textAlign:"center", fontWeight: "bold"}}>Difficulty of recall</Text>
        <View style = {styles.Container2 }>
        <Slider
                value={color}
                containerStyle={{width:"100%"}}
                minimumTrackTintColor={colors[color-1]}
                step={1}
                trackMarks={[1,2,3,4,5,6,7,8,9,10]}
                minimumValue={1}
                renderTrackMarkComponent={(value)=>(trackMarkComponent(value))}
                maximumValue={10}
                thumbTintColor={"#0000ff"}
                onValueChange={(value)=>{setColor(value)}}
                onSlidingComplete={(value)=>{sendValue(value)}}
        />
        </View>
    </View>
    )
}

const Study = () => {
    // const { }
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerShowed, setAnswerShowed] = useState(false);
    const { cardsToStudyToday } = useCards();
    const navigator = useNavigation();

    if (cardsToStudyToday.length > 0) {
        const card = cardsToStudyToday[0];

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
                                <StudyText>{ showAnswer ? card.answer : card.question }</StudyText>
                            </View>
                        </Card.Content>
                    </Card>
                    {answerShowed && <DifficultyPrompt setShowAnswer = {setShowAnswer} setAnswerShowed = {setAnswerShowed} card = { card } />}
    
                    {!answerShowed && <Button mode = "contained" style = {styles.Button} 
                        onPress = {() => {setAnswerShowed(true); setShowAnswer(true)}}
                    >Show Answer</Button>}
    
    
            </View>
        </ScrollView>)
    } else {
        return <View style = {[styles.Main,]}>
            <NavBar style = {styles.noCardNav }/>
            <View style = {[{height: "100%", bottom: 50}, styles.noCardContainer]}>
            <Headline style = {styles.noCardText}>You have no cards left to study today!</Headline>
            <TouchableRipple>
                <Button mode = "contained" style = {styles.createCardButton} onPress = {() => {navigator.navigate("CreateCard")}}>Create a card</Button>
            </TouchableRipple>
            </View>
        </View>
    }

}

export default Study;