export const JSON2Str = (data) => {
    let toString = "";
    for (var key in data) {
        var obj = data[key];
        if (Array.isArray(obj)) {
            let arrayString = obj.join(",");
            toString += key + "=" + arrayString + "&";
        }
        else {
            toString += key + "=" + data[key] + "&";
        }
    }
    return toString.replace(/\&$/, "");
};

export const getScrollBarSize = (fresh) => {
    let cached;
    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
};


export const buildTree = (data, key = 'id', name = 'name') => {
    if (Array.isArray(data)) {
        let loop = data => data.map((item) => {
            item.key = item[key]+'';
            item.value = item[key]+'';
            item.label = item[name];
            if (item.children) loop(item.children);
            return item;
        });
        return loop(data);
    }
};

import { is } from 'immutable';

export const shouldComponentUpdate = (nextProps = {}, nextState = {}, thisProps = {}, thisState={}) => {
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
        return true;
    }
    if (thisState && nextState && Object.keys(thisState).length !== Object.keys(nextState).length) {
        return true;
    }
    for (const key in nextProps) {
        if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
            return true;
        }
    }
    for (const key in nextState) {
        if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
            return true;
        }
    }
    return false;
}