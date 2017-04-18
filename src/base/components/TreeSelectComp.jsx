import React, { Component, PropTypes } from 'react';
import { TreeSelect } from 'antd';
import {  buildTree, shouldComponentUpdate } from '../consts/Utils';

class TreeSelectComp extends Component {
    constructor(props, context) {
        super(props, context);
        
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    
    render() {
        const { treeData, width, maxHeight, placeholder, key, name } = this.props;
        return <TreeSelect
                    {...this.props}
                    style={{ width }}
                    dropdownStyle={{ maxHeight, overflow: 'auto' }}
                    treeData={buildTree(treeData, key, name)}
                    treeDefaultExpandAll
                />
    }
}

TreeSelectComp.defaultProps = {
    key: 'id',
    name: 'name',
    width: 200,
    maxHeight: 400,
    treeData: [],
}

TreeSelectComp.propTypes = {
    key: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.number,
    maxHeight: PropTypes.number,
    treeData: PropTypes.array,
}

export default TreeSelectComp;


// Example

// const treeData = [
//     {
//         "id": 0,
//         "name": "string",
//         "managerId": 0,
//         "managerName": "string",
//         "children": [
//             {}
//         ]
//     }
// ];

{/*<TreeSelectComp
    treeData={treeData}
    key='deptId'
    name='deptName'
/>*/}