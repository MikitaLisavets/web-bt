let APP = ((window, document) => {
  let deviceName, serviceUuid, characteristicUuid, controlType, characteristicValue,
    currentService, currentCharacteristic;
  
  function connect() {
    getOptions();
    navigator.bluetooth.requestDevice({
      filters: [{name: deviceName}],
      optionalServices: [serviceUuid]
    }).then(device => device.gatt.connect())
    .then(server => server.getPrimaryService(serviceUuid))
    .then(service => {
      currentService = service;
      return service.getCharacteristic(characteristicUuid)
    })
    .then(characteristic => {
      currentCharacteristic = characteristic;
      onSuccessConnect();
    });
  };

  function onSuccessConnect() {
    alert('Device connected');
  };

  function getOptions() {
    let controlTypes;
    deviceName = document.getElementById('deviceName').value;
    
    serviceUuid = document.getElementById('serviceUuid').value;
    if (serviceUuid.indexOf('0x') === 0) serviceUuid = parseInt(serviceUuid, 16);
    
    characteristicUuid = document.getElementById('characteristicUuid').value;
    if (characteristicUuid.indexOf('0x') === 0) characteristicUuid = parseInt(characteristicUuid, 16);
    
    characteristicValue = document.getElementById('characteristicValue');

    controlTypes = document.getElementsByName('controlType');
    controlTypes.forEach(elem => {
      if (elem.checked) controlType = elem.value;
    });
  }

  function handleWriteCharacteristicData(characteristicValue) {
    if (!currentCharacteristic) return;
    currentCharacteristic.writeValue(new Uint8Array([parseInt(characteristicValue.value, 16)]));
  }

  function handleReadCharacteristicData() {
    if (!currentCharacteristic) return;
    return currentCharacteristic.readValue()
      .then(characteristicData => {
        console.log(characteristicData);
        characteristicValue.value = characteristicData;
      });
  }

  function submit() {
    getOptions();
    if (+controlType) {
      handleWriteCharacteristicData(characteristicValue);
    } else {
      handleReadCharacteristicData();
    }
  }

  return {
    connect: connect,
    submit: submit
  };
})(window, document)