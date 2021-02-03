<script>
  const UUID_UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
  const UUID_TX_CHAR_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
  const UUID_RX_CHAR_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

  let time = null
  let weekdays = []
  const weekdayOptions = [
    { value: 1, label: '日' },
    { value: 2, label: '月' },
    { value: 3, label: '火' },
    { value: 4, label: '水' },
    { value: 5, label: '木' },
    { value: 6, label: '金' },
    { value: 7, label: '土' },
  ]

  let connected = true
  let gatt = null
  let tx = null
  let rx = null

  const onReceiveData = text => console.log(text)
  const sendData = text => {
		console.log('send:', text)
		rx?.writeValue(new TextEncoder().encode(text + '\n'))
	}

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
      tx.addEventListener('characteristicvaluechanged', e => onReceiveData(new TextDecoder().decode(e.target.value)))
      rx = characteristics[1]

      connected = true

      // send now time data
			const date = new Date()
      // sendData(`D:${date.getMonth()},${date.getUTCDate()},${date.getDay()},${date.getHours()},${date.getMinutes()},${date.getUTCSeconds()}`)
    }).catch(function(err) {
      alert(err)
    })
  }
  const submit = () => {
    console.log(time, weekdays)

		let alertText = ''
		if (!time) {
			alertText += '時刻を設定してください！\n'
		}
		if (!weekdays.length) {
			alertText += '曜日を設定してください！\n'
		}

		if (alertText.length) {
      alert(alertText)
      return
		}

		const weekdayData = weekdayOptions.map((option) => weekdays.includes(option.value) ? 1 : 0);

    sendData(`ALERM:${time.replace(':', ',')},${weekdayData.join('')}`)

		alert('アラームを設定しました！')
  }
</script>

<main>
	<h1>MakuraFit Adventure</h1>

	{#if !connected}
		<h2>まずはあなたの枕と接続しよう！</h2>
	{/if}

	<div class="button-wrapper">
		<button class="connect-button" type="button" on:click={connectToMicrobit}>{ connected ? '別の枕と接続する' : '枕と接続する' }</button>
	</div>

	{#if connected}
		<h2>アラームを設定しよう！</h2>
		<form on:submit|preventDefault={submit}>
			<input bind:value={time} type="time">
			<div class="weekday-fields">
			{#each weekdayOptions as option}
				<label>
					<input type=checkbox bind:group={weekdays} value={option.value} hidden>
					<div class="weekday" class:selected="{weekdays.includes(option.value)}">{option.label}</div>
				</label>
			{/each}
			</div>
			<div class="button-wrapper">
				<button class="submit-button" type="submit">設定する</button>
			</div>
		</form>
	{/if}
</main>

<style lang="scss">
	main {
		padding: 1rem;
		max-width: 640px;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: bold;
		word-wrap: break-word;
	}

	.connect-button {
		border-radius: 3rem;
		background: white;
		border: solid 1px black;
		color: black;
		font-weight: bold;
		font-size: 1.2rem;
	}

	form {
		width: 100%;
	}

	.weekday-fields {
		margin-top: 8px;
		display: flex;
		justify-content: space-between;
	}

	.weekday {
		display: inline-block;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		border: solid 1px#ff3e00;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;

		&.selected {
			background: #ff3e00;
			color: white;
		}
	}

	.button-wrapper {
		margin-top: 30px;
		width: 100%;
		text-align: center;

		.submit-button {
			border-radius: 2rem;
			background: white;
			border: solid 1px#ff3e00;
			color: #ff3e00;
			font-weight: bold;
			&:active {
				background: #ff3e00;
				color: white;
			}
		}
	}

	@media (max-width: 640px) {
		main {
			max-width: 100%;
		}
		h1 {
			font-size: 3em;
		}
	}
</style>
