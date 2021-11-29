import React from 'react';
import {Select} from "antd";
import PropTypes from "prop-types";

export const SelectOptions = (props) => {
    const {selectValue: value, onChangeMethod: onChange, optionList} = props;
    return (
        <Select value={value} onChange={onChange}>
            {optionList?.map(option => {
                return(
                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                )
            })}
        </Select>

    )
}

SelectOptions.propTypes = {
    selectValue: PropTypes.any,
    onChangeMethod: () => {},
    // optionList : PropTypes.arrayOf(PropTypes.string)
}
