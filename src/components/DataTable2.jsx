import React from 'react';
import {useState} from "react";
import {Space, Table, } from "antd";
import InfoModal from "./InfoModal";
export const DataTable2 = ({onRow, columns, dataSource, loading}) => {
    return (
        <div style={{marginTop: '1rem'}}>
            <Table onRow={onRow} rowKey={(record) => record.id } loading={loading} columns={columns} dataSource={dataSource} pagination={{position: ["bottomCenter"]}} bordered />
        </div>
    );
}