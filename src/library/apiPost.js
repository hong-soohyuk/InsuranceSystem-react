import axios from "axios";
import {notification} from "antd";

export const post = async (props) => {
    const {url, payload, form} = props
    return await axios( url,{
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: payload,
    }).then((response) => {
        notification.open({message: 'Notification!', description: '전송 완료'});
        form.resetFields();
        return response.data.data;
    }).catch(err =>
    {console.log(err.message);});
}
