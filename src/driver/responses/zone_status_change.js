const Enum = require('../enum.js');

/*
<sequence number: uint8_t>          04
      <endpoint : uint8_t>          01
      <cluster id: uint16_t>        05
      <src address mode: uint8_t>   00 // = short (16 bits)
      <src address uint16_t>        02 7c
<zone status: uint16_t>             97 00
<extended status: uint8_t>          01
<zone id : uint8_t>                 00
<delay: data each element uint16_t> ff 00 00

for device 0x7c97 raw data:
  TYPE = 84 02
  LENGTH = 00 0e
  PAYLOAD = cb 04 / 01 / 05 / 00 / 02 7c / 97 00 01 00 ff 00 00
  RSSI = 57
*/

module.exports = {
  id: 0x8401,
  name: "zone_status_change",
  parse: function(reader, rep) {
    rep.sequence = reader.nextUInt8();
    rep.endpoint = reader.nextUInt8();
    rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE());
    rep.addressmode = Enum.ADDRESS_MODE(reader.nextUInt8());
    rep.address = reader.nextUInt16BE();
    rep.zonestatus = reader.nextUInt16BE();
    rep.extendedstatus = reader.nextUInt8();
    rep.zoneid = reader.nextUInt8();

    rep.delay = [];
    while (reader.isMore()) {
      rep.delay.push(reader.nextUInt16BE())
    }
  },
};

