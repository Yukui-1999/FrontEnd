import React, { Component } from 'react'
import { Descriptions, Button } from 'antd';
import { Image } from 'antd';
import { Link } from 'react-router-dom'


var name='dsb';

export default class ManagerInfo extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      psw: "",
      type: ""
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
  }
  render() {
    console.log(this.state.psw);
    return (
      <div>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <br /><br />
        <Link to={{pathname: '/ManagerCenter/ChangeAdmInfo',state:{username:this.state.username, psw:this.state.psw}}}>
          <Button>
            编辑信息
          </Button>
        </Link>

        <Link to={{pathname: '/ManagerCenter/AdmChangePSW',state:{username:this.state.username, psw:this.state.psw}}}>
          <Button style={{ marginLeft: 20 }}>
            修改密码
          </Button>
        </Link>
        <br /><br />
        <Descriptions title="管理员信息">
          <Descriptions.Item label="姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="工号">Txxxxxxxx</Descriptions.Item>
          <Descriptions.Item label="身份证号">123456789XXXXX</Descriptions.Item>
          <Descriptions.Item label="系/部门">计算机</Descriptions.Item>
        </Descriptions>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br />

        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br />
      </div>
    )
  }
}
