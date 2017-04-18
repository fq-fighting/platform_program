import React, { Component, PropTypes } from "react";
import { Upload, message, Button, Icon, Input } from 'antd';
import ModalComp from '../../base/components/ModalComp';
import { Urls } from '../../base/consts/Urls';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// import src from '../images/child.jpg';

class AddPlaceComp extends ModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            src:'',
            cropResult: null,
        };
        this.myprops = {
            name: 'file',
            action: Urls.UPLOAD_IMAGE.toLocaleLowerCase(),
            headers: {
                authorization: 'authorization-text',
            },
            beforeUpload: this.beforeUpload,
            onChange:(info) =>{
                if (info.file.status !== 'uploading') {
                    // console.log('uploading', info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    let furl = info.file.response.data.fileURL;
                    this.setState({ src: furl });
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.cropImage()
        }
    }

    cropImage = () => {
        // console.log('cropResult', this.cropper.getCroppedCanvas().toDataURL());
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        }, () => {
            this.props.onOk(this.state.cropResult).then(json => {
                // this.setState({ src: json.data.photoSrc})
            });
        });
    }
    beforeUpload = (file) => {
        const isJPG = /^image\/(jpeg|jpg|png|bmp)$/.test(file.type);
        // console.log(isJPG);
        if (!isJPG) {
            message.error('You can only upload jpeg/jpg/png/bmp file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
    getComp = () => {
        return (
            <div>
                <div style={{ padding: '10px' }}>
                    <Upload {...this.myprops}>
                        <Button><Icon type="upload" />重新上传</Button>
                    </Upload>
                </div>
                <div style={{ display: 'flex', width: '100%' }} >
                    <Cropper
                        style={{ height: 400, width: '80%', paddingRight: '20px' }}
                        aspectRatio={1 / 1}
                        preview=".img-preview"
                        src={this.state.src}
                        ref={cropper => { this.cropper = cropper; }}
                        guides={false}
                        viewMod={3}
                        dragMode={"move"}
                        center={false}
                        background={false}
                        autoCropArea={0.6}
                        toggleDragModeOnDblclick={false}
                    />
                    <div style={{ width: '20%', paddingLeft: '20px' }}>
                        <div>预览</div>
                        {/*<div className="img-preview" style={{ width: '100%', height: 300, overflow: 'hidden', }} />*/}
                        <img style={{ width: '100%', marginTop: '30px' }} src={this.state.cropResult} alt="系统头像" />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddPlaceComp;
