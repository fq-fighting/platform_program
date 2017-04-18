import React, { Component } from 'react'
import { Row, Col,Button,Popconfirm,Icon} from '../../base/components/AntdComp';

export default class ExampleCont extends Component {

 constructor(props, context) {
        super(props, context);
    }

    onDelete = (companyCode,status) => {
        const { onClear, CompanyDel,Record } = this.props;
        CompanyDel(companyCode,status).then(json=>{
            if(json.status===2000){
                onClear();
            }
                 
        })
       
    }

    render() {
        let {record}=this.props;
        let industry =[],industryList;
        if( record.companyIndustry != undefined) {
            record.companyIndustry.map((keys) => {
                industry.push(keys.industryName);
                industryList=industry.join('/')

            })
        }
        let detailAddr=''
        if(record.companyAddr!=undefined){
           detailAddr=record.companyAddr.detailAddr
        }

        return (
                    <div className="sidebar-con">
                        <div className="side-box">
                            <Row className="side-title">
                                <Col span={6}><b>公司信息</b></Col>
                                <Col span={9}></Col>
                                <Col span={9} className="side-button">
                                    {record.status=="1"?
                                    <Button type="primary" onClick={()=>this.props.EditCompanyVisiable(record.companyCode)}>编辑</Button>
                                     :null}
                                        <Popconfirm placement="bottomRight" title={
                                                <div>
                                                    <h5>确认要{record.status == "1"?'停用':'启用'}该公司吗？</h5>
                                                    <p>{record.status == "1"?'停用后，该公司所有人员将不能再登入该公司空间':null}</p>
                                                </div>
                                            }
                                            onConfirm={() => this.onDelete(record.companyCode,record.status=="1"?"2":"1")} okText="是" cancelText="否">

                                            <Button type="primary">{record.status == "1"?'停用':'启用'}</Button>

                                        </Popconfirm>

                                    <div className="x-icon" onClick={()=>this.props.SidebarVisiable(false)}><a href="#"><Icon type="close" /></a></div>
                                </Col>
                            </Row>
                        </div>
                        <Row className="company-margin">
                            <Col span={24}></Col>
                        </Row>
                        <Row className="company-logo">
                            <Col span={24}>
                                <div><img src={record.companyLogo} /></div>
                            </Col>
                        </Row>

                        <Row className="company-list">

                            <Col span={24}>
                                <ul>
                                    <li>
                                        <div>{record.companyName}({record.companyUscc})</div>
                                        <ol>
                                            <li>{''+window.ENUM.getEnum("nature",record.companyType)}</li>
                                            <li>&nbsp;|&nbsp;</li>
                                            <li>{''+window.ENUM.getEnum("scale",record.companyScale)}</li>
                                            <li>&nbsp;|&nbsp;</li>
                                            <li>{industryList}</li>
                                        </ol>
                                    </li>
                                    <li>
                                        <span>公司简称:</span>
                                        <b>{record.companyAbbr}</b>
                                    </li>
                                    <li>
                                        <span>法人代表:</span>
                                        <b>{record.corporation}</b>
                                    </li>
                                    <li>
                                        <span>公司电话:</span>
                                        <b>{record.telephoneNumber}</b>
                                    </li>
                                    <li>
                                        <span>注册地址:</span>
                                        <b>{detailAddr}</b>
                                    </li>
                                    <li>
                                        <span>邮编:</span>
                                        <b>{record.zipCode}</b>
                                    </li>
                                    <li>
                                        <span>公司简介:</span>
                                        <b>{record.companyDesc}</b>
                                    </li>
                                    <li>
                                        <span>业务联系人:</span>
                                        <b>{record.contacts}</b>
                                    </li>
                                    <li>
                                        <span>业务联系人手机:</span>
                                        <b>{record.contactsPhone}</b>
                                    </li>
                                    <li>
                                        <span>公司admin账号:</span>
                                        <b>{record.accountNumber}</b>
                                    </li>
                                    <li>
                                        <span>密码:</span>
                                        <b><Button type="primary" onClick={()=>this.props.ResetPassword(record.companyCode)}>重置密码</Button> 提示：点击后，将重置密码，并将初始密码发送至业务联系人手机</b>
                                    </li>
                                </ul>
                            </Col>
                        </Row>

                    </div>
        )
    }
}