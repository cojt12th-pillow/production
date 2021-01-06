<script>
	const UUID_UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
	const UUID_TX_CHAR_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
	const UUID_RX_CHAR_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

	let connected = false
	let gatt = null
	let tx = null
	let rx = null

	const sendData = text => rx.writeValue(new TextEncoder().encode(text + '\n'))

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
			const time = document.getElementById('time').value.replace(':', ',');
			const weekday = document.getElementById('weekday').value;

			sendData(`SET_ALERM:${time},${weekday}`);
	}
</script>

<main>
	<h1>アラーム設定</h1>
	<button type="button" on:click={connectToMicrobit}>{ connected ? '切断する' : '枕と接続する' }</button>
	<form>
			<div>
					<input type="time" id="time">
					<select name="weekday" id="weekday">
						<option value="1">月曜日</option>
						<option value="2">火曜日</option>
						<option value="3">水曜日</option>
						<option value="4">木曜日</option>
						<option value="5">金曜日</option>
						<option value="6">土曜日</option>
						<option value="7">日曜日</option>
					</select>
					<button type="button" on:click={submit}>設定</button>
			</div>
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
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>