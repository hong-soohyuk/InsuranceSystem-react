import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import {Button, Dropdown, Input, Menu, message, Space, Tag} from "antd";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import 'antd/dist/antd.css';
import '../../css/Detail.css'

async function getInsurances() {
    const response = await axios.get(
        'https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/newinsurance'
    );
    return response.data;
}

const Manage = ({match, history}) => {
    const title = "상품관리"
    const subtitle = "HM 보험회사의 상품들을 수정하고 삭제할 수 있는 페이지 입니다"
    const [data, setData] = useState([]);
    const [option, setOption] = useState("보험명");
    const [searchData, setSearchData] = useState([]);
    const [skip, setSkip] = useState(false);
    const settingData = (data) => {
        if (data) {
            setData(data);
            setSearchData(data);
            setSkip(true);
        } else {
            console.log("데이터 설정 실패");
        }
    }
    const [initialState, refetch] = useAsync(getInsurances, settingData, [getInsurances], skip);
    const { loading, error } = initialState;

    function handleMenuClick(e) {
        if (e.key === '1')
        {
            console.log('click', e.key);
            setOption("보험명");
        }
        else if (e.key === '2')
        {
            console.log('click', e.key);
            setOption("보험번호");
        }
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '보험명',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '보험분류',
            key: 'category',
            width: '15%',
            dataIndex: 'category',
            filters: [
                {
                    text: '자동차보험',
                    value: 'Car',
                },
                {
                    text: '운전자보험',
                    value: 'Driver',
                },
                {
                    text: '화재보험',
                    value: 'Fire',
                },
                {
                    text: '여행보험',
                    value: 'Traveller',
                }
            ],
            onFilter: (value, record) => record.category.indexOf(value) === 0,
            render: category => {
                let color;
                let value;
                if (category === "자동차") {
                    value = "자동차보험";
                    color = 'geekblue';
                } else if (category === "운전자") {
                    value = "운전자보험";
                    color = 'green';
                } else if (category === "화재") {
                    value = "화재보험";
                    color = 'volcano';
                } else {
                    value = "여행보험";
                    color = 'yellow';
                }
                return (
                    <Tag color={color} key={category}>
                        {value}
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
                    <a style={{color:'red'}}>Delete</a>
                </Space>
            ),
        },
    ];
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                보험명
            </Menu.Item>
            <Menu.Item key="2">
                보험번호
            </Menu.Item>
        </Menu>
    );

    if (error) {
        return (<div>에러가 발생하였습니다.</div>
        );
    }

    const onRow = (record, rowIndex) => {
        return {
            onClick: () => {
                history.push(`${match.url}/${record.id}`);
            },
        };
    };

    const onSearch = value => {
        if (value === "")
        {
            setSearchData(data);
        }
        else if (option === "보험번호")
        {
            console.log("number");
            console.log(value);
            setSearchData(
                data.filter(d => d.id === value)
            )
        }
        else if (option === "보험명")
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

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Space>
                <Dropdown overlay={menu}>
                    <Button style={{ width: 95 }}>
                        {option} <DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
            </Space>
            <DataTable2 onRow={onRow} loading={loading} dataSource={searchData} columns = {columns} title = {title}/>
        </Wrapper>
    )
}

export default Manage;