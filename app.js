let APP = ((window, document) => {
  let serviceId, characteristicId;

  let getBluetoothOptions = () => {
    serviceId = document.getElementById('serviceId').value;
    characteristicId = document.getElementById('characteristicId').value;
  }

  let handleCharacteristicData = (characteristic) => {
    if (characteristic === null) {
      console.log("Characteristic isn't available");
      return Promise.resolve();
    }
    return characteristic
      .readValue()
      .then(characteristicData => console.log(characteristicData));
  }

  let onSubmit = (event) => {
    event.preventDefault();
    getBluetoothOptions();
    navigator.bluetooth.requestDevice({
      filters: [{services: [serviceId]}],
      optionalServices: [serviceId]
    }).then(device => device.gatt.connect())
    .then(server => server.getPrimaryService(serviceId))
    .then(service => service.getCharacteristic(characteristicId))
    .then(handleCharacteristicData);
  }

  return {
    onSubmit: onSubmit
  };
})(window, document)