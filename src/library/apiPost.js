import axios from "axios";
import {notification} from "antd";

export const post = async(props) => {
    const {url, state, form, postSchema} = props
    const response = await axios({
        method: 'post',
        url: url,
        data: postSchema,
        headers: {'content-type': 'application/json'}
    }).then((response) => {
        notification.open({
            message: 'Notification!',
            description: '전송 완료'
        })
        form.resetFields();
        return response.data.data;
    }).catch(err =>
    {
        console.log(err.message);
    });
    return response;
}
