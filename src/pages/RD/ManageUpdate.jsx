import {Button, Col, Form, Input, InputNumber, Row, Select} from "antd";
import React from "react";

const ManageUpdate = (props) => {
    const {form, newData, handleChange, handleSubmit} = props;
    return(
        <Form form={form} initialValues={newData} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}>
            <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                <Input name="name" value={newData.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
            </Form.Item>

            <Form.Item rules={[{required: true, message: '상품의 종류를 선택해주세요!'}]} name='category' label="상품 항목">
                <Select value={newData.category} onChange={(val)=>{handleChange({target: {name: 'category', value: val}})}}>
                    <Select.Option value="자동차">자동차 보험</Select.Option>
                    <Select.Option value="운전자">운전자 보험</Select.Option>
                    <Select.Option value="화재">화재 보험</Select.Option>
                    <Select.Option value="여행자">여행자 보험</Select.Option>
                </Select>
            </Form.Item>
            <Row>
                <Col span={7}>
                    <Form.Item wrapperCol={12} label="가입 연령대">
                        <InputNumber style={{ display: 'inline-block', width: '45%', marginInlineEnd:'4px'}} placeholder="가입 최저 연령"
                                     min={0} max={100.00} name="startAge" defalutValue={newData.conditions?.startAge} value={newData.conditions?.startAge}
                                     onChange={(val)=>{handleChange({target: {name: 'conditions', value: {startAge: val}}})}}/>

                        <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                     min={0} max={100.00} name="endAge" defalutValue={newData.conditions?.endAge} value={newData.conditions?.endAge}
                                     onChange={(val)=>{handleChange({target: {name: 'conditions', value: {endAge: val}}})}}/>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item wrapperCol={12} name={"rating"} label="최소 신용등급">
                        <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                     min={1} max={10} step="1" name="rating" placeholder={newData.conditions?.rating} value={newData.conditions?.rating}
                                     onChange={(val)=>{handleChange({target: {name: 'conditions', value: {rating: val}}})}}/>
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item rules={[{required:true, message: '보험의 개괄적인 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                <Input.TextArea name="description" value={newData.description} onChange={handleChange}/>
            </Form.Item>

            <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
        </Form>
    )
}
export default ManageUpdate;
