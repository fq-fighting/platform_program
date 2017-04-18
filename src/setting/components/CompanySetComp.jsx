import React, { Component } from 'react'
import { Spin, Button } from '../../base/components/AntdComp';
import EditCompanyCont from '../dialogconts/EditCompanyCont';


class CompanySetComp extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.getEnterpriseInfo();
    }

    render(){      
        const { state,AddPositionVisiable, ...props } = this.props;
        const info = state.enterpriseInfo;
        let industry = '',addr = info.companyAddr||"";
        if( info.companyIndustry != undefined) {
           info.companyIndustry.map((item) => {
                industry += item.industryName + " / ";         
        }) 
        }else {
            industry = '';
        }
        industry = industry.substr(0, industry.length-2 ) ;

        return (
                <div className='companyset-content'>
                    <Spin  spinning={state.loading}>
                        <div>
                            <h3 className="companyset-title"><span className="title-line"></span>公司资料</h3>
                        </div>
                        <div>
                            <h3 className="companyset-name">{info.companyName} {'（'+(info.companyCode||'')+' )'}</h3>
                        </div>
                        <div>
                            <p className="companyset-info">
                                {''+window.ENUM.getEnum("nature",info.companyType)} | { ''+window.ENUM.getEnum("scale",info.companyScale) } | {industry}
                            </p>
                        </div>
                            <div className="companyset-first">
                            <p className="companyset-abbreviation"><span className="company-tit">公司简称:</span><span className="company-text">{info.companyAbbr}</span></p>
                            <p className="companyset-abbreviation representative"><span className="company-tit">法人代表:</span><span className="company-text">{info.corporation}</span></p>
                            <p className="companyset-abbreviation phone"><span className="company-tit">公司电话:</span><span className="company-text">{info.telephoneNumber}</span></p>
                            </div>
                            <div className="companyset-second">
                            <p className="companyset-email"><span className="company-tit">邮编:</span><span className="company-text">{info.zipCode}</span></p>
                            <p className="companyset-email address"><span className="company-tit">注册地址:</span><span className="company-text">{(addr.detailAddr||'')}</span></p>
                            </div>
                            <p className="companyset-introduce"><span className="company-tit">公司简介:</span><span className="company-text">{info.companyDesc}</span></p>
                            <div className="companyset-third">
                            <p className="companyset-contact"><span className="company-tit">业务联系人:</span><span className="company-text">{info.contacts}</span></p>
                            <p className="companyset-contact tell"><span className="company-tit">业务联系人手机:</span><span className="company-text">{info.contactsPhone}</span></p>
                            </div>
                            <p className="companyset-logo"><span className="company-tit">公司logo:
                                </span><img src={info.companyLogo} alt="" title={info.companyName}/>
                            </p>
                            <Button className="companyset-setbtn" type="primary" onClick={()=>AddPositionVisiable(info.companyCode)}>设置</Button>
                        	<EditCompanyCont {...this.props} />
                    </Spin>
                </div>            
            )

    }
}

export default CompanySetComp



