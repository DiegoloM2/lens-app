import React, { useState } from "react";
import View from "react-native";
import { Card, Text } from "react-native-paper";

const TestQuestion = "What is Einsten's energy-mass equation?"
const TestAnswer = "e = m x (c^2)"


const StudyText = ({ children }) => {
    return <Text variant = "bodyLarge">{ children }</Text>
}

const Study = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    return <View>
            <Card>
                <Card.Content>
                    <StudyText>{ TestQuestion }</StudyText>
                </Card.Content>
            </Card>

    </View>
}

export default Study;