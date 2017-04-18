import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import {Form, Input, Button, Checkbox, Select} from '../../base/components/AntdComp';
import LinkageAct from '../actions/LinkageAct';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
class LinkageComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            countryCode: '',
            provinceCode: '',
            cityCode: '',
            countyCode: '',
            countryName: '',
            provinceName: '',
            cityName: '',
            countyName: ''
        }
    };
    handleProvinceChange = (value) => {
        this.props.ProvinceList(value.key);
        this.setState({
            countryCode:value.key,
            countryName:value.label,
            provinceCode: '',
            provinceName: '',
            cityCode: '',
            cityName: '',
            countyCode: '',
            countyName: '',
        },()=>{
             this.triggerChange();
        });
        this.props.CleanContry();
       
    };
    handleCityChange = (value) => {
        this.props.CityList(value.key);
        this.setState({
            provinceCode:value.key,
            provinceName:value.label,
            cityCode: '',
            cityName: '',
            countyCode: '',
            countyName: '',
        },()=>{
             this.triggerChange();
        });
        this.props.CleanPrivence();
        this.triggerChange({provinceCode:value.key,provinceName:value.lable});
    };
    handleCountyChange = (value) => {
        this.props.CountyList(value.key)
        this.setState({
            cityCode: value.key,
            cityName: value.label,
            countyCode: '',
            countyName: '',
        },()=>{
             this.triggerChange();
        });
        this.props.CleanCity();
    };
    handleLastChange =(value)=>{
        this.setState({
            countyCode: value.key,
            countyName: value.label,
        },()=>{
             this.triggerChange();
        });
    };
    componentDidMount() {
        this.props.CountryList()
    }
    //通过onChange事件传递 state属性到上层调用表单
    triggerChange = () => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state));
        }
    }
    render() {
        let {countryCode, provinceCode, cityCode, countyCode} = this.props;
        let countryOptions = this.props.source.countrySource.map(item => <Option
            key={item.countryCode}>{item.countryName}</Option>);
        let provinceOptions = this.props.source.provinceSource.map(item => <Option
            key={item.provinceCode}>{item.provinceName}</Option>);
        let cityOptions = this.props.source.citySource.map(item => <Option key={item.cityCode}>{item.cityName}</Option>);
        let countyOptions = this.props.source.countySource.map(item => <Option
            key={item.countyCode}>{item.countyName}</Option>);
        return (
            <div>
                <Select defaultValue={{key:countryCode}} value={{key:this.state.countryCode,label:this.state.countryName}}
                    labelInValue={true}
                    style={{width: 90}} 
                    onChange={this.handleProvinceChange}>
                    {countryOptions}
                </Select>
                <Select defaultValue={{key:provinceCode}} value={{key:this.state.provinceCode,label:this.state.provinceName}}
                    labelInValue={true}
                    style={{width: 90}}
                    onChange={this.handleCityChange}>
                    {provinceOptions}
                </Select>
                <Select defaultValue={{key:cityCode}} value={{key:this.state.cityCode,label:this.state.cityName}}
                    labelInValue={true}
                    style={{width: 90}}
                    onChange={this.handleCountyChange}>
                    {cityOptions}
                </Select>
                <Select defaultValue={{key:countyCode}} value={{key:this.state.countyCode,label:this.state.countyName}}
                    labelInValue={true}
                    style={{width: 90}}  
                    onChange={this.handleLastChange}>
                    {countyOptions}
                </Select>
            </div>
        );
    }

}
const mapStateToProps = (state) => state.LinkageRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    CountryList: () => {
        dispatch(LinkageAct.CountryList())
    },
    ProvinceList: (countryCode) => {
        dispatch(LinkageAct.ProvinceList({countryCode}))
    },
    CityList: (provinceCode) => {
        dispatch(LinkageAct.CityList({provinceCode}))
    },
    CountyList: (cityCode) => {
        dispatch(LinkageAct.CountyList({cityCode}))
    },
    CleanContry: () => {
        dispatch(LinkageAct.CleanOtherRegion(["provinceSource", "citySource", "countySource"]))
    },
    CleanPrivence: () => {
        dispatch(LinkageAct.CleanOtherRegion(["citySource", "countySource"]))
    },
    CleanCity: () => {
        dispatch(LinkageAct.CleanOtherRegion(
            ["countySource"]
        ))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(LinkageComp);
