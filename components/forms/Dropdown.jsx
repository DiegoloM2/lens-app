import React from "react";
import RNPickerSelect from "react-native-picker-select";

export default Dropdown = ({items, handleChange}) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => handleChange(value)}
            items={items}
        />
    );
};