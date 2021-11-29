import {Wrapper} from "../../components/Wrapper";
import {Button, Col, Form, Input, InputNumber, notification, Row, Radio, Select} from "antd";
import React, {useState} from "react";
import axios from "axios";
import {post} from "../../library/apiPost";

const AddClient = () => {
    const title = "고객가입"
    const subtitle = "HM 손해보험의 고객을 등록하기 위한 페이지입니다."
    const [form] = Form.useForm();
    const url = '/client';

    const [state, setState] = useState({
        name: '',
        gender: '',
        rrnFront: '',
        rrnBack: '',
        age: '',
        address: '',
        email: '',
        phoneNumber: '',
        bank: '',
        buildingNumber:'',
        carNumber: '',
        driverLicenseNumber: '',
        passportNumber: '',
    })

    const additionalInfo = [
        {label: '자동차 등록번호', name: 'carNumber', value: state.carNumber},
        {label: '자동차 운전면허번호', name: 'driverLicenseNumber', value: state.driverLicenseNumber},
        {label: '건물번호', name: 'buildingNumber', value: state.buildingNumber},
        {label: '여권번호', name: 'passportNumber', value: state.passportNumber}
    ]

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setState({...state, [name]: value});
        console.log(state)
    }
    const handleSubmit = async () => {
        const data = await post(url, state, form);
    }
    const selectBank = (
        <Form.Item name={"bank"} noStyle initialValue={"국민"}>
            <Select value={state.bank} style={{width: 100}}
                    onChange={(val)=>{handleChange({target: {name: 'bank', value: val}})}}>
                <Select.Option value="국민">국민은행</Select.Option>
                <Select.Option value="하나">하나은행</Select.Option>
                <Select.Option value="우리">우리은행</Select.Option>
            {/*    constants */}
            </Select>
        </Form.Item>
    );
    return(
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form form={form} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}>
                <Form.Item rules={[{required: true, message: '고객의 성명을 입력해주세요!'}]} name="name" label="가입고객 성명" >
                    <Input name="name" value={state.name} onChange={handleChange} placeholder="고객의 성명을 입력하세요"/>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '고객의 성별을 선택해주세요!'}]} name="gender" label="성별(Gender)">
                    <Radio.Group value={state.gender} onChange={handleChange}>
                        <Radio checked={true} name={'MALE'} value="Male">Male</Radio>
                        <Radio name={'FEMALE'} value="Female">Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Row>
                    <Col span={7}>
                        <Form.Item rules={[{ required: true}]} wrapperCol={12} name={"rrnFront"} label="주민등록번호 앞자리">
                            <Input style={{ display: 'inline-block', width: '95%', marginInlineEnd:'10px'}} placeholder="ex)901101"
                                         name="rrnFront" value={state.rrnFront} onChange={handleChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item rules={[{ required: true}]} wrapperCol={12} name={"rrnBack"} label="주민등록번호 뒷자리">
                            <Input style={{ display: 'inline-block', width: '100%'}} placeholder="ex)1XXXXXX"
                                         name="rrnBack" value={state.rrnBack} onChange={handleChange}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item requiredMark={"optional"} rules={[{required: false,}]} name="address" label="주소" >
                    <Input name="address" value={state.address} onChange={handleChange} placeholder="고객의 주소를 입력하세요"/>
                </Form.Item>

                <Form.Item requiredMark={"optional"} rules={[{required: false, type: 'email'}]} name="email" label="Email" >
                    <Input name="email" value={state.email} onChange={handleChange} placeholder="고객의 email 주소를 입력하세요"/>
                </Form.Item>

                <Form.Item requiredMark={"optional"} rules={[{required: false, }]} name="phoneNumber" label="전화번호" >
                    <Input name="phoneNumber" value={state.phoneNumber} onChange={handleChange} placeholder="고객의 연락처를 입력하세요"/>
                </Form.Item>

                <Form.Item requiredMark={"optional"} rules={[{required: false, }]} label="거래 은행">
                    <Input addonBefore={selectBank} placeholder={`'-'를 포함한 계좌번호를 입력해주세요`}/>
                </Form.Item>
                {additionalInfo?.map((data) =>
                    <Form.Item key={data.name} requiredMark={"optional"} rules={[{required: false, }]} name={data.name} label={data.label} >
                        <Input name={data.name} value={data.value} onChange={handleChange}/>
                    </Form.Item>
                )}
                <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    )
}
export default AddClient;
