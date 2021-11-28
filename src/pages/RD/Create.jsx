import React, {useEffect, useState} from "react";
import {Form, Input, Button, Select, InputNumber, Row, Col, notification} from 'antd';
import axios from "axios";
import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";

async function postInsurance(data, form) {
    const url = '/insurance';
    const response = await axios({
        method: 'post',
        url: url,
        data: {...data,
            conditions: {
                startAge: data.startAge,
                endAge: data.endAge,
                rating: data.rating
            },

        },
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description: '보험정보 전송 완료'
        })
        form.resetFields();
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
    });
    return response;
}

const Create = () => {
    const title = "상품개발"
    const subtitle = "HM 손해보험의 보험상품을 개발하기 위한 페이지입니다."
    const [form] = Form.useForm();

    // const userId = useSelector(state => (state.user.data.id))

    const [state, setState] = useState({
        name: '',
        description: '',
        startAge: '',
        endAge: '',
        rating: '',
        category: '',
    })

    const handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if(Array.isArray(value)){
            setState({
                ...state,
                [name] : [...value]
            });
            console.log('array val', value)
        } else{
            setState({...state, [name]: value});
            console.log('single val', value)
        }
    }

    useEffect(() => {
        console.log('useEffect ',state);
    }, [state])
    // useState sync 맞추기 위해 이펙트 써야함?

    const handleSubmit = async () => {
        // test(state, form);
        const data = await postInsurance(state, form);
        console.log(data);
    }

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Form form={form} labelCol={{span: 10}} wrapperCol={{span: 14}} layout="vertical" size={"large"} onFinish={handleSubmit}
                  initialValues={{basePrice: 100000, createEmployeeId: '1'}}
            >
                <Form.Item rules={[{required: true, message: '보험의 이름을 입력해주세요!'}]} name="name" label="보험상품 이름" >
                    <Input name="name" value={state.name} onChange={handleChange} placeholder="예시) XX 자동차 보험"/>
                </Form.Item>

                <Form.Item rules={[{required: true, message: '상품의 종류를 선택해주세요!'}]} name='category' label="상품 항목">
                    <Select value={state.category} onChange={(val)=>{handleChange({target: {name: 'category', value: val}})}}>
                        <Select.Option value="자동차">자동차 보험</Select.Option>
                        <Select.Option value="운전자">운전자 보험</Select.Option>
                        <Select.Option value="화재">화재 보험</Select.Option>
                        <Select.Option value="여행">여행자 보험</Select.Option>
                    </Select>
                </Form.Item>
                <Row>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} label="가입 연령대">
                            <InputNumber style={{ display: 'inline-block', width: '45%', marginInlineEnd:'4px'}} placeholder="가입 최저 연령"
                                         min={0} max={100.00} name="startAge" value={state.startAge}
                                         onChange={(val)=>{handleChange({target: {name: 'startAge', value: val}})}}/>

                            <InputNumber style={{ display: 'inline-block', width: '45%'}} placeholder="가입 최고 연령"
                                         min={0} max={100.00} name="endAge" value={state.endAge}
                                         onChange={(val)=>{handleChange({target: {name: 'endAge', value: val}})}}/>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item wrapperCol={12} name={"rating"} label="최소 신용등급">
                            <InputNumber style={{ display: 'inline-block', width: '100%'}}
                                   min={1} max={10} step="1" name="rating" placeholder="1~10등급" value={state.rating}
                                   onChange={(val)=>{handleChange({target: {name: 'rating', value: val}})}}/>
                        </Form.Item>
                    </Col>
                </Row>

                {/*<Form.Item label="보험 상품의 보장내용" name={'coverage'} rules={[{required:true, message: '하나 이상의 보장내용을 선택해주세요', type:'array'}]}>*/}
                {/*    <Select mode="multiple" value={state.coverage} onChange={(val)=>{handleChange({target: {name: 'coverage', value: val}})}}*/}
                {/*            placeholder="보험 상품의 사고 보장내용을 선택해주세요">*/}
                {/*        <Select.Option value="대인배상">대인배상</Select.Option>*/}
                {/*        <Select.Option value="대물배상">대물배상</Select.Option>*/}
                {/*        <Select.Option value="자기신체사고">자기신체사고</Select.Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label="보험 가입시 요구 제출 서류" name={'registerDocument'} rules={[{required: true, message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]}>*/}
                {/*    <Select mode="multiple" value={state.registerDocument} onChange={(val)=>{handleChange({target: {name: 'registerDocument', value: val}})}}*/}
                {/*            placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">*/}
                {/*        <Select.Option value="운전면허">운전면허</Select.Option>*/}
                {/*        <Select.Option value="운전자 사고 이력">운전자 사고 이력</Select.Option>/!*option??*!/*/}
                {/*        <Select.Option value="자동차 등록증">자동차 등록증</Select.Option>*/}
                {/*        <Select.Option value="건물 등록 문서">건물 등록 문서</Select.Option>*/}
                {/*        <Select.Option value="여권사본">여권사본</Select.Option>*/}
                {/*        <Select.Option value="항공 탑승권 등 여행 증명서류">항공 탑승권 등 여행 증명서류</Select.Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item rules={[{required: true, message: '하나 이상의 제출 서류를 선택해주세요', type:'array' }]} name={'accidentDocument'} label="사고 보상청구시 요구 제출 서류">*/}
                {/*    <Select mode="multiple" value={state.accidentDocument} onChange={(val)=>{handleChange({target: {name: 'accidentDocument', value: val}})}}*/}
                {/*            placeholder="보험 가입시 필요한 제출 서류를 선택해주세요">*/}
                {/*        <Select.Option value="사고 처리 협력업체 영수증">사고 처리 협력업체 영수증</Select.Option>*/}
                {/*        <Select.Option value="자동차 정비 영수증">자동차 정비 영수증</Select.Option>*/}
                {/*        <Select.Option value="병원 진단서">병원 진단서</Select.Option>*/}
                {/*        <Select.Option value="사고 경위서">사고 경위서</Select.Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item rules={[{required:true, message: '보험의 기초 보험료를 입력해주세요'}]} name="basePrice" label="기초 보험료(KRW)">*/}
                {/*    <InputNumber style={{width : '50%'}}*/}
                {/*                 min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} step={1000}*/}
                {/*                 parser={value => value.replace(/\$\s?|(,*)/g, '')}*/}
                {/*                 onChange={(val)=>{if(val > 0){handleChange({target: {name: 'basePrice', value: val}})}}}/>*/}
                {/*</Form.Item>*/}

                <Form.Item rules={[{required:true, message: '보험의 개괄적인 설명을 입력해주세요'}]} name={"description"} label="보험상품 개요">
                    <Input.TextArea name="description" value={state.description} onChange={handleChange}/>
                </Form.Item>
                {/*<Form.Item required={true} name="createEmployeeId" label="보험을 생성하는 직원 ID" >*/}
                {/*    <Input readOnly={true} name="createEmployeeId" value={state.createEmployeeId} disabled={true}*/}
                {/*           onInput={(val)=>{handleChange({target: {name: 'createEmployeeId', value: val}})}}/>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item rules={[{required: true, message: '담당 직원을 입력해주세요!'}]} name="managementEmployeeId" label="보험 담당책임 직원 ID" >*/}
                {/*    <Input name="managementEmployeeId" value={state.managementEmployeeId} onChange={handleChange}/>*/}
                {/*</Form.Item>*/}
                <Form.Item><Button style={{marginBottom : '10px'}} type="primary" htmlType="submit" value="Submit">Submit</Button></Form.Item>
            </Form>
        </Wrapper>
    );
}
export default Create;
