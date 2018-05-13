
nameSupportBits= {
		0: 'supported',
};


module.exports = {
    "id": 4,
    "name": "genGroups",
    "specific": null,
    "attributes": {
      "0": { "cluster": 4, "id": 0, "name": "nameSupport", "type": "bitmap8", "mandatory": true, "read": true, "write": false, "specific": false, bits: nameSupportBits }
    },
    "commands": {
      "0": { "id": 0, "name": "add",              mandatory: true, params:[{name:'id', type:'uint16'}, {name:'name', type:'string'}] },
      "1": { "id": 1, "name": "view",             mandatory: true, params:[{name:'id', type:'uint16'}] },
      "2": { "id": 2, "name": "getMembership",    mandatory: true, params:[{name:'count', type:'uint8'}, {name:'list', type:'list'}] },
      "3": { "id": 3, "name": "remove",           mandatory: true, params:[{name:'id', type:'uint16'}] },
      "4": { "id": 4, "name": "removeAll",        mandatory: true, params:[] },
      "5": { "id": 5, "name": "addIfIdentifying", mandatory: true, params:[{name:'id', type:'uint16'}, {name:'name', type:'string'}] }
    },
    "responses": {
      "0": { "id": 0, "name": "addRsp",           mandatory: true, params:[{name:'status', type:'enum8'}, {name:'id', type:'uint16'}] },
      "1": { "id": 1, "name": "viewRsp",          mandatory: true, params:[{name:'status', type:'enum8'}, {name:'id', type:'uint16'}, {name:'name', type:'string'}] },
      "2": { "id": 2, "name": "getMembershipRsp", mandatory: true, params:[{name:'capacity', type:'uint8'}, {name:'count', type:'uint8'}, {name:'list', type:'list'}]},
      "3": { "id": 3, "name": "removeRsp",        mandatory: true, params:[{name:'status', type:'enum8'}, {name:'id', type:'uint16'}] }
    },
};

