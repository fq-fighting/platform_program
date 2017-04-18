import React, { Component, PropTypes } from "react";
import { shouldComponentUpdate } from '../consts/Utils';

class MapComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            map: null,
            address: {
                coordinate: JSON.stringify({
                    lng: 116.404,
                    lat: 39.915,
                }),
                addressDetl: ''
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.search !== this.props.search) {
            this.setPlace(nextProps.search)
        }
        if (nextProps.value && nextProps.value != this.props.value) {
            this.setState({
                address: {
                    coordinate: nextProps.value,
                }
            }, () => { this.setState({ map: this.createBMap(this.props.id),})});
        }
    }

    componentDidMount() {
        this.setState({
            map: this.createBMap(this.props.id)
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    createBMap = (id) => {
        let { lng, lat} = JSON.parse(this.state.address.coordinate);
        let map = new BMap.Map(id, { enableMapClick: false }),
            point = new BMap.Point(lng, lat);
        map.centerAndZoom(point, 14);
        map.enableScrollWheelZoom(); 
        map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
        map.addControl(new BMap.MapTypeControl());
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function (e) {
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            // console.log("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError", function (e) {
            // console.log(e.message);
        });
        map.addControl(geolocationControl);
        this.theLocation(map);
        // this.theBrowser(map);
        return map
    }
    marker = (poi) => {
        let marker = new BMap.Marker(poi);
        marker.disableDragging();
        return marker
    }
    theLocation = (map=this.state.map) => {
        let { lng, lat } = JSON.parse(this.state.address.coordinate);
        if (lng && lat) {
            map.clearOverlays();
            var new_point = new BMap.Point(lng, lat);
            var marker = this.marker(new_point);
            map.addOverlay(marker); 
            map.panTo(new_point);
            var opts = {
                width: 0,
                height: 0,
            };
            var geoc = new BMap.Geocoder();
            geoc.getLocation(new_point, (rs) => {
                var addComp = rs.addressComponents;
                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                var infoWindow = new BMap.InfoWindow(address, opts);
                map.openInfoWindow(infoWindow, new_point); 
                // console.log('add', lng, lat, address);
                this.setState({
                    address: {
                        addressDetl: address
                    }
                },this.onChange);
            });
        }
    }
    theBrowser = (m) => {
        const map = m || this.state.map;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r) => {
            if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                this.setState({
                    address: {
                        coordinate: JSON.stringify({
                            lng: r.point.lng,
                            lat: r.point.lat,
                        }),
                    }
                }, this.theLocation);
            }
        }, { enableHighAccuracy: true })
    }
    setPlace = (search) => {
        const { map } = this.state;
        const { address, addressDetl } = search;
        map.clearOverlays();
        const myFun = () => {
            let points = local.getResults().getPoi(0);
            if (points) {
                this.setState({
                    address: {
                        coordinate: JSON.stringify({
                            lng: points.point.lng,
                            lat: points.point.lat,
                        }),
                    }
                }, this.theLocation)
                
            }
            else console.log('地址无效，请重新搜索！');
        }
        const local = new BMap.LocalSearch(map, { 
            onSearchComplete: myFun
        });
        let searchVal = '';
        if(address){
            let { countryName, provinceName, cityName, countyName } = address;
            if (countryName) { searchVal += countryName }
            if (provinceName) { searchVal += provinceName }
            if (cityName) { searchVal += cityName }
            if (countyName) { searchVal += countyName }
        }
        if (addressDetl) { searchVal += addressDetl }
        // if (searchCity) {
        //     local.setLocation(searchCity);
        // }
        if (searchVal) {
            local.search(searchVal);
        } 
    }
    // getPoint = () => {
    //     const { map } = this.state;
    //     var geoc = new BMap.Geocoder();
    //     geoc.getPoint("北京市海淀区上地10街", (point) => {
    //         if (point) {
    //             map.centerAndZoom(point, 16);
    //             map.addOverlay(new BMap.Marker(point));
    //         } else {
    //             console.log("您选择地址没有解析到结果!");
    //         }
    //     }, "北京市");
    // }


    onChange = () => {
        this.props.onChange && this.props.onChange(this.state.address.coordinate);
    }
    render() {
        // console.log('value',this.props.value);
        return (
            <div id={this.props.id} ></div>
        )
    }
};


MapComp.defaultProps = {
    id: 'location',
    longitude: 116.404,
    latitude: 39.915,
};
MapComp.propTypes = {
    id: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
};

export default MapComp