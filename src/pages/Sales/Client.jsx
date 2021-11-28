
import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import "../../css/Detail.css";
import {Button, Dropdown, DatePicker, Radio, Menu, Space, Tag, Input, Select, Divider, Descriptions} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import styled from "styled-components";
import Modal from "antd/es/modal/Modal";
const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpan = styled.span`
    font-size: 14px;
`

const FilterDiv = styled.div`
    display: flex;
    align-content: space-around;
    justify-content: space-between;
    flex-direction: column;
`

const FlexDiv = styled.div`
    display: flex;
    align-content: space-around;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

async function getClients() {
    const response = await axios.get(
        '/client'
    );
    return response.data.data;
}
// todo: 유저 스키마 확인하기. 수정하기
const Client = ({match, history}) => {
    const title = "고객관리";
    const subtitle = "잠재 고객 및 계약 고객을 분석하여 추가 영업기회 확보";
    // load data and setting
    const [searchData, setSearchData] = useState([]);
    const [state, refetch] = useAsync(getClients, setSearchData, [getClients]);
    const { loading, data, error } = state;

    const [option, setOption] = useState("고객명"); // search
    const [dateRange, setDateRange] = useState({
        minDate: '',
        maxDate: ''
    }); // date range

    const [gender, setGender] = useState('전체'); // gender pick
    const [visible, setVisible] = useState(false);
    const [target, setTarget] = useState([]);

    // table utils
    const onRow = (record, rowIndex) => {
        return {
            onClick: () => {
                setVisible(true);
                setTarget(record);
                console.log(record);
                console.log(rowIndex);
            },
        };
    };
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: '3%',
            render: text => <a>{text}</a>,
        },
        {
            title: '고객명',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '성별',
            dataIndex: 'gender',
            width: '10%',
            key: 'gender',
            render: (gender) => {
                if (gender === 'MALE')
                    return '남';
                else
                    return '여';
            }
        },
        {
            title: '직업',
            dataIndex: 'job',
            width: '20%',
            key: 'job',
        },
        {
            title: '전화번호',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
            width: '20%',
        },
        {
            title: '가입상태',
            key: 'id',
            width: '15%',
            dataIndex: 'contractList',
            filters: [
                {
                    text: '가입고객',
                    value: 1
                },
                {
                    text: '미가입고객',
                    value: 0
                }],
            onFilter: (value, record) => {
                console.log(record.contractList.length);
                if (value == 0) {
                    if (record.contractList.length == 0)
                        return true;
                    else if (record.contractList.length > 0)
                        return false;
                } else if (value == 1) {
                    if (record.contractList.length == 0)
                        return false;
                    else if (record.contractList.length > 0)
                        return true;
                }
            },
            render: (contractList, data) => {
                let status;
                let color;
                if (contractList.length === 0) {
                    status = "미가입고객";
                    color = "volcano";
                } else if (contractList.length > 0) {
                    status = "가입고객";
                    color = "geekblue";
                }
                return (
                    <Tag color={color} key={data.id}>
                        {status}
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <a style={{color:'purple'}}>Modify</a>
                </Space>
            ),
        },
    ];

    // search utils
    function handleMenuClick(e) {
        if (e.key === '1')
        {
            console.log('click', e.key);
            setOption("고객명");
        }
        else if (e.key === '2')
        {
            console.log('click', e.key);
            setOption("전화번호");
        }
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                고객명
            </Menu.Item>
            <Menu.Item key="2">
                전화번호
            </Menu.Item>
        </Menu>
    );
    const onSearch = value => {
        if (value === "")
        {
            setSearchData(data);
        }
        else if (option === "전화번호")
        {
            console.log("number");
            console.log(value);
            let res = [];
            data.forEach(function (d){
                if (d.phoneNumber.includes(value))
                    res.push(d);
            })
            setSearchData(res);
        }
        else if (option === "고객명")
        {
            console.log("name");
            console.log(value);
            let res = [];
            data.forEach(function (d){
                if (d.name.includes(value))
                    res.push(d);
            })
            setSearchData(res);
        }
    };

    // date range
    const dateChange = val => {
        if (val !== null) {
            setDateRange({
                minDate: val[0]._d,
                maxDate: val[1]._d,
            })
        }
        console.log(dateRange);
        console.log(val);
        console.log(val[0]);
        console.log(val[0]._d);
    }
    // exception
    if (error) {
        return (
            <div>
                에러가 발생하였습니다.
            </div>
        );
    }
    const genderChange = (event) => {
        if (gender === '남' && event.target.value == '남')
        {
            setGender('');
            console.log('남!');
        }
        else if (gender === '' && event.target.value == '')
        {
            setGender('');
            console.log('!');
        }
        else
            setGender(event.target.value);
    }

    return (
        <Wrapper title={title} underline={true} subtitle={subtitle} >
            <FilterDiv>
            <FlexDiv>
                <Space>
                    <Dropdown overlay={menu}>
                        <Button style={{ width: 95 }}>
                            {option} <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
                </Space>
                <Divider type="vertical" />
                <Space><StyledSpan>계약 만기일</StyledSpan><RangePicker onChange={dateChange}/></Space>
                <Divider type="vertical" />
                <Space>
                    <StyledSpan>연령대</StyledSpan>
                    <div className="site-input-group-wrapper">
                        <Input.Group compact>
                            <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </div>
                </Space>
                <Divider type="vertical" />
                <Radio.Group value={gender} onChange={genderChange}>
                    <Radio.Button value='남'>남</Radio.Button>
                    <Radio.Button value='여'>여</Radio.Button>
                    <Radio.Button value='전체'>전체</Radio.Button>
                </Radio.Group>
            </FlexDiv>
            </FilterDiv>
            <DataTable2 dataSource={searchData} columns={columns} loading={loading} onRow={onRow}/>
            <Modal
                title="Client Info"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <Descriptions title="Client Info" bordered>
                    <Descriptions.Item label="이름">{target.name}</Descriptions.Item>
                    <Descriptions.Item label="나이">{target.age}</Descriptions.Item>
                    <Descriptions.Item label="성">{target.gender}</Descriptions.Item>
                    <Descriptions.Item label="주소">{target.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="은행">{target.bank}</Descriptions.Item>
                    <Descriptions.Item label="계좌번호">{target.accountNumber}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        {target.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="직업">{target.job}</Descriptions.Item>
                    <Descriptions.Item label="주민번호" span={2}>1234567 - *******</Descriptions.Item>
                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1<br />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </Wrapper>
    )
}

export default Client;
