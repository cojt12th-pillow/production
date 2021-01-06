<script>
  const UUID_UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
  const UUID_TX_CHAR_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
  const UUID_RX_CHAR_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

  let time = null
  let weekdays = []
  const weekdayOptions = [
    { value: 1, text: '月曜日' },
    { value: 2, text: '火曜日' },
    { value: 3, text: '水曜日' },
    { value: 4, text: '木曜日' },
    { value: 5, text: '金曜日' },
    { value: 6, text: '土曜日' },
    { value: 7, text: '日曜日' },
  ]

  let connected = false
  let gatt = null
  let tx = null
  let rx = null

  const sendData = text => rx?.writeValue(new TextEncoder().encode(text + '\n'))

  const connectToMicrobit = () => {
    if (!(navigator.bluetooth && navigator.bluetooth.requestDevice)) {
      alert('WebBluetooth に未対応のブラウザです。')
      return
    }
    if (connected) {
      gatt.disconnect()
      connected = false
      return
    }

    navigator.bluetooth.requestDevice({
      filters: [
        { services: [UUID_UART_SERVICE] },
        { namePrefix: 'BBC micro:bit' }
      ]
    }).then(device => {
      gatt = device.gatt
      return gatt.connect()
    }).then(server =>
      server.getPrimaryService(UUID_UART_SERVICE)
    ).then(service =>
      Promise.all([
        service.getCharacteristic(UUID_TX_CHAR_CHARACTERISTIC),
        service.getCharacteristic(UUID_RX_CHAR_CHARACTERISTIC)])
    ).then(characteristics => {
      tx = characteristics[0]
      tx.startNotifications()
      tx.addEventListener('characteristicvaluechanged', e => {
        const text = new TextDecoder().decode(e.target.value)
        document.getElementById('recieve_text').value = text + document.getElementById('recieve_text').value
      })
      rx = characteristics[1]
      connected = true

      // send now time data
      sendData(`SET_DATE:${new Date().toISOString()}`)
    }).catch(function(err) {
      alert(err)
    })
  }
  const submit = () => {
    console.log(time, weekdays)

    sendData(`SET_ALERM:${time.replace(':', ',')},${weekdays.join(',')}`)
  }
</script>

<main>
	<h1>MakuraFit Adventure</h1>
	<button type="button" on:click={connectToMicrobit}>{ connected ? '切断する' : '枕と接続する' }</button>
	<form on:submit|preventDefault={submit}>
		<input bind:value={time} type="time">
		{#each weekdayOptions as option}
			<label>
				<input type=checkbox bind:group={weekdays} value={option.value}>
				{option.text}
			</label>
		{/each}
		<button type="submit">設定</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: bold;
	}

	@media (min-width: 640px) {
		main {
			max-width: 100%;
		}
		h1 {
			font-size: 2em;
		}
	}
</style>
