import React, {useState , useEffect }from 'react';
import { Input, Button, Form } from 'antd';
import axios from 'axios'
import { Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import{serverUrl} from '../../config';
var _THIS;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const props = {
    name: "avatar",
    showUploadList: false,//设置只上传一张图片，根据实际情况修改
    customRequest: info => {//手动上传
      const formData = new FormData();
      
      formData.append('avatar', info.file);//名字和后端接口名字对应

      axios
        .post('http://tian.com:8000/api/UpPhoto',
            transformFormData({
                data: formData.get('avatar'),
            }),
            {
              headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
          ).then((response) => 
            {

          })
    },
    action:"http://localhost:3009/api/common/file_upload",
    listType: "picture-card",
    className: "avatar-uploader",
    handleChange: info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
        console.log(info);
      }
    },

    beforeUpload: file => {//控制上传图片格式
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        message.error('您只能上传JPG/PNG 文件!');
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小必须小于2MB!');
        return;
      }
      return isJpgOrPng && isLt2M;
    },
  };


  const uploadButton = (
    <div>
       <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

export default class ChangeStuInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      psw: "",
      type: "",
      loading: false
    };
  }

  componentWillMount() {
    var name = this.props.location.state.username;
    var passw = this.props.location.state.psw;
    var tp = this.props.location.state.type;
    this.setState({
      username: name,
      psw: passw,
      type: tp
    })
    _THIS=this;
  }

  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl:info.file.response.info,
            loading: false,
          }),
        );
        console.log(info);
      }
    };

    render() {
    const { loading, imageUrl } = this.state;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
       },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
    };
        return (
            <div>
                <br /><br /><br /><br /><br />
                <span style={{ color: '#000', fontSize: '1.4em'}}>个人信息修改</span>
                <br /><br />
                <Form.Item label="联系方式" {...formItemLayout}>
                    <Input id="Scommunicationway"></Input>
                </Form.Item>

                <br /><br />
                <Form.Item>
                  <Upload name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={ serverUrl + "/resources" }
                        onChange={info => this.handleChange(info)}>
                        {imageUrl ? <img src={serverUrl+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                
                <br /><br />
                <Form.Item>
                    <Button onClick={requestSend} style={{ width: 200 }} type="primary" shape="round" size='large'>
                        确定
                    </Button>
                </Form.Item>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                
            </div>
        )
    }
}


const transformFormData = (obj) => {
    let formData = new FormData()
  
    for (let k in obj) {
      formData.append(k, obj[k])
    } 
  
    return formData
  }
  
  const requestSend = () => {

    var s0 = _THIS.state.username;
    var s4 = document.getElementById("Scommunicationway");

    var v1;
    var v5;

    if (s0.value == "") {
        v1=null;
    }
    else{
        v1=s0;
    }
    if (s4.value == "") {
        v5=null;
    }
    else{
        v5=s4.value;
    }

    axios
        .post('http://tian.com:8000/api/changeStu',
            transformFormData({
                id: v1,
                commu: v5
            }),
            {
              headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
          ).then((response) => 
            {
                var code = response.data.code;
                if (code === 200) {
                  alert('修改成功！');
                }
          })
}