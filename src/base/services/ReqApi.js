import { message } from 'antd'
import { JSON2Str } from '../consts/Utils'
import React from 'react';

const jsonHead = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const post = (pm) => ({
    method: "POST",
    mode: "cors",
    headers: jsonHead,
    body: JSON.stringify(pm)
});
const get = () => ({
    mode: 'cors',
    method: 'GET'
});

const handlerReq = (req, p) => (req.then((resp) =>{
    return resp.json();
}).then((j) => {
    if (j.status !== 2000) {
        message.config({ duration: 3 });
        throw j;
    }
    return j;
}).catch((j) => {
    let error = (message)=> <div>
            {
                message.map((item, index) => <div
                    key={"filed_error" + index}>
                    {item.feild ?
                        item.feild + ': ' : item.feild}
                    {item.msg}
                </div>)
            }
        </div>
        ;
    if (Array.isArray(message)) {
        if (j.message[0].feild === null) {
            if (!p.callBack) {
                message.error(error(j.message));
            }
        } else {
            message.error(error(j.message));
        }
    }    
    return j;
    }));

const ReqApi = {
    filterPm(p) {
        // console.log('pm',p.pm);
        let g = Object.assign({
            pm: {}
        }, p);
        g.pm.corNode = 1;
        return g;
    },
    get(param) {
        let p = this.filterPm(param);
        p.url = p.url + '?' + JSON2Str(p.pm);
        return handlerReq(fetch(p.url, get()), p);
    },
    post(param) {
        let p = this.filterPm(param);
        return handlerReq(fetch(p.url, post(p.pm)), p);
    }
}

export { ReqApi };